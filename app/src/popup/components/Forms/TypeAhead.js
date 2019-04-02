import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import PropTypes from "prop-types";
import {getOptionsList} from "../../reducers";
import * as actions from "../../actions/typeAhead";
import {DataLoaderDetails} from "../DataLoaders/DataLoaderDetail";
import {connect} from "react-redux";
import * as status from "../../config";


class TypeAheadRedux extends Component {

    componentDidMount() {
        this.props.getOptionsList(this.props.api, this.props.resource)

    }

    render() {

        const resource = this.props.resource;

        if (this.props.optionsList === undefined ||
            this.props.optionsList[resource] === undefined ||
            this.props.optionsList[resource].status === status.STATUS_LOADING) {
            return "Loading...";
        }

        const currentOptionsList = this.props.optionsList[resource];

        if (currentOptionsList.status === status.STATUS_FAILURE) {
            return "Ooops! Something went wrong!";
        }

        const fieldName = this.props.name;
        const defaultItem = this.props.values[fieldName];

        console.log("KKKKK", currentOptionsList.data);
        return <Typeahead
            name={fieldName}
            options={ currentOptionsList.data }
            labelKey={"value"}
            {...this.props}
            multiple={false}
            onChange={(selected) => {const value = (selected.length > 0) ? selected[0].id : ''; this.props.setFieldValue(fieldName, value); }}
            onBlur={ (e) => this.props.setFieldTouched(fieldName, true) }
            defaultSelected = {currentOptionsList.data.filter(item => item.id === defaultItem)}

        />
    }
}

TypeAheadRedux.propTypes = {
    api: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
}


const mapStateToProps = (state) => ({
    optionsList:          getOptionsList(state),

});

const mapDispatchToProps = dispatch => ({
     getOptionsList:      (api, resource) => dispatch(actions.geTypeaheadOptionsList(api, resource))

});


export default connect(mapStateToProps, mapDispatchToProps)(TypeAheadRedux);
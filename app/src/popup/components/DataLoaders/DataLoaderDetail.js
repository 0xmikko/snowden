import React, { Component } from "react";
import {connect} from "react-redux";

import PropTypes from "prop-types";

import * as actions from '../../actions/dataLoader'
import {getComponentSearch, getDataDetails} from "../../reducers";
import * as status from "../../config";


export class DataLoaderDetails extends Component {

    state = {
        hash: 0
    }

    componentDidMount() {
        this.updateData()
    }
    
    updateData = () => {
        // Get Resource & API call path
        // New_api is used for loading defaults for new objects
        const api = this.props.new_api || this.props.api;
        const params = {query: this.props.componentSearch[this.props.resource + this.props.id]}
        this.props.updateDetailDataLoader(api, this.props.resource, this.props.id, params);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.componentSearch[this.props.resource + this.props.id] !== prevProps.componentSearch[this.props.resource + this.props.id]) {
                this.updateData();
            }
    }

    render() {

            const { id } = this.props;
            const { resource }  = this.props;

            if (this.props.dataDetails === undefined ||
                this.props.dataDetails[resource] === undefined ||
                this.props.dataDetails[resource][id] === undefined ||
                this.props.dataDetails[resource][id].status === status.STATUS_LOADING) {
                return "Loading...";
            }

            const currentDataDetails = this.props.dataDetails[resource][id];

            if (currentDataDetails.status === status.STATUS_FAILURE) {
                return "Ooops! Something went wrong!";
            }

            const data = currentDataDetails.data;

            const { children } = this.props;

            const childrenProps = {
                data: data,
                api: this.props.api,
                id: id,
                updateData: this.updateData

            };

            const childrenWithProps = React.Children.map(children, child =>
              React.cloneElement(child, childrenProps)
            );
            return childrenWithProps;
        }


};

DataLoaderDetails.propTypes = {
    api: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}


const mapStateToProps = (state) => ({
    dataDetails:          getDataDetails(state),
    componentSearch:    getComponentSearch(state)

});

const mapDispatchToProps = dispatch => ({
    getDetailDataLoader:      (resource, api, id) => dispatch(actions.getDataLoaderDetail(resource, api, id)),
    updateDetailDataLoader:    (resource, api, id, params) => dispatch(actions.getDataLoaderDetail(resource, api, id, true, params))

});


export const DataLoaderDetailWrapperComponent = (props) => {

    const DetailDataLoader = connect(mapStateToProps, mapDispatchToProps)(DataLoaderDetails);
    const InputComponent = props.component;
    const id = (props.id !== undefined) ? props.id : props.match.params.id;

    //if (props.api === '/api/options/') return "HUI";


    const updatedProps = {
        ...props,
        api: props.api,
        resource: props.resource,
        page: true,
        id: id,
        new_api: props.new_api

    }

    const { children } = props;

    const childrenWithProps = React.Children.map(children, child =>
          React.cloneElement(child, updatedProps)
        );

    return <DetailDataLoader {...updatedProps }>
                {childrenWithProps}
            </DetailDataLoader>
}


const   DetailDataLoaderWrapper = (InputComponent, api, resource, new_api) => {

    return class extends React.Component {

        render() {

            return <DataLoaderDetailWrapperComponent
                        id={ this.props.id }
                        api={ api }
                        resource = { resource }
                        component = { InputComponent }
                        new_api = { new_api }
                        {...this.props}
            >
                <InputComponent/>
            </DataLoaderDetailWrapperComponent>
        }
    }

};


export default DetailDataLoaderWrapper;
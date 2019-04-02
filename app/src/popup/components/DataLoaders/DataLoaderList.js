import React, { Component } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import queryString from 'query-string'

import * as actions from '../../actions/dataLoader'
import { getDataList, getComponentSearch } from "../../reducers";
import * as status from "../../config";


export class DataLoaderList extends Component {

    state = {
        hasMore: true
    }

    componentDidMount() {
        // Get Resource & API call path
        const params = {query: this.props.componentSearch[this.props.resource]}
        this.props.getListDataLoader(this.props.api, this.props.resource, params);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.componentSearch[this.props.resource] !== nextProps.componentSearch[this.props.resource]) {
                this.updateData();
            }
    }

    updateData = () => {
        console.log("UPDATE")
        const params = {query: this.props.componentSearch[this.props.resource]}
        this.props.dataLoaderUpdateList(this.props.api, this.props.resource, params);
    }

    onLoadMore = () => {
        console.log("LOAD", this.props)
        const resource = this.props.resource;

        if (this.props.dataLists === undefined ||
            this.props.dataLists[resource] === undefined ||
            this.props.dataLists[resource].status === status.STATUS_UPDATING) {
            return;
        }

        const currentDataList = this.props.dataLists[resource];
        const hasMore = (currentDataList.next !== null) & (currentDataList.next !== undefined);
        if (this.state.hasMore != hasMore) this.setState({hasMore: hasMore});

        if (currentDataList.next) {
            // extract query from currentDataList.next
            const getParams = queryString.parseUrl(currentDataList.next);
            this.props.dataLoaderUpdateList(this.props.api, this.props.resource, getParams.query);
        }
    };

    render() {

            const resource = this.props.resource;

            if (this.props.dataLists === undefined ||
                this.props.dataLists[resource] === undefined ||
                this.props.dataLists[resource].status === status.STATUS_LOADING) {
                return "Loading...";
            }

            const currentDataList = this.props.dataLists[resource];

            if (currentDataList.status === status.STATUS_FAILURE) {
                return "Ooops! Something went wrong!";
            }

            const data = currentDataList.data;
            const { children } = this.props;

            let childrenWithProps = React.Children.map(children, child =>
              React.cloneElement(child, {
                  data: data,
                  loadMore: this.onLoadMore,
                  hasMore: this.state.hasMore,
                  updateData: this.updateData
              })
            );

            return childrenWithProps;
        }


};

DataLoaderList.propTypes = {
    api: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired
}


const mapStateToProps = (state) => ({
    dataLists:          getDataList(state),
    componentSearch:    getComponentSearch(state)

});

const mapDispatchToProps = dispatch => ({
     getListDataLoader:      (api, resource, query) => dispatch(actions.getDataLoaderList(api, resource, query)),
     dataLoaderUpdateList:   (api, resource, query) => dispatch(actions.updateDataLoaderList(api, resource, query))

});

export const ListDataLoader = connect(mapStateToProps, mapDispatchToProps)(DataLoaderList);

export const DataLoaderListWrapperComponent = (props) => {

    const ListDataLoader = connect(mapStateToProps, mapDispatchToProps)(DataLoaderList);
    const InputComponent = props.component;

    return <ListDataLoader
                        api={props.api}
                        resource={props.resource}
                        page={true}
                        >
                <InputComponent {...props}/>
            </ListDataLoader>
}


const DataLoaderListWrapper = (InputComponent, api, resource) => {

    return class extends React.Component {

        render() {

            return <DataLoaderListWrapperComponent
                        api={api}
                        resource = {resource }
                        component = { InputComponent }
                        id = { this.props.id }
                        history = {this.props.history}
                />
        }
    }

};


export default DataLoaderListWrapper;
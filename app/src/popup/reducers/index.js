import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import search, * as fromSearch from './search'
import dataLoader, * as fromDataLoader from './dataLoader'
import forms, * as fromForms from './forms';
import typeAhead, * as fromTypeAhead from './typeAhead'


export default (history) => combineReducers({

    router:  connectRouter(history),
    search: search,
    dataLoader: dataLoader,
    forms: forms,
    typeAhead: typeAhead

})

// Search
export const getSearchItems = state => fromSearch.getSearchItems(state.search);

// DataLoader
export const getDataList = state => fromDataLoader.getDataList(state.dataLoader);
export const getDataDetails = state => fromDataLoader.getDataDetails(state.dataLoader);
export const getHashUpdates = state => fromDataLoader.getHashUpdates(state.dataLoader);
export const getComponentSearch = state => fromDataLoader.getComponentSearch(state.dataLoader);

// Forms
export const getShowForms = state => fromForms.getShowForms(state.forms);

// TypeAhead
export const getOptionsList = state => fromTypeAhead.getOptionsList(state.typeAhead);

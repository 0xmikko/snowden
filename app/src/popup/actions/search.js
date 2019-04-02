import {RSAA} from 'redux-api-middleware';
import {getFullAPIAddress} from '../utils/api'
import {withAuth} from '../reducers'
import * as actions from './actions'


export const globalSearch = (query) => ({
    [RSAA]: {
        endpoint: getFullAPIAddress(`/api/search/?query=${query}`),
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [ actions.SEARCH_QUERY_REQUEST, actions.SEARCH_QUERY_SUCCESS, actions.SEARCH_QUERY_FAILURE ]
    }
});
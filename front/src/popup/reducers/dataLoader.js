import { updateState } from "../utils/updateState";
import * as actions from '../actions/actions';
import * as status from '../config';


const initialState = {
  lists: {},
  details: {},
  updates: {},
  search: {}
};


export default (state=initialState, action) => {

  const obj = {};
  let hash, hashUpdate;

  switch (action.type) {

      case actions.DATA_LOADER_LIST_REQUEST:
         obj[action.meta.resource] = {
             status: status.STATUS_LOADING,
             data: []
         }

        return updateState(state, { ...state,
                        lists: updateState(state.lists, obj) });

      case actions.DATA_LOADER_LIST_UPDATE_REQUEST:
         obj[action.meta.resource] = {
             ...state.lists[action.meta.resource],
             status: status.STATUS_UPDATING,
         }

        return updateState(state, { ...state, lists: {...obj} });

      case actions.DATA_LOADER_LIST_SUCCESS:

          let data = (action.payload.results !== undefined) ? action.payload.results : action.payload;

          const dataById = []
          data.map(item => dataById[item.id] = item)

          const prevQuery = state.lists[action.meta.resource].query;
          const newQuery = action.meta.query;
          console.log("QQQ1",  action.meta);
          console.log("QQQ1", prevQuery);
          console.log("QQQ2", newQuery);

          let updateData = (newQuery === prevQuery)? state.lists[action.meta.resource].data : undefined;

          obj[action.meta.resource] = {
                  status: status.STATUS_SUCCESS,
                  data: {
                    ...updateData,
                    ...dataById
                  },
                  count: action.payload.count,
                  previous: action.payload.previous,
                  next: action.payload.next,
                  query: newQuery
              }

          return updateState(state, { ...state,
              lists: updateState(state.lists, obj) });

    case actions.DATA_LOADER_LIST_FAILURE:
          obj[action.meta.resource] = {
              status: status.STATUS_FAILURE,
              data: []
          }
          return updateState(state, { ...state,
              lists: updateState(state.lists, obj) });


    /*
                                 DETAIL REQUESTS
        =====================================================================
    */


    case actions.DATA_LOADER_DETAIL_REQUEST:

          obj[action.meta.resource] = state.details[action.meta.resource] || {};
          obj[action.meta.resource][action.meta.id] = {
              status: status.STATUS_LOADING,
          }

        return updateState(state, { ...state,
                            details: updateState(state.details, obj)});

    case actions.DATA_LOADER_DETAIL_SUCCESS:

          console.log("DETAILS", state.details)
          // We add an info of update for current hash
          hash = action.meta.hash || 0;
          hashUpdate = {};
          hashUpdate[hash] = +Date.now();

          obj[action.meta.resource] = state.details[action.meta.resource] || {};
          obj[action.meta.resource][action.meta.id] = {
              status: status.STATUS_SUCCESS,
              data: action.payload,
          }
          return updateState(state,
                { ...state,
                            details: updateState(state.details, obj),
                            updates: updateState(state.updates, hashUpdate)});

    case actions.DATA_LOADER_DETAIL_FAILURE:
          obj[action.meta.resource] = {};
          obj[action.meta.resource][action.meta.id] = {
              status: status.STATUS_FAILURE,
              data: []
          }
          return updateState(state, { ...state, details: {...obj} });


    // DELETE OPERATIONS

    case actions.DATA_LOADER_DELETE_SUCCESS:
        hash = action.meta.hash || 0;
        hashUpdate = {};
        hashUpdate[hash] = +Date.now();

        // Remove resource + id from list
        obj[action.meta.resource] = state.lists[action.meta.resource];
        console.log("DELETE", action.meta.resource)
        console.log("DELETE", obj)
        if (obj[action.meta.resource]) {
            data = obj[action.meta.resource].data
            if (data[action.meta.id]) delete data[action.meta.id]
        }

        console.log("DELETE", obj)

        return updateState(state,
            { ...state,
                        lists: updateState(state.lists, obj),
                        updates: updateState(state.updates, hashUpdate)});

    case actions.SEARCH_COMPONENT:
        if (!action.resource) throw "No resource for search were sent";
        const searchUpdate = {};
        searchUpdate[action.resource] = action.query;

        return updateState(state,
            { ...state,
                        search: updateState(state.updates, searchUpdate)});


    default:
          return state;

  }
}

export const getDataList    = (state) => (state.lists);
export const getDataDetails = (state) => (state.details);
export const getHashUpdates = (state) => (state.updates);
export const getComponentSearch = (state) => (state.search);

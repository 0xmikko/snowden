import { updateState } from "../utils/updateState";
import * as actions from '../actions/actions';
import * as status from '../config';


const initialState = {
  lists: {},
  updates: {}
};


export default (state=initialState, action) => {

  const obj = {};
  let hash, hashUpdate;

  switch (action.type) {

      case actions.TYPEAHEAD_LIST_REQUEST:
         obj[action.meta.resource] = {
             status: status.STATUS_LOADING,
             data: []
         }

        return updateState(state, { ...state, lists: {...obj} });

      case actions.TYPEAHEAD_LIST_SUCCESS:

          let data = (action.payload.results !== undefined) ? action.payload.results : action.payload;

          const dataById = []
          //data.map(item => dataById[item.id] = item)

          obj[action.meta.resource] = {
                  status: status.STATUS_SUCCESS,
                  data: data,
              }
          console.log("FFFF2", obj)
          return updateState(state, { ...state, lists: {...obj} });

    case actions.TYPEAHEAD_LIST_FAILURE:
          obj[action.meta.resource] = {
              status: status.STATUS_FAILURE,
              data: []
          }
          return updateState(state, { ...state,lists: {...obj} });

      default:
          return state;

  }
}

export const getOptionsList    = (state) => (state.lists);
import { updateState } from "../utils/updateState";
import * as auth from '../actions/actions'


const initialState = {
  isLoading: false,
  options: []
}

export default (state=initialState, action) => {

  console.log("SEARCH", action)

  switch (action.type) {
    case auth.SEARCH_QUERY_REQUEST:
      return updateState(state, {
        ...state,
        isLoading: true
      })

    case auth.SEARCH_QUERY_SUCCESS:
      return updateState(state, {
        ...state,
        isLoading: false,
        options: action.payload.options
      })

    case auth.LOGIN_FAILURE:

      return {
        ...state,
        isLoading: false,
        options: [],
      }

    default:
      return state

  }
}

export const getSearchItems = (state) => (state);

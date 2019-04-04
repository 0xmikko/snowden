import * as actions from '../../actions'
import * as status from '../../utils/status'
import {updateState} from "../../utils/updateState";


const initialState = {
    status: status.STATUS_ACTIVE
};


export default (state=initialState, action) => {

  console.log("REDUCER_STATE", state);
  console.log("REDUCER_ACTION", action);

  switch (action.type) {

      case actions.SETTINGS_REQUEST:
        return updateState(state,
            {
                        reader: "",
                        status: status.STATUS_LOADING})

      case actions.SETTINGS_SUCCESS:
           return updateState(state,
            {
                        reader: action.payload.result,
                        status: status.STATUS_SUCCESS})

      case actions.SETTINGS_FAILURE:
           return updateState(state,
            {
                        reader: "",
                        status: status.STATUS_FAILURE})


      default:
        return state

  }
}

export const settings = (state) => (state);

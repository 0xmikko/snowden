import * as actions from '../../actions'
import * as status from '../../utils/status'
import {updateState} from "../../utils/updateState";


const initialState = {
  status: false,
};


export default (state=initialState, action) => {

  switch (action.type) {

      case actions.UPDATE_CONNECTION_STATUS:
        console.log("YAHOO");

        return updateState(state,
            {
                status: action.status
            });

      default:
        return state

  }
}

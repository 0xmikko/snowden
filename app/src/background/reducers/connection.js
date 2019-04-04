import * as actions from '../../actions'
import * as status from '../../utils/status'
import {updateState} from "../../utils/updateState";


const initialState = {
  connection: false,
};


export default (state=initialState, action) => {

  switch (action.type) {

      case actions.UPDATE_CONNECTION_STATUS:
        console.log("YAHOO");

        return updateState(state,
            {
                connection: action.status
            });

      default:
        return state

  }
}

export const receivedPosts = (state) => (state.connection);

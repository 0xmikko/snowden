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

      case actions.DECRYPT_POST_REQUEST:
        return updateState(state,
            {
                        post: action.payload.text,
                        hash: action.payload.hash,
                        status: status.STATUS_LOADING})

      case actions.DECRYPT_POST_SUCCESS:
           return updateState(state,
            {
                        hash: action.payload.hash,
                        decrypted: action.payload.result,
                        status: status.STATUS_SUCCESS})

      case actions.DECRYPT_POST_FAILURE:
           return updateState(state,
            {
                        post: action.payload.text,
                        hash: action.payload.hash,
                        decrypted: undefined,
                        status: status.STATUS_FAILURE})


      default:
        return state

  }
}

export const receivedPosts = (state) => (state);

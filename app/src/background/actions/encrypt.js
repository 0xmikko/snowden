import * as actions from '../../actions';
import {sendMessage} from "../native";


export const encryptInit = () => {
    return {
        type: actions.ENCRYPT_POST_INIT,
    };
}

export const encryptPost = (payload) => {

    sendMessage({api: "ENCRYPT", payload: payload});
    return {
        type: actions.ENCRYPT_POST_REQUEST,
        payload: payload
    };

};

export const encryptPostResponce = (payload, status) => {
    return {
        type: (status===200) ? actions.ENCRYPT_POST_SUCCESS : actions.ENCRYPT_POST_FAILURE,
        payload: payload
    };

};
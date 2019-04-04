/* global chrome */
import * as actions from '../../actions';
import {sendMessage} from "../index";


export const checkPage = (content) => {

    sendMessage({api: "DECRYPT", payload: content});
    return {
        type: actions.DECRYPT_POST_REQUEST,
        payload: content
    };
}

export const decryptPostResponce = (payload, status) => {

    if ((payload.result !== undefined)  && (payload.result.length !== undefined)) {
        const messagesFound = payload.result.length;
        chrome.browserAction.setBadgeBackgroundColor({color: "#FF0000"})
        chrome.browserAction.setBadgeText({text: messagesFound.toString()});
    }
    return {
        type: (status===200) ? actions.DECRYPT_POST_SUCCESS : actions.DECRYPT_POST_FAILURE,
        payload: payload
    };

};
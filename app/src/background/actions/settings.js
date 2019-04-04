import * as actions from '../../actions';
import {sendMessage} from "../index";

export const getSettings = () => {
    sendMessage({api: "SETTINGS", payload: ""});
    return {
        type: actions.SETTINGS_REQUEST,
    };
}

export const getSettingsResponce = (payload, status) => {
    return {
        type: (status===200) ? actions.SETTINGS_SUCCESS : actions.SETTINGS_FAILURE,
        payload: payload
    };

};
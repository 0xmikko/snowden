 /*global chrome*/
import store from './store';
import * as actionsEncrypt from "./actions/encrypt"
import * as actionsDectypt from "./actions/decrypt"
import * as actionsConnection from "./actions/connection"
import * as actionsSettings from "./actions/settings"
import {setupHostConnection} from "./native"

const extensionID = chrome.runtime.getURL("").replace("chrome-extension://", "").slice(0, -1);

console.log("BACKGROUND APP STARTED");
console.log("Extension ID", extensionID);


function handleMessage (json_message) {

    console.log("RECEIVE NEW MESSAGE", json_message)

    // Parse message
    const {api, body} = json_message
    const body_parsed = JSON.parse(body)
    const payload = body_parsed.payload;
    const status =  body_parsed.status;

    // LIST OF RESPONSE ACTIONS

    const responseActions = {
        ENCRYPT: actionsEncrypt.encryptPostResponce,
        DECRYPT: actionsDectypt.decryptPostResponce,
        SETTINGS: actionsSettings.getSettingsResponce
    };
    
    const dispatch = responseActions[api]
    store.dispatch(dispatch(payload, status));

}


setupHostConnection(handleMessage);
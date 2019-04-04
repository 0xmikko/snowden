 /*global chrome*/
import store from './store';
import * as actionsEncrypt from "./actions/encrypt"
import * as actionsDectypt from "./actions/decrypt"
import * as actionsConnection from "./actions/connection"
import * as actionsSettings from "./actions/settings"

console.log("BACKGROUND APP STARTED", store)

const hostName = "com.snowden.connect";
const portNative = chrome.runtime.connectNative(hostName);

const setupHostConnection = () => {

  console.log("Connection is set up")
  store.dispatch(actionsConnection.setConnectionStatus(true));

  // Adding listener to Incoming messages
  portNative.onMessage.addListener((message) => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message)
    }
    handleMessage(message)
  })

  // Adding listener for disconnecting
  portNative.onDisconnect.addListener(() => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message)
    }
    console.log('Disconnected')
    store.dispatch(actionsConnection.setConnectionStatus(false));

  })

}

export const sendMessage = (msg) =>
 {
   console.log("SEND MESSAGE", msg);
   portNative.postMessage(msg);
 };

function handleMessage (json_message) {

    console.log("RECEIVE MESSAGE", json_message)

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


setupHostConnection();
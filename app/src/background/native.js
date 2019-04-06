/* global chrome */
import store from "./store";
import * as actionsConnection from "./actions/connection";
import * as status from "../utils/status"

const hostName = "com.snowden.connect";
const portNative = chrome.runtime.connectNative(hostName);


export const setupHostConnection = (handleMessage) => {

  store.dispatch(actionsConnection.setConnectionStatus(status.STATUS_ACTIVE));

  // Adding listener to Incoming messages
  portNative.onMessage.addListener((message) => {
    if (chrome.runtime.lastError) {
      nativeErrorHandler(chrome.runtime.lastError.message)
    }
    handleMessage(message)
  });

  // Adding listener for disconnecting
  portNative.onDisconnect.addListener(() => {
    if (chrome.runtime.lastError) {
      nativeErrorHandler(chrome.runtime.lastError.message)
    }
    console.log('Disconnected')
  });

};

/**
 * Error handler for host connection
 * It detects and error and send a message INSTALL_NEEDED or FAILURE to Redux
 * @param message - error message from chrome.runtime.lastError.message
 */
const nativeErrorHandler = (message) => {
    console.log(message)
    // Check that host is exists
    if (message.startsWith("Specified native messaging host not found")) {
        store.dispatch(actionsConnection.setConnectionStatus(status.STATUS_INSTALL_NEEDED));
        return
    }

    // In all other cases set DISCONNECTED status and ask user to restart
    store.dispatch(actionsConnection.setConnectionStatus(status.STATUS_FAILURE));
}

export const sendMessage = (msg) =>
 {
   console.log("SEND MESSAGE", msg);
   portNative.postMessage(msg);
 };

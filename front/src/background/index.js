/** NuTouch authentication system
 *  Version: 0.1
 *  Author: Mikhail Lazarev (c) All rights reserved
 *
 *  based on NyCypher technology (nucypher.com)
 *
*/

var chrome;

// Setting up Native Messaging Connect
var hostName = "com.nutouch.connect";
var portNative = chrome.runtime.connectNative(hostName)


portNative.onMessage.addListener((message) => {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError.message)
  }
  handleMessage(message)
})

portNative.onDisconnect.addListener(() => {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError.message)
  }
  console.log('Disconnected')
})


function handleMessage (json_message) {

    var tokens = {
        access_token: json_message.access,
        refresh_token: json_message.refresh,
        public_reader_json: json_message.public_reader_json
    }

    console.log('access_token:' + json_message.access,
                'refresh_token:' + json_message.refresh,
                '\ntabId:' + json_message.tabId,
                '\npublic_reader_json: ' + json_message.public_reader_json)

    chrome.tabs.sendMessage(parseInt(json_message.tabId), {action: 'AUTH_TOKENS', payload: tokens}, function(response) {});
  
}


// Setting up Background.js - Content.Js - Page.Js data transfer

/**
 * Gets request with URL which is requested JWT Code and
 * send request to Native Messaging system
 */
function NutouchRequestHandler(message) {

    console.log("Request for token from " + message.url + " at tabId " + message.tabId);
    portNative.postMessage({tabId: message.tabId, url: message.url})

  };

chrome.runtime.onConnect.addListener(function(portFrom) {
   if(portFrom.name === 'nutouch-content') {
      //This is how you add listener to a port.
      portFrom.onMessage.addListener(NutouchRequestHandler);
   }
});

/**
 * Send TabId to content.js script to evaluate it there
 */

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   console.log("Sending TAB_ID: " + tabId);
   chrome.tabs.sendMessage(tabId, {action: 'SENT_TAB_ID', payload: tabId}, function(response) {});
});


/** NuTouch authentication system
 *  Version: 0.1
 *  Author: Mikhail Lazarev (c) All rights reserved
 *
 *  based on NyCypher technology (nucypher.com)
 *
*/

let myTabId = 0;

//start connection in content script
let contentPort = chrome.runtime.connect({
   name: 'nutouch-content'
});

//Append your pageScript.js to "real" webpage. So will it can full access to webpate.
var s = document.createElement('script');
s.src = chrome.extension.getURL('page.js');
(document.head || document.documentElement).appendChild(s);

//Our pageScript.js only add listener to window object,
//so we don't need it after it finish its job. But depend your case, 
//you may want to keep it.
s.parentNode.removeChild(s);

//Listen for runtime message
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

   let event;
   switch (message.action) {
      case 'SENT_TAB_ID':
         // It uses to get sent_tab id for content.js
         console.log("sent from tab.id=", message.payload);
         myTabId = message.payload;
         console.log(window.location.host);
         event = new CustomEvent('NUTOUCH_INIT');

         break;

      case 'AUTH_TOKENS':
         // Getting auth tokens from background.js
         console.log("Auth tokens recevide in content.js")
         event = new CustomEvent('AUTH_TOKENS', { detail: message.payload});
   }
   window.dispatchEvent(event);
});

// Resends request for Auth tokens from page.js
window.addEventListener('message', function receiveDuck(event) {
   if(event.data.action === 'GET_JWT_TOKEN') {
      //Remove this listener, but you can keep it depend on your case
      console.log("GET REQUEST FOR JWT TOKEN. SENT TO BACKGROUND.JS")
      //window.removeEventListener('message', receiveDuck, false);
      contentPort.postMessage({type: 'GET_JWT_TOKEN', url: window.location.host, tabId: myTabId});
   }
}, false);
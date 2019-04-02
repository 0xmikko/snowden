/** NuTouch authentication system
 *  Version: 0.1
 *  Author: Mikhail Lazarev (c) All rights reserved
 *
 *  based on NyCypher technology (nucypher.com)
 *
*/

// Injecting object to provide an access to JWT Tokens
window.nutouch = {
   status: 'WAIT',
   access: null,
   refresh: null,
   public_reader_json: null
}

/** Sends request to get tokens for existing URL from content.js */
function sendRequest(event) {
   //You can also use dispatchEvent
   console.log("Nutouch initialized")
   window.postMessage({action: 'GET_JWT_TOKEN'}, '*');

   window.nutouch = {
      status: 'REQUEST_SENT',
      access: null,
      refresh: null,
      public_reader_json: null
   }
}

/** Gets tokens and inject them into window.nutouch */
function tokensReceived(event) {
   console.log("AUTH_TOKENS_RECEIVED")

   window.nutouch = {
      status: 'SUCCESS',
      access_token: event.detail.access_token,
      refresh_token: event.detail.refresh_token,
      public_reader_json: event.detail.public_reader_json
   }

   console.log(window.nutouch)

}

// Setting up listeners
window.addEventListener('NUTOUCH_INIT', sendRequest, false);
window.addEventListener('AUTH_TOKENS', tokensReceived, false);

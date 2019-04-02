"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PORT_NAME = exports.PATCH_STATE_TYPE = exports.STATE_TYPE = exports.DISPATCH_TYPE = void 0;
// Message type used for dispatch events
// from the Proxy Stores to background
var DISPATCH_TYPE = 'chromex.dispatch'; // Message type for state update events from
// background to Proxy Stores

exports.DISPATCH_TYPE = DISPATCH_TYPE;
var STATE_TYPE = 'chromex.state'; // Message type for state patch events from
// background to Proxy Stores

exports.STATE_TYPE = STATE_TYPE;
var PATCH_STATE_TYPE = 'chromex.patch_state'; // The default name for the port communication via
// react-chrome-redux

exports.PATCH_STATE_TYPE = PATCH_STATE_TYPE;
var DEFAULT_PORT_NAME = "chromex.port_name";
exports.DEFAULT_PORT_NAME = DEFAULT_PORT_NAME;
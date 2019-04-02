"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Store", {
  enumerable: true,
  get: function get() {
    return _Store.default;
  }
});
Object.defineProperty(exports, "applyMiddleware", {
  enumerable: true,
  get: function get() {
    return _applyMiddleware.default;
  }
});
Object.defineProperty(exports, "wrapStore", {
  enumerable: true,
  get: function get() {
    return _wrapStore.default;
  }
});
Object.defineProperty(exports, "alias", {
  enumerable: true,
  get: function get() {
    return _alias.default;
  }
});

var _Store = _interopRequireDefault(require("./store/Store"));

var _applyMiddleware = _interopRequireDefault(require("./store/applyMiddleware"));

var _wrapStore = _interopRequireDefault(require("./wrap-store/wrapStore"));

var _alias = _interopRequireDefault(require("./alias/alias"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
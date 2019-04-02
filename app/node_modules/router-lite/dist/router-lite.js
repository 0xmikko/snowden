(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function (g) {
    g.routerLite = require('./index.js');
})(window);

},{"./index.js":2}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function compile(pt) {
    if (pt instanceof RegExp) {
        return pt;
    } else {
        var _ret = function () {
            var r = pt.split('/');
            var mandatory = [];
            var optional = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = r[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var f = _step.value;

                    if (f.charAt(0) == ':') {
                        if (optional.length > 0 || f.charAt(f.length - 1) == '?') {
                            if (f.charAt(f.length - 1) != '?') {
                                throw 'unable to parse : you cannot use optional parameter before necessary item';
                            }
                            optional.push(f.substr(1, f.length - 2));
                        } else {
                            mandatory.push({
                                parameter: true,
                                value: f
                            });
                        }
                    } else if (optional.length > 0) {
                        throw 'unable to parse : you cannot use optional parameter before necessary item';
                    } else {
                        mandatory.push({ parameter: false, value: f });
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return {
                v: {
                    test: function test(url) {
                        var r = url.split('/');
                        if (r.length > mandatory.length + optional.length || r.length < mandatory.length) {
                            return null;
                        }
                        var rs = {};
                        for (var i = 0; i < r.length; i++) {
                            if (i >= mandatory.length) {
                                rs[optional[i - mandatory.length]] = r[i];
                            } else {
                                if (mandatory[i].parameter) {
                                    rs[mandatory[i].value] = r[i];
                                } else if (mandatory[i].value != r[i]) {
                                    return null;
                                }
                            }
                        }
                        return rs;
                    }
                }
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
}
module.exports = function () {
    function Router() {
        _classCallCheck(this, Router);

        this.$patterns = [];
        this.$otherwise = [];
    }

    _createClass(Router, [{
        key: 'on',
        value: function on(a, fn) {
            this.$patterns.push({
                pattern: compile(a),
                cb: fn
            });
            return this;
        }
    }, {
        key: 'otherwise',
        value: function otherwise(fn) {
            this.$otherwise.push(fn);
            return this;
        }
    }, {
        key: 'resolve',
        value: function resolve(url) {
            var otherwise = true;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.$patterns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var p = _step2.value;

                    var rs = p.pattern.test(url);

                    if (rs) {
                        p.cb(rs);
                        otherwise = false;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (otherwise) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.$otherwise[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var o = _step3.value;

                        o();
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
            return this;
        }
    }]);

    return Router;
}();

},{}]},{},[1]);

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * String key that carries API call info interpreted by this Redux middleware.
 *
 * @constant {string}
 * @access public
 * @default
 */
const RSAA = '@@redux-api-middleware/RSAA';

/**
 * Is the argument a plain object?
 * Inspired by lodash.isplainobject
 *
 * @function isPlainObject
 * @param {object} obj - The object to check
 * @returns {boolean}
 */

function isPlainObject(obj) {
  return obj && typeof obj == 'object' && Object.getPrototypeOf(obj) === Object.prototype;
}
/**
 * Is the given action a plain JavaScript object with an [RSAA] property?
 *
 * @function isRSAA
 * @access public
 * @param {object} action - The action to check
 * @returns {boolean}
 */


function isRSAA(action) {
  return isPlainObject(action) && action.hasOwnProperty(RSAA);
}
/**
 * Is the given object a valid type descriptor?
 *
 * @function isValidTypeDescriptor
 * @access private
 * @param {object} obj - The object to check agains the type descriptor definition
 * @returns {boolean}
 */


function isValidTypeDescriptor(obj) {
  const validKeys = ['type', 'payload', 'meta'];

  if (!isPlainObject(obj)) {
    return false;
  }

  for (let key in obj) {
    if (!~validKeys.indexOf(key)) {
      return false;
    }
  }

  if (!('type' in obj)) {
    return false;
  } else if (typeof obj.type !== 'string' && typeof obj.type !== 'symbol') {
    return false;
  }

  return true;
}
/**
 * Checks an action against the RSAA definition, returning a (possibly empty)
 * array of validation errors.
 *
 * @function validateRSAA
 * @access public
 * @param {object} action - The action to check against the RSAA definition
 * @returns {array}
 */


function validateRSAA(action) {
  var validationErrors = [];
  const validCallAPIKeys = ['endpoint', 'options', 'method', 'body', 'headers', 'credentials', 'bailout', 'types', 'fetch', 'ok'];
  const validMethods = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];
  const validCredentials = ['omit', 'same-origin', 'include'];

  if (!isRSAA(action)) {
    validationErrors.push('RSAAs must be plain JavaScript objects with an [RSAA] property');
    return validationErrors;
  }

  const callAPI = action[RSAA];

  if (!isPlainObject(callAPI)) {
    validationErrors.push('[RSAA] property must be a plain JavaScript object');
  }

  for (let key in callAPI) {
    if (!~validCallAPIKeys.indexOf(key)) {
      validationErrors.push(`Invalid [RSAA] key: ${key}`);
    }
  }

  const {
    endpoint,
    method,
    headers,
    options,
    credentials,
    types,
    bailout,
    fetch,
    ok
  } = callAPI;

  if (typeof endpoint === 'undefined') {
    validationErrors.push('[RSAA] must have an endpoint property');
  } else if (typeof endpoint !== 'string' && typeof endpoint !== 'function') {
    validationErrors.push('[RSAA].endpoint property must be a string or a function');
  }

  if (typeof method === 'undefined') {
    validationErrors.push('[RSAA] must have a method property');
  } else if (typeof method !== 'string') {
    validationErrors.push('[RSAA].method property must be a string');
  } else if (!~validMethods.indexOf(method.toUpperCase())) {
    validationErrors.push(`Invalid [RSAA].method: ${method.toUpperCase()}`);
  }

  if (typeof headers !== 'undefined' && !isPlainObject(headers) && typeof headers !== 'function') {
    validationErrors.push('[RSAA].headers property must be undefined, a plain JavaScript object, or a function');
  }

  if (typeof options !== 'undefined' && !isPlainObject(options) && typeof options !== 'function') {
    validationErrors.push('[RSAA].options property must be undefined, a plain JavaScript object, or a function');
  }

  if (typeof credentials !== 'undefined') {
    if (typeof credentials !== 'string') {
      validationErrors.push('[RSAA].credentials property must be undefined, or a string');
    } else if (!~validCredentials.indexOf(credentials)) {
      validationErrors.push(`Invalid [RSAA].credentials: ${credentials}`);
    }
  }

  if (typeof bailout !== 'undefined' && typeof bailout !== 'boolean' && typeof bailout !== 'function') {
    validationErrors.push('[RSAA].bailout property must be undefined, a boolean, or a function');
  }

  if (typeof types === 'undefined') {
    validationErrors.push('[RSAA] must have a types property');
  } else if (!Array.isArray(types) || types.length !== 3) {
    validationErrors.push('[RSAA].types property must be an array of length 3');
  } else {
    const [requestType, successType, failureType] = types;

    if (typeof requestType !== 'string' && typeof requestType !== 'symbol' && !isValidTypeDescriptor(requestType)) {
      validationErrors.push('Invalid request type');
    }

    if (typeof successType !== 'string' && typeof successType !== 'symbol' && !isValidTypeDescriptor(successType)) {
      validationErrors.push('Invalid success type');
    }

    if (typeof failureType !== 'string' && typeof failureType !== 'symbol' && !isValidTypeDescriptor(failureType)) {
      validationErrors.push('Invalid failure type');
    }
  }

  if (typeof fetch !== 'undefined') {
    if (typeof fetch !== 'function') {
      validationErrors.push('[RSAA].fetch property must be a function');
    }
  }

  if (typeof ok !== 'undefined') {
    if (typeof ok !== 'function') {
      validationErrors.push('[RSAA].ok property must be a function');
    }
  }

  return validationErrors;
}
/**
 * Is the given action a valid RSAA?
 *
 * @function isValidRSAA
 * @access public
 * @param {object} action - The action to check against the RSAA definition
 * @returns {boolean}
 */


function isValidRSAA(action) {
  return !validateRSAA(action).length;
}

/**
 * Error class for an RSAA that does not conform to the RSAA definition
 *
 * @class InvalidRSAA
 * @access public
 * @param {array} validationErrors - an array of validation errors
 */
class InvalidRSAA extends Error {
  constructor(validationErrors) {
    super();
    this.name = 'InvalidRSAA';
    this.message = 'Invalid RSAA';
    this.validationErrors = validationErrors;
  }

}
/**
 * Error class for a custom `payload` or `meta` function throwing
 *
 * @class InternalError
 * @access public
 * @param {string} message - the error message
 */


class InternalError extends Error {
  constructor(message) {
    super();
    this.name = 'InternalError';
    this.message = message;
  }

}
/**
 * Error class for an error raised trying to make an API call
 *
 * @class RequestError
 * @access public
 * @param {string} message - the error message
 */


class RequestError extends Error {
  constructor(message) {
    super();
    this.name = 'RequestError';
    this.message = message;
  }

}
/**
 * Error class for an API response outside the 200 range
 *
 * @class ApiError
 * @access public
 * @param {number} status - the status code of the API response
 * @param {string} statusText - the status text of the API response
 * @param {object} response - the parsed JSON response of the API server if the
 *  'Content-Type' header signals a JSON response
 */


class ApiError extends Error {
  constructor(status, statusText, response) {
    super();
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.response = response;
    this.message = `${status} - ${statusText}`;
  }

}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

/**
 * Extract JSON body from a server response
 *
 * @function getJSON
 * @access public
 * @param {object} res - A raw response object
 * @returns {promise|undefined}
 */

async function getJSON(res) {
  const contentType = res.headers.get('Content-Type');
  const emptyCodes = [204, 205];

  if (!~emptyCodes.indexOf(res.status) && contentType && ~contentType.indexOf('json')) {
    return await res.json();
  } else {
    return await Promise.resolve();
  }
}
/**
 * Blow up string or symbol types into full-fledged type descriptors,
 *   and add defaults
 *
 * @function normalizeTypeDescriptors
 * @access private
 * @param {array} types - The [RSAA].types from a validated RSAA
 * @returns {array}
 */


function normalizeTypeDescriptors(types) {
  let [requestType, successType, failureType] = types;

  if (typeof requestType === 'string' || typeof requestType === 'symbol') {
    requestType = {
      type: requestType
    };
  }

  if (typeof successType === 'string' || typeof successType === 'symbol') {
    successType = {
      type: successType
    };
  }

  successType = _objectSpread({
    payload: (action, state, res) => getJSON(res)
  }, successType);

  if (typeof failureType === 'string' || typeof failureType === 'symbol') {
    failureType = {
      type: failureType
    };
  }

  failureType = _objectSpread({
    payload: (action, state, res) => getJSON(res).then(json => new ApiError(res.status, res.statusText, json))
  }, failureType);
  return [requestType, successType, failureType];
}
/**
 * Evaluate a type descriptor to an FSA
 *
 * @function actionWith
 * @access private
 * @param {object} descriptor - A type descriptor
 * @param {array} args - The array of arguments for `payload` and `meta` function properties
 * @returns {object}
 */


async function actionWith(descriptor, args = []) {
  try {
    descriptor.payload = typeof descriptor.payload === 'function' ? await descriptor.payload(...args) : descriptor.payload;
  } catch (e) {
    descriptor.payload = new InternalError(e.message);
    descriptor.error = true;
  }

  try {
    descriptor.meta = typeof descriptor.meta === 'function' ? await descriptor.meta(...args) : descriptor.meta;
  } catch (e) {
    delete descriptor.meta;
    descriptor.payload = new InternalError(e.message);
    descriptor.error = true;
  }

  return descriptor;
}

/**
 * Default options for redux-api-middleware
 * These can be customized by passing options into `createMiddleware`
 * @type {Object}
 */

const defaults = {
  ok: res => res.ok,
  fetch
};
/**
 * A middleware creator used to create a ReduxApiMiddleware
 * with custom defaults
 *
 * @type {function}
 * @returns {ReduxMiddleware}
 * @access public
 */

function createMiddleware(options = {}) {
  const middlewareOptions = Object.assign({}, defaults, options);
  return ({
    getState
  }) => next => action => {
    // Do not process actions without an [RSAA] property
    if (!isRSAA(action)) {
      return next(action);
    }

    return (async () => {
      // Try to dispatch an error request FSA for invalid RSAAs
      const validationErrors = validateRSAA(action);

      if (validationErrors.length) {
        const callAPI = action[RSAA];

        if (callAPI.types && Array.isArray(callAPI.types)) {
          let requestType = callAPI.types[0];

          if (requestType && requestType.type) {
            requestType = requestType.type;
          }

          next({
            type: requestType,
            payload: new InvalidRSAA(validationErrors),
            error: true
          });
        }

        return;
      } // Parse the validated RSAA action


      const callAPI = action[RSAA];
      var {
        endpoint,
        body,
        headers,
        options = {},
        fetch: doFetch = middlewareOptions.fetch,
        ok = middlewareOptions.ok
      } = callAPI;
      const {
        method,
        credentials,
        bailout,
        types
      } = callAPI;
      const [requestType, successType, failureType] = normalizeTypeDescriptors(types); // Should we bail out?

      try {
        if (typeof bailout === 'boolean' && bailout || typeof bailout === 'function' && bailout(getState())) {
          return;
        }
      } catch (e) {
        return next((await actionWith(_objectSpread({}, failureType, {
          payload: new RequestError('[RSAA].bailout function failed'),
          error: true
        }), [action, getState()])));
      } // Process [RSAA].endpoint function


      if (typeof endpoint === 'function') {
        try {
          endpoint = endpoint(getState());
        } catch (e) {
          return next((await actionWith(_objectSpread({}, failureType, {
            payload: new RequestError('[RSAA].endpoint function failed'),
            error: true
          }), [action, getState()])));
        }
      } // Process [RSAA].body function


      if (typeof body === 'function') {
        try {
          body = body(getState());
        } catch (e) {
          return next((await actionWith(_objectSpread({}, failureType, {
            payload: new RequestError('[RSAA].body function failed'),
            error: true
          }), [action, getState()])));
        }
      } // Process [RSAA].headers function


      if (typeof headers === 'function') {
        try {
          headers = headers(getState());
        } catch (e) {
          return next((await actionWith(_objectSpread({}, failureType, {
            payload: new RequestError('[RSAA].headers function failed'),
            error: true
          }), [action, getState()])));
        }
      } // Process [RSAA].options function


      if (typeof options === 'function') {
        try {
          options = options(getState());
        } catch (e) {
          return next((await actionWith(_objectSpread({}, failureType, {
            payload: new RequestError('[RSAA].options function failed'),
            error: true
          }), [action, getState()])));
        }
      } // We can now dispatch the request FSA


      if (typeof requestType.payload === 'function' || typeof requestType.meta === 'function') {
        next((await actionWith(requestType, [action, getState()])));
      } else {
        next(requestType);
      }

      let res;

      try {
        // Make the API call
        res = await doFetch(endpoint, _objectSpread({}, options, {
          method,
          body: body || undefined,
          credentials,
          headers: headers || {}
        }));
      } catch (e) {
        // The request was malformed, or there was a network error
        return next((await actionWith(_objectSpread({}, failureType, {
          payload: new RequestError(e.message),
          error: true
        }), [action, getState()])));
      }

      let isOk;

      try {
        isOk = ok(res);
      } catch (e) {
        return next((await actionWith(_objectSpread({}, failureType, {
          payload: new InternalError('[RSAA].ok function failed'),
          error: true
        }), [action, getState(), res])));
      } // Process the server response


      if (isOk) {
        return next((await actionWith(successType, [action, getState(), res])));
      } else {
        return next((await actionWith(_objectSpread({}, failureType, {
          error: true
        }), [action, getState(), res])));
      }
    })();
  };
}
/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */


function apiMiddleware({
  getState
}) {
  return createMiddleware()({
    getState
  });
}

/**
 * Redux middleware for calling an API
 * @module redux-api-middleware
 * @requires lodash.isplainobject
 * @exports {string} RSAA
 * @exports {function} isRSAA
 * @exports {function} validateRSAA
 * @exports {function} isValidRSAA
 * @exports {error} InvalidRSAA
 * @exports {error} InternalError
 * @exports {error} RequestError
 * @exports {error} ApiError
 * @exports {function} getJSON
 * @exports {function} createMiddleware
 * @exports {ReduxMiddleWare} apiMiddleware
 */

exports.RSAA = RSAA;
exports.isRSAA = isRSAA;
exports.validateRSAA = validateRSAA;
exports.isValidRSAA = isValidRSAA;
exports.InvalidRSAA = InvalidRSAA;
exports.InternalError = InternalError;
exports.RequestError = RequestError;
exports.ApiError = ApiError;
exports.getJSON = getJSON;
exports.createMiddleware = createMiddleware;
exports.apiMiddleware = apiMiddleware;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var useRegionEvent = function useRegionEvent(ref, eventName, callback) {
  var callbackRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (!ref) {
      return;
    }

    if (callback) {
      callbackRef.current = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return callback.apply(void 0, [ref].concat(args));
      };

      ref.on(eventName, callbackRef.current);
    }

    return function () {
      ref.un(eventName, callbackRef.current);
      callbackRef.current = null;
    };
  }, [ref, eventName, callback]);
};

var _default = useRegionEvent;
exports.default = _default;
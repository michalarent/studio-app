"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Region = void 0;

var _react = require("react");

var _useRegionEvent = _interopRequireDefault(require("../hooks/useRegionEvent"));

var _WaveSurferContext = _interopRequireDefault(require("../contexts/WaveSurferContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var UpdatableRegionProps = ["start", "end", "loop", "color", "handleStyle", "data", "resize", "drag", "maxLength", "minLength", "attributes"];

var Region = function Region(_ref) {
  var onOver = _ref.onOver,
      onLeave = _ref.onLeave,
      onClick = _ref.onClick,
      onDoubleClick = _ref.onDoubleClick,
      onIn = _ref.onIn,
      onOut = _ref.onOut,
      onRemove = _ref.onRemove,
      onUpdate = _ref.onUpdate,
      onUpdateEnd = _ref.onUpdateEnd,
      props = _objectWithoutProperties(_ref, ["onOver", "onLeave", "onClick", "onDoubleClick", "onIn", "onOut", "onRemove", "onUpdate", "onUpdateEnd"]);

  var waveSurfer = (0, _react.useContext)(_WaveSurferContext.default);
  var isRenderedCache = (0, _react.useRef)(false);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      regionRef = _useState2[0],
      setRegionRef = _useState2[1];

  (0, _react.useEffect)(function () {
    return function () {
      if (regionRef) {
        regionRef.remove();
      }
    };
  }, [regionRef]); // TODO: may need some improvements

  (0, _react.useEffect)(function () {
    if (regionRef) {
      var update = UpdatableRegionProps.reduce(function (result, prop) {
        if (regionRef[prop] !== props[prop]) {
          return _objectSpread({}, result, _defineProperty({}, prop, props[prop]));
        }

        return result;
      }, {});
      regionRef.update(update);
    }
  }, UpdatableRegionProps.map(function (prop) {
    return props[prop];
  }));
  (0, _react.useEffect)(function () {
    if (!isRenderedCache.current && waveSurfer) {
      isRenderedCache.current = true;
      var region;
      region = waveSurfer.regions.list[props.id];

      if (!region) {
        region = waveSurfer.addRegion(props);
      }

      setRegionRef(region);
    } // eslint-disable-next-line

  }, [waveSurfer]);
  (0, _useRegionEvent.default)(regionRef, "click", onClick);
  (0, _useRegionEvent.default)(regionRef, "over", onOver);
  (0, _useRegionEvent.default)(regionRef, "leave", onLeave);
  (0, _useRegionEvent.default)(regionRef, "dbclick", onDoubleClick);
  (0, _useRegionEvent.default)(regionRef, "in", onIn);
  (0, _useRegionEvent.default)(regionRef, "out", onOut);
  (0, _useRegionEvent.default)(regionRef, "remove", onRemove);
  (0, _useRegionEvent.default)(regionRef, "update", onUpdate);
  (0, _useRegionEvent.default)(regionRef, "update-end", onUpdateEnd);
  return null;
};

exports.Region = Region;
var _default = Region;
exports.default = _default;
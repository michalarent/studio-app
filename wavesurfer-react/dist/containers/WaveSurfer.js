"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _WaveSurferContext = _interopRequireDefault(require("../contexts/WaveSurferContext"));

var _WaveForm = _interopRequireDefault(require("../components/WaveForm"));

var _createWavesurfer = _interopRequireDefault(require("../utils/createWavesurfer"));

var _getWaveFormOptionsFromProps = _interopRequireDefault(require("../utils/getWaveFormOptionsFromProps"));

var _createPlugin = _interopRequireDefault(require("../utils/createPlugin"));

var _getDifference2 = _interopRequireDefault(require("../utils/getDifference"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WaveSurfer = function WaveSurfer(_ref) {
  var children = _ref.children,
      plugins = _ref.plugins,
      onMount = _ref.onMount;
  var usedPluginsListCache = (0, _react.useRef)([]);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      waveSurfer = _useState2[0],
      setWaveSurfer = _useState2[1];

  (0, _react.useEffect)(function () {
    return function () {
      if (waveSurfer) {
        waveSurfer.destroy();
        setWaveSurfer(null);
      }
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (waveSurfer) {
      var nextPluginsMap = plugins.map(_createPlugin.default);

      var _getDifference = (0, _getDifference2.default)(usedPluginsListCache.current, nextPluginsMap),
          disabled = _getDifference.disabled,
          enabled = _getDifference.enabled;

      usedPluginsListCache.current = nextPluginsMap;
      disabled.forEach(function (plugin) {
        if (!plugin.name) return;
        waveSurfer.destroyPlugin(plugin.name);
      });
      enabled.forEach(function (plugin) {
        if (!plugin.name) return;
        waveSurfer.addPlugin(plugin).initPlugin(plugin.name);
      });
    }
  }, [plugins]);
  (0, _react.useEffect)(function () {
    var waveformProps = null; // get timeline and waveform props

    _react.default.Children.forEach(children, function (element) {
      var props = element.props; // eslint-disable-next-line react/prop-types

      var id = props.id,
          rest = _objectWithoutProperties(props, ["id"]);

      var derivedProps = null;

      if (element.type === _WaveForm.default) {
        derivedProps = (0, _getWaveFormOptionsFromProps.default)(rest);
        waveformProps = _objectSpread({}, derivedProps, {
          container: "#" + id
        });
      }
    }); // construct initial plugins list


    var pluginsList = [];

    if (plugins) {
      pluginsList = plugins.map(_createPlugin.default);
    }

    usedPluginsListCache.current = pluginsList;

    if (waveSurfer) {
      waveSurfer.destroy();
      setWaveSurfer(null);
    }

    var ws = (0, _createWavesurfer.default)(_objectSpread({}, waveformProps && waveformProps, {
      plugins: pluginsList
    }));
    setWaveSurfer(ws);

    if (onMount) {
      onMount(ws);
    }
  }, []);
  return _react.default.createElement(_WaveSurferContext.default.Provider, {
    value: waveSurfer
  }, children);
};

WaveSurfer.propTypes = {
  plugins: _propTypes.default.arrayOf(_propTypes.default.shape({
    plugin: _propTypes.default.any,
    options: _propTypes.default.any
  })),
  children: _propTypes.default.any,
  onMount: _propTypes.default.func
};
WaveSurfer.defaultProps = {
  children: null,
  plugins: []
};
var _default = WaveSurfer;
exports.default = _default;
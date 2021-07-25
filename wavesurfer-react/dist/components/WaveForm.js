"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WaveForm = function WaveForm(_ref) {
  var id = _ref.id,
      children = _ref.children;
  return _react.default.createElement("div", {
    id: id
  }, children);
};

WaveForm.defaultProps = {
  waveColor: "violet",
  progressColor: "purple",
  id: "waveform"
};
var _default = WaveForm;
exports.default = _default;
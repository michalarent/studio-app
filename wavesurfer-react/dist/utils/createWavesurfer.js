"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createWavesurfer;

var _wavesurfer = _interopRequireDefault(require("wavesurfer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createWavesurfer(options) {
  return _wavesurfer.default.create(options);
}
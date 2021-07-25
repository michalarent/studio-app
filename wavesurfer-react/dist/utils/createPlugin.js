"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPlugin;

function createPlugin(pluginObj) {
  var plugin = pluginObj.plugin,
      options = pluginObj.options,
      _pluginObj$creator = pluginObj.creator,
      creator = _pluginObj$creator === void 0 ? "create" : _pluginObj$creator;
  if (!plugin || !plugin[creator]) return null;
  return plugin[creator](options);
}
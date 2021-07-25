"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getDifference = function getDifference(arr1, arr2) {
  var nextArr1 = _toConsumableArray(arr1);

  var nextArr2 = _toConsumableArray(arr2);

  var disabled = nextArr1.filter(function (item) {
    return nextArr2.findIndex(function (nextItem) {
      return nextItem.name === item.name;
    }) === -1;
  });
  var enabled = nextArr2.filter(function (item) {
    return nextArr1.findIndex(function (nextItem) {
      return nextItem.name === item.name;
    }) === -1;
  });
  return {
    disabled: disabled,
    enabled: enabled
  }; // map arr2 via reduce and remove each item, which name exists in arr1
};

var _default = getDifference;
exports.default = _default;
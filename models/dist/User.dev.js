"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  avatarUrl: String
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('User', UserSchema);

exports["default"] = _default;
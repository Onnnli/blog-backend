"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registrationValidator = void 0;

var _expressValidator = _interopRequireDefault(require("express-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var body = _expressValidator["default"].body;
var registrationValidator = [body('email').isEmail(), body('password').isLength({
  min: 5
}), body('fullName').isLength({
  min: 1
}), body('avatarUrl').optional().isURL()];
exports.registrationValidator = registrationValidator;
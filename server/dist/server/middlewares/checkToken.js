"use strict";

var _userQueries = _interopRequireDefault(require("../controllers/queries/userQueries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require('jsonwebtoken');

var CONSTANTS = require('../../constants');

var TokenError = require('../errors/TokenError');

module.exports.checkAuth = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var accessToken, tokenData, foundUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            accessToken = req.headers.authorization;

            if (accessToken) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next(new TokenError('need token')));

          case 3:
            _context.prev = 3;
            tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
            _context.next = 7;
            return _userQueries["default"].findUser({
              id: tokenData.userId
            });

          case 7:
            foundUser = _context.sent;
            res.send({
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              role: foundUser.role,
              id: foundUser.id,
              avatar: foundUser.avatar,
              displayName: foundUser.displayName,
              balance: foundUser.balance,
              email: foundUser.email
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            next(new TokenError());

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 11]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.checkToken = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var accessToken;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            accessToken = req.headers.authorization;

            if (accessToken) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", next(new TokenError('need token')));

          case 3:
            try {
              req.tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
              next();
            } catch (err) {
              next(new TokenError());
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
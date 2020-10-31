"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bd = require('../../models/index');

var NotFound = require('../../errors/UserNotFoundError');

var ServerError = require('../../errors/ServerError');

var bcrypt = require('bcrypt');

module.exports.updateUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, userId, transaction) {
    var _yield$bd$Users$updat, _yield$bd$Users$updat2, updatedCount, _yield$bd$Users$updat3, updatedUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return bd.Users.update(data, {
              where: {
                id: userId
              },
              returning: true,
              transaction: transaction
            });

          case 2:
            _yield$bd$Users$updat = _context.sent;
            _yield$bd$Users$updat2 = _slicedToArray(_yield$bd$Users$updat, 2);
            updatedCount = _yield$bd$Users$updat2[0];
            _yield$bd$Users$updat3 = _slicedToArray(_yield$bd$Users$updat2[1], 1);
            updatedUser = _yield$bd$Users$updat3[0];

            if (!(updatedCount !== 1)) {
              _context.next = 9;
              break;
            }

            throw new ServerError('cannot update user');

          case 9:
            return _context.abrupt("return", updatedUser.dataValues);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.findUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(predicate, transaction) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return bd.Users.findOne({
              where: predicate,
              transaction: transaction
            });

          case 2:
            result = _context2.sent;

            if (result) {
              _context2.next = 7;
              break;
            }

            throw new NotFound('user with this data didn`t exist');

          case 7:
            return _context2.abrupt("return", result.get({
              plain: true
            }));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports.userCreation = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
    var newUser;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return bd.Users.create(data);

          case 2:
            newUser = _context3.sent;

            if (newUser) {
              _context3.next = 7;
              break;
            }

            throw new ServerError('server error on user creation');

          case 7:
            return _context3.abrupt("return", newUser.get({
              plain: true
            }));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x6) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports.passwordCompare = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(pass1, pass2) {
    var passwordCompare;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return bcrypt.compare(pass1, pass2);

          case 2:
            passwordCompare = _context4.sent;

            if (passwordCompare) {
              _context4.next = 5;
              break;
            }

            throw new NotFound('Wrong password');

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
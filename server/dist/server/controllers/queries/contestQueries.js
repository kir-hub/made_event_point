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

var ServerError = require('../../errors/ServerError');

module.exports.updateContest = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, predicate, transaction) {
    var _yield$bd$Contests$up, _yield$bd$Contests$up2, updatedCount, _yield$bd$Contests$up3, updatedContest;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return bd.Contests.update(data, {
              where: predicate,
              returning: true,
              transaction: transaction
            });

          case 2:
            _yield$bd$Contests$up = _context.sent;
            _yield$bd$Contests$up2 = _slicedToArray(_yield$bd$Contests$up, 2);
            updatedCount = _yield$bd$Contests$up2[0];
            _yield$bd$Contests$up3 = _slicedToArray(_yield$bd$Contests$up2[1], 1);
            updatedContest = _yield$bd$Contests$up3[0];

            if (!(updatedCount !== 1)) {
              _context.next = 11;
              break;
            }

            throw new ServerError('cannot update Contest');

          case 11:
            return _context.abrupt("return", updatedContest.dataValues);

          case 12:
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

module.exports.updateContestStatus = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data, predicate, transaction) {
    var updateResult;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return bd.Contests.update(data, {
              where: predicate,
              returning: true,
              transaction: transaction
            });

          case 2:
            updateResult = _context2.sent;

            if (!(updateResult[0] < 1)) {
              _context2.next = 7;
              break;
            }

            throw new ServerError('cannot update Contest');

          case 7:
            return _context2.abrupt("return", updateResult[1][0].dataValues);

          case 8:
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

module.exports.updateOffer = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data, predicate, transaction) {
    var _yield$bd$Offers$upda, _yield$bd$Offers$upda2, updatedCount, _yield$bd$Offers$upda3, updatedOffer;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return bd.Offers.update(data, {
              where: predicate,
              returning: true,
              transaction: transaction
            });

          case 2:
            _yield$bd$Offers$upda = _context3.sent;
            _yield$bd$Offers$upda2 = _slicedToArray(_yield$bd$Offers$upda, 2);
            updatedCount = _yield$bd$Offers$upda2[0];
            _yield$bd$Offers$upda3 = _slicedToArray(_yield$bd$Offers$upda2[1], 1);
            updatedOffer = _yield$bd$Offers$upda3[0];

            if (!(updatedCount !== 1)) {
              _context3.next = 11;
              break;
            }

            throw new ServerError('cannot update offer!');

          case 11:
            return _context3.abrupt("return", updatedOffer.dataValues);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports.updateOfferStatus = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data, predicate, transaction) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return bd.Offers.update(data, {
              where: predicate,
              returning: true,
              transaction: transaction
            });

          case 2:
            result = _context4.sent;

            if (!(result[0] < 1)) {
              _context4.next = 7;
              break;
            }

            throw new ServerError('cannot update offer!');

          case 7:
            return _context4.abrupt("return", result[1]);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports.createOffer = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(data) {
    var result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return bd.Offers.create(data);

          case 2:
            result = _context5.sent;

            if (result) {
              _context5.next = 7;
              break;
            }

            throw new ServerError('cannot create new Offer');

          case 7:
            return _context5.abrupt("return", result.get({
              plain: true
            }));

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x13) {
    return _ref5.apply(this, arguments);
  };
}();
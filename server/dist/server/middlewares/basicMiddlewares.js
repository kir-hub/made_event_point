"use strict";

var _constants = _interopRequireDefault(require("../../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bd = require('../models/index');

var NotFound = require('../errors/UserNotFoundError');

var RightsError = require('../errors/RightsError');

var ServerError = require('../errors/ServerError');

module.exports.parseBody = function (req, res, next) {
  req.body.contests = JSON.parse(req.body.contests);

  for (var i = 0; i < req.body.contests.length; i++) {
    if (req.body.contests[i].haveFile) {
      var file = req.files.splice(0, 1);
      req.body.contests[i].fileName = file[0].filename;
      req.body.contests[i].originalFileName = file[0].originalname;
    }
  }

  next();
};

module.exports.canGetContest = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = null;
            _context.prev = 1;

            if (!(req.tokenData.role === _constants["default"].CUSTOMER)) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return bd.Contests.findOne({
              where: {
                id: req.headers.contestid,
                userId: req.tokenData.userId
              }
            });

          case 5:
            result = _context.sent;
            _context.next = 12;
            break;

          case 8:
            if (!(req.tokenData.role === _constants["default"].CREATOR)) {
              _context.next = 12;
              break;
            }

            _context.next = 11;
            return bd.Contests.findOne({
              where: {
                id: req.headers.contestid,
                status: _defineProperty({}, bd.Sequelize.Op.or, [_constants["default"].CONTEST_STATUS_ACTIVE, _constants["default"].CONTEST_STATUS_FINISHED])
              }
            });

          case 11:
            result = _context.sent;

          case 12:
            !!result ? next() : next(new RightsError());
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);
            next(new ServerError(_context.t0));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 15]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.onlyForCreative = function (req, res, next) {
  if (req.tokenData.role === _constants["default"].CUSTOMER) {
    next(new RightsError());
  } else {
    next();
  }
};

module.exports.onlyForCustomer = function (req, res, next) {
  if (req.tokenData.role === _constants["default"].CREATOR) {
    return next(new RightsError('this page only for customers'));
  } else {
    next();
  }
};

module.exports.canSendOffer = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.tokenData.role === _constants["default"].CUSTOMER)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", next(new RightsError()));

          case 2:
            _context2.prev = 2;
            _context2.next = 5;
            return bd.Contests.findOne({
              where: {
                id: req.body.contestId
              },
              attributes: ['status']
            });

          case 5:
            result = _context2.sent;

            if (!(result.get({
              plain: true
            }).status === _constants["default"].CONTEST_STATUS_ACTIVE)) {
              _context2.next = 10;
              break;
            }

            next();
            _context2.next = 11;
            break;

          case 10:
            return _context2.abrupt("return", next(new RightsError()));

          case 11:
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            next(new ServerError());

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports.onlyForCustomerWhoCreateContest = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return bd.Contests.findOne({
              where: {
                userId: req.tokenData.userId,
                id: req.body.contestId,
                status: _constants["default"].CONTEST_STATUS_ACTIVE
              }
            });

          case 3:
            result = _context3.sent;

            if (result) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", next(new RightsError()));

          case 6:
            next();
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            next(new ServerError());

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports.canUpdateContest = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            result = bd.Contests.findOne({
              where: {
                userId: req.tokenData.userId,
                id: req.body.contestId,
                status: _defineProperty({}, bd.Sequelize.Op.not, _constants["default"].CONTEST_STATUS_FINISHED)
              }
            });

            if (result) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return", next(new RightsError()));

          case 4:
            next();
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            next(new ServerError());

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
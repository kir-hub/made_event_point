"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var schems = require('../validationSchemes/schems');

var ServerError = require('../errors/ServerError');

var BadRequestError = require('../errors/BadRequestError');

module.exports.validateRegistrationData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var validationResult;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return schems.registrationSchem.isValid(req.body);

          case 2:
            validationResult = _context.sent;

            if (validationResult) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", next(new BadRequestError('Invalid data for registration')));

          case 7:
            next();

          case 8:
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

module.exports.validateLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var validationResult;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return schems.loginSchem.isValid(req.body);

          case 2:
            validationResult = _context2.sent;

            if (!validationResult) {
              _context2.next = 7;
              break;
            }

            next();
            _context2.next = 8;
            break;

          case 7:
            return _context2.abrupt("return", next(new BadRequestError('Invalid data for login')));

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

module.exports.validateContestCreation = function (req, res, next) {
  var promiseArray = [];
  req.body.contests.forEach(function (el) {
    promiseArray.push(schems.contestSchem.isValid(el));
  });
  return Promise.all(promiseArray).then(function (results) {
    results.forEach(function (result) {
      if (!result) {
        return next(new BadRequestError());
      }
    });
    next();
  })["catch"](function (err) {
    next(err);
  });
};
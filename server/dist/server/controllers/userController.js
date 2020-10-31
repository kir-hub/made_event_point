"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require('jsonwebtoken');

var CONSTANTS = require('../../constants');

var bd = require('../models/index');

var NotFound = require('../errors/UserNotFoundError');

var ServerError = require('../errors/ServerError');

var UtilFunctions = require('../utils/functions');

var NotEnoughMoney = require('../errors/NotEnoughMoney');

var bcrypt = require('bcrypt');

var NotUniqueEmail = require('../errors/NotUniqueEmail');

var moment = require('moment');

var uuid = require('uuid/v1');

var controller = require('../../socketInit');

var userQueries = require('./queries/userQueries');

var bankQueries = require('./queries/bankQueries');

var ratingQueries = require('./queries/ratingQueries');

module.exports.login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var foundUser, accessToken;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return userQueries.findUser({
              email: req.body.email
            });

          case 3:
            foundUser = _context.sent;
            _context.next = 6;
            return userQueries.passwordCompare(req.body.password, foundUser.password);

          case 6:
            accessToken = jwt.sign({
              firstName: foundUser.firstName,
              userId: foundUser.id,
              role: foundUser.role,
              lastName: foundUser.lastName,
              avatar: foundUser.avatar,
              displayName: foundUser.displayName,
              balance: foundUser.balance,
              email: foundUser.email,
              rating: foundUser.rating
            }, CONSTANTS.JWT_SECRET, {
              expiresIn: CONSTANTS.ACCESS_TOKEN_TIME
            });
            _context.next = 9;
            return userQueries.updateUser({
              accessToken: accessToken
            }, foundUser.id);

          case 9:
            res.send({
              token: accessToken
            });
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.registration = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var newUser, accessToken;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return userQueries.userCreation(Object.assign(req.body, {
              password: req.hashPass
            }));

          case 3:
            newUser = _context2.sent;
            accessToken = jwt.sign({
              firstName: newUser.firstName,
              userId: newUser.id,
              role: newUser.role,
              lastName: newUser.lastName,
              avatar: newUser.avatar,
              displayName: newUser.displayName,
              balance: newUser.balance,
              email: newUser.email,
              rating: newUser.rating
            }, CONSTANTS.JWT_SECRET, {
              expiresIn: CONSTANTS.ACCESS_TOKEN_TIME
            });
            _context2.next = 7;
            return userQueries.updateUser({
              accessToken: accessToken
            }, newUser.id);

          case 7:
            res.send({
              token: accessToken
            });
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);

            if (_context2.t0.name === 'SequelizeUniqueConstraintError') {
              next(new NotUniqueEmail());
            } else {
              next(_context2.t0);
            }

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

function getQuery(offerId, userId, mark, isFirst, transaction) {
  var getCreateQuery = function getCreateQuery() {
    return ratingQueries.createRating({
      offerId: offerId,
      mark: mark,
      userId: userId
    }, transaction);
  };

  var getUpdateQuery = function getUpdateQuery() {
    return ratingQueries.updateRating({
      mark: mark
    }, {
      offerId: offerId,
      userId: userId
    }, transaction);
  };

  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var sum, avg, transaction, _req$body, isFirst, offerId, mark, creatorId, userId, query, offersArray, i;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            sum = 0;
            avg = 0;
            _req$body = req.body, isFirst = _req$body.isFirst, offerId = _req$body.offerId, mark = _req$body.mark, creatorId = _req$body.creatorId;
            userId = req.tokenData.userId;
            _context3.prev = 4;
            _context3.next = 7;
            return bd.sequelize.transaction({
              isolationLevel: bd.Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
            });

          case 7:
            transaction = _context3.sent;
            query = getQuery(offerId, userId, mark, isFirst, transaction);
            _context3.next = 11;
            return query();

          case 11:
            _context3.next = 13;
            return bd.Ratings.findAll({
              include: [{
                model: bd.Offers,
                required: true,
                where: {
                  userId: creatorId
                }
              }],
              transaction: transaction
            });

          case 13:
            offersArray = _context3.sent;

            for (i = 0; i < offersArray.length; i++) {
              sum += offersArray[i].dataValues.mark;
            }

            avg = sum / offersArray.length;
            _context3.next = 18;
            return userQueries.updateUser({
              rating: avg
            }, creatorId, transaction);

          case 18:
            transaction.commit();
            controller.getNotificationController().emitChangeMark(creatorId);
            res.send({
              userId: creatorId,
              rating: avg
            });
            _context3.next = 27;
            break;

          case 23:
            _context3.prev = 23;
            _context3.t0 = _context3["catch"](4);
            transaction.rollback();
            next(_context3.t0);

          case 27:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 23]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports.payment = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var transaction, orderId;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return bd.sequelize.transaction();

          case 3:
            transaction = _context4.sent;
            _context4.next = 6;
            return bankQueries.updateBankBalance({
              balance: bd.sequelize.literal("\n                CASE\n            WHEN \"cardNumber\"='".concat(req.body.number.replace(/ /g, ''), "' AND \"cvc\"='").concat(req.body.cvc, "' AND \"expiry\"='").concat(req.body.expiry, "'\n                THEN \"balance\"-").concat(req.body.price, "\n            WHEN \"cardNumber\"='").concat(CONSTANTS.SQUADHELP_BANK_NUMBER, "' AND \"cvc\"='").concat(CONSTANTS.SQUADHELP_BANK_CVC, "' AND \"expiry\"='").concat(CONSTANTS.SQUADHELP_BANK_EXPIRY, "'\n                THEN \"balance\"+").concat(req.body.price, " END\n        "))
            }, {
              cardNumber: _defineProperty({}, bd.sequelize.Op["in"], [CONSTANTS.SQUADHELP_BANK_NUMBER, req.body.number.replace(/ /g, '')])
            }, transaction);

          case 6:
            orderId = uuid();
            req.body.contests.forEach(function (contest, index) {
              var prize = index === req.body.contests.length - 1 ? Math.ceil(req.body.price / req.body.contests.length) : Math.floor(req.body.price / req.body.contests.length);
              contest = Object.assign(contest, {
                status: index === 0 ? 'active' : 'pending',
                userId: req.tokenData.userId,
                priority: index + 1,
                orderId: orderId,
                createdAt: moment().format('YYYY-MM-DD HH:mm'),
                prize: prize
              });
            });
            _context4.next = 10;
            return bd.Contests.bulkCreate(req.body.contests, transaction);

          case 10:
            transaction.commit();
            res.send();
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            transaction.rollback();
            next(_context4.t0);

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 14]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports.updateUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var updatedUser;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            if (req.file) {
              req.body.avatar = req.file.filename;
            }

            _context5.next = 4;
            return userQueries.updateUser(req.body, req.tokenData.userId);

          case 4:
            updatedUser = _context5.sent;
            res.send({
              firstName: updatedUser.firstName,
              lastName: updatedUser.lastName,
              displayName: updatedUser.displayName,
              avatar: updatedUser.avatar,
              email: updatedUser.email,
              balance: updatedUser.balance,
              role: updatedUser.role,
              id: updatedUser.id
            });
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

module.exports.cashout = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var transaction, updatedUser;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return bd.sequelize.transaction();

          case 3:
            transaction = _context6.sent;
            _context6.next = 6;
            return userQueries.updateUser({
              balance: bd.sequelize.literal('balance - ' + req.body.sum)
            }, req.tokenData.userId, transaction);

          case 6:
            updatedUser = _context6.sent;
            _context6.next = 9;
            return bankQueries.updateBankBalance({
              balance: bd.sequelize.literal("CASE \n                WHEN \"cardNumber\"='".concat(req.body.number.replace(/ /g, ''), "' AND \"expiry\"='").concat(req.body.expiry, "' AND \"cvc\"='").concat(req.body.cvc, "'\n                    THEN \"balance\"+").concat(req.body.sum, "\n                WHEN \"cardNumber\"='").concat(CONSTANTS.SQUADHELP_BANK_NUMBER, "' AND \"expiry\"='").concat(CONSTANTS.SQUADHELP_BANK_EXPIRY, "' AND \"cvc\"='").concat(CONSTANTS.SQUADHELP_BANK_CVC, "'\n                    THEN \"balance\"-").concat(req.body.sum, "\n                 END\n                "))
            }, {
              cardNumber: _defineProperty({}, bd.sequelize.Op["in"], [CONSTANTS.SQUADHELP_BANK_NUMBER, req.body.number.replace(/ /g, '')])
            }, transaction);

          case 9:
            transaction.commit();
            res.send({
              balance: updatedUser.balance
            });
            _context6.next = 17;
            break;

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6["catch"](0);
            transaction.rollback();
            next(_context6.t0);

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 13]]);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
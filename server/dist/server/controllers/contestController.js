"use strict";

var _ServerError = _interopRequireDefault(require("../errors/ServerError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var db = require('../models/index');

var contestQueries = require('./queries/contestQueries');

var userQueries = require('./queries/userQueries');

var controller = require('../../socketInit');

var UtilFunctions = require('../utils/functions');

var NotFound = require('../errors/UserNotFoundError');

var CONSTANTS = require('../../constants');

module.exports.dataForContest = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var response, characteristics;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            response = {};
            _context.prev = 1;
            _context.next = 4;
            return db.Selects.findAll({
              where: {
                type: _defineProperty({}, db.Sequelize.Op.or, [req.body.characteristic1, req.body.characteristic2, 'industry'])
              }
            });

          case 4:
            characteristics = _context.sent;

            if (characteristics) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", next(new _ServerError["default"]()));

          case 7:
            characteristics.forEach(function (characteristic) {
              if (!response[characteristic.type]) {
                response[characteristic.type] = [];
              }

              response[characteristic.type].push(characteristic.describe);
            });
            res.send(response);
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            next(new _ServerError["default"]('cannot get contest preferences'));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.getContestById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var contestInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return db.Contests.findOne({
              where: {
                id: req.headers.contestid
              },
              order: [[db.Offers, 'id', 'asc']],
              include: [{
                model: db.Users,
                required: true,
                attributes: {
                  exclude: ['password', 'role', 'balance', 'accessToken']
                }
              }, {
                model: db.Offers,
                required: false,
                where: req.tokenData.role === CONSTANTS.CREATOR ? {
                  userId: req.tokenData.userId
                } : {},
                attributes: {
                  exclude: ['userId', 'contestId']
                },
                include: [{
                  model: db.Users,
                  required: true,
                  attributes: {
                    exclude: ['password', 'role', 'balance', 'accessToken']
                  }
                }, {
                  model: db.Ratings,
                  required: false,
                  where: {
                    userId: req.tokenData.userId
                  },
                  attributes: {
                    exclude: ['userId', 'offerId']
                  }
                }]
              }]
            });

          case 3:
            contestInfo = _context2.sent;
            contestInfo = contestInfo.get({
              plain: true
            });
            contestInfo.Offers.forEach(function (offer) {
              if (offer.Rating) {
                offer.mark = offer.Rating.mark;
              }

              delete offer.Rating;
            });
            res.send(contestInfo);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            next(new _ServerError["default"]());

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports.downloadFile = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var file;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
            res.download(file);

          case 2:
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

module.exports.updateContest = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var contestId, updatedContest;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (req.file) {
              req.body.fileName = req.file.filename;
              req.body.originalFileName = req.file.originalname;
            }

            contestId = req.body.contestId;
            delete req.body.contestId;
            _context4.prev = 3;
            _context4.next = 6;
            return contestQueries.updateContest(req.body, {
              id: contestId,
              userId: req.tokenData.userId
            });

          case 6:
            updatedContest = _context4.sent;
            res.send(updatedContest);
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](3);
            next(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 10]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports.setNewOffer = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var obj, result, User;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            obj = {};

            if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
              obj.fileName = req.file.filename;
              obj.originalFileName = req.file.originalname;
            } else {
              obj.text = req.body.offerData;
            }

            obj.userId = req.tokenData.userId;
            obj.contestId = req.body.contestId;
            _context5.prev = 4;
            _context5.next = 7;
            return contestQueries.createOffer(obj);

          case 7:
            result = _context5.sent;
            delete result.contestId;
            delete result.userId;
            controller.getNotificationController().emitEntryCreated(req.body.customerId);
            User = Object.assign({}, req.tokenData, {
              id: req.tokenData.userId
            });
            res.send(Object.assign({}, result, {
              User: User
            }));
            _context5.next = 18;
            break;

          case 15:
            _context5.prev = 15;
            _context5.t0 = _context5["catch"](4);
            return _context5.abrupt("return", next(new _ServerError["default"]()));

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 15]]);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var rejectOffer = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(offerId, creatorId, contestId) {
    var rejectedOffer;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return contestQueries.updateOffer({
              status: CONSTANTS.OFFER_STATUS_REJECTED
            }, {
              id: offerId
            });

          case 2:
            rejectedOffer = _context6.sent;
            controller.getNotificationController().emitChangeOfferStatus(creatorId, 'Someone of yours offers was rejected', contestId);
            return _context6.abrupt("return", rejectedOffer);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function rejectOffer(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

var resolveOffer = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(contestId, creatorId, orderId, offerId, priority, transaction) {
    var finishedContest, updatedOffers, arrayRoomsId;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return contestQueries.updateContestStatus({
              status: db.sequelize.literal("   CASE\n            WHEN \"id\"=".concat(contestId, "  AND \"orderId\"='").concat(orderId, "' THEN '").concat(CONSTANTS.CONTEST_STATUS_FINISHED, "'\n            WHEN \"orderId\"='").concat(orderId, "' AND \"priority\"=").concat(priority + 1, "  THEN '").concat(CONSTANTS.CONTEST_STATUS_ACTIVE, "'\n            ELSE '").concat(CONSTANTS.CONTEST_STATUS_PENDING, "'\n            END\n    "))
            }, {
              orderId: orderId
            }, transaction);

          case 2:
            finishedContest = _context7.sent;
            _context7.next = 5;
            return userQueries.updateUser({
              balance: db.sequelize.literal('balance + ' + finishedContest.prize)
            }, creatorId, transaction);

          case 5:
            _context7.next = 7;
            return contestQueries.updateOfferStatus({
              status: db.sequelize.literal(" CASE\n            WHEN \"id\"=".concat(offerId, " THEN '").concat(CONSTANTS.OFFER_STATUS_WON, "'\n            ELSE '").concat(CONSTANTS.OFFER_STATUS_REJECTED, "'\n            END\n    "))
            }, {
              contestId: contestId
            }, transaction);

          case 7:
            updatedOffers = _context7.sent;
            transaction.commit();
            arrayRoomsId = [];
            updatedOffers.forEach(function (offer) {
              if (offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !== offer.userId) {
                arrayRoomsId.push(offer.userId);
              }
            });
            controller.getNotificationController().emitChangeOfferStatus(arrayRoomsId, 'Someone of yours offers was rejected', contestId);
            controller.getNotificationController().emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
            return _context7.abrupt("return", updatedOffers[0].dataValues);

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function resolveOffer(_x19, _x20, _x21, _x22, _x23, _x24) {
    return _ref7.apply(this, arguments);
  };
}();

module.exports.setOfferStatus = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res, next) {
    var transaction, offer, winningOffer;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!(req.body.command === 'reject')) {
              _context8.next = 13;
              break;
            }

            _context8.prev = 1;
            _context8.next = 4;
            return rejectOffer(req.body.offerId, req.body.creatorId, req.body.contestId);

          case 4:
            offer = _context8.sent;
            res.send(offer);
            _context8.next = 11;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](1);
            next(_context8.t0);

          case 11:
            _context8.next = 28;
            break;

          case 13:
            if (!(req.body.command === 'resolve')) {
              _context8.next = 28;
              break;
            }

            _context8.prev = 14;
            _context8.next = 17;
            return db.sequelize.transaction();

          case 17:
            transaction = _context8.sent;
            _context8.next = 20;
            return resolveOffer(req.body.contestId, req.body.creatorId, req.body.orderId, req.body.offerId, req.body.priority, transaction);

          case 20:
            winningOffer = _context8.sent;
            res.send(winningOffer);
            _context8.next = 28;
            break;

          case 24:
            _context8.prev = 24;
            _context8.t1 = _context8["catch"](14);
            transaction.rollback();
            next(_context8.t1);

          case 28:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 8], [14, 24]]);
  }));

  return function (_x25, _x26, _x27) {
    return _ref8.apply(this, arguments);
  };
}();

module.exports.getCustomersContests = function (req, res, next) {
  db.Contests.findAll({
    where: {
      status: req.headers.status,
      userId: req.tokenData.userId
    },
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    order: [['id', 'DESC']],
    include: [{
      model: db.Offers,
      required: false,
      attributes: ['id']
    }]
  }).then(function (contests) {
    contests.forEach(function (contest) {
      return contest.dataValues.count = contest.dataValues.Offers.length;
    });
    var haveMore = true;

    if (contests.length === 0) {
      haveMore = false;
    }

    res.send({
      contests: contests,
      haveMore: haveMore
    });
  })["catch"](function (err) {
    return next(new _ServerError["default"](err));
  });
};

module.exports.getContests = function (req, res, next) {
  var predicates = UtilFunctions.createWhereForAllContests(req.body.typeIndex, req.body.contestId, req.body.industry, req.body.awardSort);
  db.Contests.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    include: [{
      model: db.Offers,
      required: req.body.ownEntries,
      where: req.body.ownEntries ? {
        userId: req.tokenData.userId
      } : {},
      attributes: ['id']
    }]
  }).then(function (contests) {
    contests.forEach(function (contest) {
      return contest.dataValues.count = contest.dataValues.Offers.length;
    });
    var haveMore = true;

    if (contests.length === 0) {
      haveMore = false;
    }

    res.send({
      contests: contests,
      haveMore: haveMore
    });
  })["catch"](function (err) {
    next(new _ServerError["default"]());
  });
};
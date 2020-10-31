"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Conversation = require('../models/mongoModels/conversation');

var Message = require('../models/mongoModels/Message');

var Catalog = require('../models/mongoModels/Catalog');

var moment = require('moment');

var db = require('../models/index');

var userQueries = require('./queries/userQueries');

var controller = require('../../socketInit');

var _ = require('lodash');

module.exports.addMessage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var participants, newConversation, message, interlocutorId, preview;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            participants = [req.tokenData.userId, req.body.recipient];
            participants.sort(function (participant1, participant2) {
              return participant1 - participant2;
            });
            _context.prev = 2;
            _context.next = 5;
            return Conversation.findOneAndUpdate({
              participants: participants
            }, {
              participants: participants,
              blackList: [false, false],
              favoriteList: [false, false]
            }, {
              upsert: true,
              "new": true,
              setDefaultsOnInsert: true,
              useFindAndModify: false
            });

          case 5:
            newConversation = _context.sent;
            message = new Message({
              sender: req.tokenData.userId,
              body: req.body.messageBody,
              conversation: newConversation._id
            });
            _context.next = 9;
            return message.save();

          case 9:
            message._doc.participants = participants;
            interlocutorId = participants.filter(function (participant) {
              return participant !== req.tokenData.userId;
            })[0];
            preview = {
              _id: newConversation._id,
              sender: req.tokenData.userId,
              text: req.body.messageBody,
              createAt: message.createdAt,
              participants: participants,
              blackList: newConversation.blackList,
              favoriteList: newConversation.favoriteList
            };
            controller.getChatController().emitNewMessage(interlocutorId, {
              message: message,
              preview: {
                _id: newConversation._id,
                sender: req.tokenData.userId,
                text: req.body.messageBody,
                createAt: message.createdAt,
                participants: participants,
                blackList: newConversation.blackList,
                favoriteList: newConversation.favoriteList,
                interlocutor: {
                  id: req.tokenData.userId,
                  firstName: req.tokenData.firstName,
                  lastName: req.tokenData.lastName,
                  displayName: req.tokenData.displayName,
                  avatar: req.tokenData.avatar,
                  email: req.tokenData.email
                }
              }
            });
            res.send({
              message: message,
              preview: Object.assign(preview, {
                interlocutor: req.body.interlocutor
              })
            });
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](2);
            next(_context.t0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 16]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.getChat = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var participants, messages, interlocutor;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            participants = [req.tokenData.userId, req.body.interlocutorId];
            participants.sort(function (participant1, participant2) {
              return participant1 - participant2;
            });
            _context2.prev = 2;
            _context2.next = 5;
            return Message.aggregate([{
              $lookup: {
                from: 'conversations',
                localField: 'conversation',
                foreignField: '_id',
                as: 'conversationData'
              }
            }, {
              $match: {
                'conversationData.participants': participants
              }
            }, {
              $sort: {
                createdAt: 1
              }
            }, {
              $project: {
                '_id': 1,
                'sender': 1,
                'body': 1,
                'conversation': 1,
                'createdAt': 1,
                'updatedAt': 1
              }
            }]);

          case 5:
            messages = _context2.sent;
            _context2.next = 8;
            return userQueries.findUser({
              id: req.body.interlocutorId
            });

          case 8:
            interlocutor = _context2.sent;
            res.send({
              messages: messages,
              interlocutor: {
                firstName: interlocutor.firstName,
                lastName: interlocutor.lastName,
                displayName: interlocutor.displayName,
                id: interlocutor.id,
                avatar: interlocutor.avatar
              }
            });
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](2);
            next(_context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 12]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports.getPreview = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var conversations, interlocutors, senders;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Message.aggregate([{
              $lookup: {
                from: 'conversations',
                localField: 'conversation',
                foreignField: '_id',
                as: 'conversationData'
              }
            }, {
              $unwind: '$conversationData'
            }, {
              $match: {
                'conversationData.participants': req.tokenData.userId
              }
            }, {
              $sort: {
                createdAt: -1
              }
            }, {
              $group: {
                _id: '$conversationData._id',
                sender: {
                  $first: '$sender'
                },
                text: {
                  $first: '$body'
                },
                createAt: {
                  $first: '$createdAt'
                },
                participants: {
                  $first: '$conversationData.participants'
                },
                blackList: {
                  $first: '$conversationData.blackList'
                },
                favoriteList: {
                  $first: '$conversationData.favoriteList'
                }
              }
            }]);

          case 3:
            conversations = _context3.sent;
            interlocutors = [];
            conversations.forEach(function (conversation) {
              interlocutors.push(conversation.participants.find(function (participant) {
                return participant !== req.tokenData.userId;
              }));
            });
            _context3.next = 8;
            return db.Users.findAll({
              where: {
                id: interlocutors
              },
              attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar']
            });

          case 8:
            senders = _context3.sent;
            conversations.forEach(function (conversation) {
              senders.forEach(function (sender) {
                if (conversation.participants.includes(sender.dataValues.id)) {
                  conversation.interlocutor = {
                    id: sender.dataValues.id,
                    firstName: sender.dataValues.firstName,
                    lastName: sender.dataValues.lastName,
                    displayName: sender.dataValues.displayName,
                    avatar: sender.dataValues.avatar
                  };
                }
              });
            });
            res.send(conversations);
            _context3.next = 16;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 13]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports.blackList = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var predicate, chat, interlocutorId;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            predicate = 'blackList.' + req.body.participants.indexOf(req.tokenData.userId);
            _context4.prev = 1;
            _context4.next = 4;
            return Conversation.findOneAndUpdate({
              participants: req.body.participants
            }, {
              $set: _defineProperty({}, predicate, req.body.blackListFlag)
            }, {
              "new": true
            });

          case 4:
            chat = _context4.sent;
            res.send(chat);
            interlocutorId = req.body.participants.filter(function (participant) {
              return participant !== req.tokenData.userId;
            })[0];
            controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](1);
            res.send(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 10]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports.favoriteChat = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var predicate, chat;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            predicate = 'favoriteList.' + req.body.participants.indexOf(req.tokenData.userId);
            _context5.prev = 1;
            _context5.next = 4;
            return Conversation.findOneAndUpdate({
              participants: req.body.participants
            }, {
              $set: _defineProperty({}, predicate, req.body.favoriteFlag)
            }, {
              "new": true
            });

          case 4:
            chat = _context5.sent;
            res.send(chat);
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            res.send(_context5.t0);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

module.exports.createCatalog = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var catalog;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log(req.body);
            catalog = new Catalog({
              userId: req.tokenData.userId,
              catalogName: req.body.catalogName,
              chats: [req.body.chatId]
            });
            _context6.prev = 2;
            _context6.next = 5;
            return catalog.save();

          case 5:
            res.send(catalog);
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](2);
            next(_context6.t0);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 8]]);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

module.exports.updateNameCatalog = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
    var catalog;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return Catalog.findOneAndUpdate({
              _id: req.body.catalogId,
              userId: req.tokenData.userId
            }, {
              catalogName: req.body.catalogName
            }, {
              "new": true
            });

          case 3:
            catalog = _context7.sent;
            res.send(catalog);
            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            next(_context7.t0);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

module.exports.addNewChatToCatalog = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res, next) {
    var catalog;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return Catalog.findOneAndUpdate({
              _id: req.body.catalogId,
              userId: req.tokenData.userId
            }, {
              $addToSet: {
                chats: req.body.chatId
              }
            }, {
              "new": true
            });

          case 3:
            catalog = _context8.sent;
            res.send(catalog);
            _context8.next = 10;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            next(_context8.t0);

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));

  return function (_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

module.exports.removeChatFromCatalog = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res, next) {
    var catalog;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return Catalog.findOneAndUpdate({
              _id: req.body.catalogId,
              userId: req.tokenData.userId
            }, {
              $pull: {
                chats: req.body.chatId
              }
            }, {
              "new": true
            });

          case 3:
            catalog = _context9.sent;
            res.send(catalog);
            _context9.next = 10;
            break;

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            next(_context9.t0);

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));

  return function (_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();

module.exports.deleteCatalog = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res, next) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return Catalog.remove({
              _id: req.body.catalogId,
              userId: req.tokenData.userId
            });

          case 3:
            res.end();
            _context10.next = 9;
            break;

          case 6:
            _context10.prev = 6;
            _context10.t0 = _context10["catch"](0);
            next(_context10.t0);

          case 9:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 6]]);
  }));

  return function (_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();

module.exports.getCatalogs = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res, next) {
    var catalogs;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return Catalog.aggregate([{
              $match: {
                userId: req.tokenData.userId
              }
            }, {
              $project: {
                _id: 1,
                catalogName: 1,
                chats: 1
              }
            }]);

          case 3:
            catalogs = _context11.sent;
            res.send(catalogs);
            _context11.next = 10;
            break;

          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](0);
            next(_context11.t0);

          case 10:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 7]]);
  }));

  return function (_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}();
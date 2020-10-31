"use strict";

var socketio = require('socket.io');

var ChatController = require('./server/controllers/sockets/ChatController');

var NotificationController = require('./server/controllers/sockets/NotificationController');

var notificationController;
var chatController;

module.exports.createConnection = function (httpServer) {
  var io = socketio.listen(httpServer);
  notificationController = new NotificationController();
  notificationController.connect('/notifications', io);
  chatController = new ChatController();
  chatController.connect('/chat', io);
};

module.exports.getChatController = function () {
  return chatController;
};

module.exports.getNotificationController = function () {
  return notificationController;
};
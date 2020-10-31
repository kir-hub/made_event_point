"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CONSTANTS = require('../../../constants');

var WebSocket = /*#__PURE__*/function () {
  function WebSocket() {
    _classCallCheck(this, WebSocket);
  }

  _createClass(WebSocket, [{
    key: "connect",
    value: function connect(namespace, io) {
      this.io = io.of(namespace);
      this.listen();
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this = this;

      this.io.on(CONSTANTS.SOCKET_CONNECTION, function (socket) {
        _this.onSubscribe(socket);

        _this.onUnsubscribe(socket);

        _this.anotherSubscribes(socket);
      });
    }
  }, {
    key: "anotherSubscribes",
    value: function anotherSubscribes(socket) {}
  }, {
    key: "onSubscribe",
    value: function onSubscribe(socket) {
      socket.on(CONSTANTS.SOCKET_SUBSCRIBE, function (id) {
        socket.join(id);
      });
    }
  }, {
    key: "onUnsubscribe",
    value: function onUnsubscribe(socket) {
      socket.on(CONSTANTS.SOCKET_UNSUBSCRIBE, function (id) {
        socket.leave(id);
      });
    }
  }]);

  return WebSocket;
}();

module.exports = WebSocket;
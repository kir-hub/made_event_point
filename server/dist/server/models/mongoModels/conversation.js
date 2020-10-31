"use strict";

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  participants: {
    type: [Number],
    required: true
  },
  blackList: {
    type: [Boolean],
    required: true
  },
  favoriteList: {
    type: [Boolean],
    required: true
  }
}, {
  timestamps: true
});
var Conversation = mongoose.model('Conversation', Schema);
module.exports = Conversation;
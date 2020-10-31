"use strict";

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  sender: {
    type: 'Number',
    required: true
  },
  body: {
    type: 'String',
    required: true
  },
  conversation: {
    type: mongoose.Schema.ObjectId,
    required: true
  }
}, {
  timestamps: true
});
var Message = mongoose.model('Message', Schema);
module.exports = Message;
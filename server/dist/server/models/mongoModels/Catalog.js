"use strict";

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  userId: {
    type: 'Number',
    required: true
  },
  catalogName: {
    type: 'String',
    required: true
  },
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: false,
    unique: false
  }]
});
var Catalog = mongoose.model('Catalog', Schema);
module.exports = Catalog;
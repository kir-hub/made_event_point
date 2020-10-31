"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bd = require('../models/index');

var CONSTANTS = require('../../constants');

module.exports.createWhereForAllContests = function (typeIndex, contestId, industry, awardSort) {
  var object = {
    where: {},
    order: []
  };

  if (typeIndex) {
    Object.assign(object.where, {
      contestType: getPredicateTypes(typeIndex)
    });
  }

  if (contestId) {
    Object.assign(object.where, {
      id: contestId
    });
  }

  if (industry) {
    Object.assign(object.where, {
      industry: industry
    });
  }

  if (awardSort) {
    object.order.push(['prize', awardSort]);
  }

  Object.assign(object.where, {
    status: _defineProperty({}, bd.Sequelize.Op.or, [CONSTANTS.CONTEST_STATUS_FINISHED, CONSTANTS.CONTEST_STATUS_ACTIVE])
  });
  object.order.push(['id', 'desc']);
  return object;
};

function getPredicateTypes(index) {
  return _defineProperty({}, bd.Sequelize.Op.or, [types[index].split(',')]);
}

var types = ['', 'name,tagline,logo', 'name', 'tagline', 'logo', 'name,tagline', 'logo,tagline', 'name,logo'];
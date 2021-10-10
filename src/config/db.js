/* jshint node: true */
'use strict';

var mongoose = require('mongoose');
const conn = mongoose.createConnection("mongodb://localhost/expanseDb", { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = function () {
  // create schema
  let model_schema_data = mongoose.Schema({}, {
    strict: false,
    collection: 'user'
  });
  let collectionModel_data = conn.model('User', model_schema_data);
  let model_schema_category = mongoose.Schema({}, {
    strict: false,
    collection: 'category'
  });
  let collectionModel_category = conn.model('Category', model_schema_category);
  let model_schema_expanse = mongoose.Schema({
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  }, {
    strict: false,
    collection: 'expanse'
  });
  let collectionModel_expanse = conn.model('Expanse', model_schema_expanse);

  return function (req, res, next) {
    req.User = collectionModel_data;
    req.Category = collectionModel_category;
    req.Expanse = collectionModel_expanse;
    next();
  };
};
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var imageSchema = new Schema({

module.exports = mongoose.model('image', imageSchema);
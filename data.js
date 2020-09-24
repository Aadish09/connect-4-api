var mongoose = require('mongoose');
var dataSchema = mongoose.Schema({
    token:String,
    moves:[]
})
module.exports = mongoose.model('dataSchema',dataSchema);

var mongoose = require('../config/config').mongoose
var Schema = require('../config/config').Schema
 const documentSchema = new Schema({
     name: {type: String, index: true, required: true},
     location: {type: String, index: true, required: true},
     sharedWith: [{ type: Schema.Types.ObjectId, ref: 'users'}],
     owner: { type: Schema.Types.ObjectId, ref: 'users'},
     createdAt: {type: Date, default: Date.now()}
 })
 
const Documents =  mongoose.model('documents', documentSchema, 'documents')
module.exports = Documents
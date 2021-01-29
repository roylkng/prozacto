
var mongoose = require('../config/config').mongoose
var Schema = require('../config/config').Schema
 const clinicSchema = new Schema({
     name: {type: String, index: true, required: true},
     regNo: {type: String, index: true, required: true, unique: true},
     address: String,
     createdAt: {type: Date, default: Date.now()}
 })
 
const Clinics =  mongoose.model('clinics', clinicSchema, 'clinics')
module.exports = Clinics
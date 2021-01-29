
var mongoose = require('../config/config').mongoose
var Schema = require('../config/config').Schema
 const appointmentSchema = new Schema({
     name: {type: String, unique: true, index: true, required: true},
     time: {type: Date, required: true},
     clinic : { type: Schema.Types.ObjectId, ref: 'clinics', required: true},
     creator: { type: Schema.Types.ObjectId, ref: 'users', required: true},
     patient: { type: Schema.Types.ObjectId, ref: 'users', required: true},
     doctor: { type: Schema.Types.ObjectId, ref: 'users', required: true},
     documentId: { type: Schema.Types.ObjectId, ref: 'documents'},
     createdAt: {type: Date, default: Date.now()}
 })
 
const Appointments =  mongoose.model('appointments', appointmentSchema, 'appointments')
module.exports = Appointments

var mongoose = require('../config/config').mongoose
var Schema = require('../config/config').Schema
const userSchema = new Schema({
    name: {type: String, index: true, required: true},
    mobile: {type: Number, index: true, required: true, unique: true},
    email: {type: String, index: true, required: true, unique: true},
    address: String,
    birthDate: Date,
    clinicId: { type: Schema.Types.ObjectId, ref: 'clinics'},
    role: {
        type: String,
        enum: ['Doctor', 'Assistant', 'Patient'],
        required: true
    },
    password: {type: String, index: true, required: true},
    createdAt: {type: Date, default: Date.now()}
})
 
const Users =  mongoose.model('users', userSchema, 'users')
module.exports = Users
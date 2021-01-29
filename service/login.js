
var jwt = require('jsonwebtoken');
const User = require("../models/User")
const { privatekey } = require('../config/config');
const login = async function(req, res) {
    try {
        let query = {}
        let payload = req.body ?  req.body :null;
        let email = payload.email
        let mobile = payload.mobile
        let password = payload.password
        email ? query.email = email: null;
        mobile ?  query.mobile = mobile: null;
        var user = await User.findOne(query).select('name mobile email address role clinicId password').lean();
        // encrpyt password and then match in prod
        if(user && user.password == password){
            delete user.password
            const token = jwt.sign(user, privatekey,  { algorithm: 'HS256' });
            user.token = token;
            res.status(200).send(user)
        } else res.status(404).send(" No results found")

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    login
}
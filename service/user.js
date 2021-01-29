
const User = require("../models/User")

//library with JSON interface
const checkPayLoad = function(payload){
    return true
}
const createUser = function(req,res) {
    try {
        let payload = req.body
        if(checkPayLoad(payload)){
            //encrypt password
            var user = new User(payload)
            //cache upload hook
            user.save()
            res.status(200).send('User Saved')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
    
}

const getUser = async function(req, res) {
    try {
        let query = {}
        let name = req.params ? req.params.name : null
        if(name){
            query.name = name
        }
        var users = await User.find(query).select('name mobile email address role clinicId').lean();
        if(users.length > 0){
            res.status(200).send(users)
        } else res.status(404).send(" No results found")

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getUser,
    createUser
}
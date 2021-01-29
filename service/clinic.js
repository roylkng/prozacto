
const Clinic = require("../models/Clinic")

//library with JSON interface
const checkPayLoad = function(payload){
    return true
}
const createClinic = async function(req,res) {
    try {
        let payload = req.body
        if(checkPayLoad(payload)){
            var clinic = new Clinic(payload)
            //cache upload hook
            await clinic.save()
            res.status(200).send('Clinic Saved')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
    
}

const getClinic = async function(req, res) {
    try {
        let query = {}
        let name = req.params ? req.params.name : null
        if(name){
            query.name = name
        }
        var clinics = await Clinic.find(query).lean();
        if(clinics.length > 0){
            res.status(200).send(clinics)
        } else res.status(404).send(" No results found")

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getClinic,
    createClinic
}
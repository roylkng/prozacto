
const Appointment = require("../models/Appointment")

//library with JSON interface
const checkPayLoad = function(payload){
    return true
}
const createAppointment = async function(req,res) {
    try {
        let payload = req.body
        if(checkPayLoad(payload)){
            var appointment = new Appointment(payload)
            appointment.creator = req.user._id
            //cache upload hook
            await appointment.save()
            res.status(200).send('Appointment Saved')
        }
        res.status(400).send("Invalid payload")
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
    
}

const getAppointment = async function(req, res) {
    try {
        let user = req.user
        let query = {}
        if(user.role == 'Patient'){
            query.patient = user.Id
        } else {
            query.clinic = user.clinicId
        }
        var appointments = await Appointment.find(query).lean().populate('doctor patient creator clinic', 'name mobile email address role clinicId').select('name time patient creator doctor clinic');
        if(appointments.length > 0){
            res.status(200).send(appointments)
        } else res.status(404).send(" No results found")

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getAppointment,
    createAppointment
}

const Document = require("../models/Document")
var multer = require('multer');
const Appointment = require("../models/Appointment");
var multerupload = multer({ dest: 'files/' })
//library with JSON interface
const checkRequest = function(req){
    if(req.files && req.files[0] && req.user.role)
    return true
}
const createDocument = async function(req,res) {
    try {
        if(checkRequest(req)){
            var file = req.files[0]
            var document = new Document({
                location: file.path,
                name: file.originalname,
                owner: req.user._id
            })
            if(req.params.appointment){
                const appointment = await Appointment.findById(req.params.appointment).lean()
                if(appointment){
                    document.sharedWith = [appointment.doctor]
                }
            }
            await document.save()
            res.status(200).send('Document Saved')
        } else res.status(400).send("Invalid payload")
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
    
}

const getDocument = async function(req, res) {
    try {
        let user = req.user
        let query = {}
        if(user.role == 'Patient'){
            query.owner = user._id
        } else {
            query.sharedWith = user._id
        }
        var documents = await Document.find(query).lean().select('name');
        if(documents.length > 0){
            res.status(200).send(documents)
        } else res.status(404).send(" No results found")

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const downloadDocument = async function(req, res) {
    try {
        let user = req.user
        let query = {}
        query._id = req.params.docId
        if(user.role == 'Patient'){
            query.owner = user._id
        } else {
            query.sharedWith = user._id
        }
        var document = await Document.findOne(query).lean().select('name location');
        if(document){
            res.download(document.location, document.name);
        } else res.status(404).send(" No results found")

    } catch (error) {
        res.status(500).send(error.message)
    }
}
//validaate request payload here
const checkPayLoad = function(payload){
    return true
}


const shareDocument = async function(req, res) {
    try {
        let user = req.user
        let payload = req.body
        if(checkPayLoad(payload)){
            let query = {}
            query.owner = user._id
            query._id= payload.documentId
            var document = await Document.findOne(query)
            if(document){
                if(document.sharedWith.indexOf(payload.shareId)<0){
                    document.sharedWith.push(payload.shareId);
                    await document.save()
                }
                //send Email or notification to doctor
                res.status(200).send(document)
            } else res.status(404).send(" No results found")
        }
        res.status(400).send("Invalid payload")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getDocument,
    createDocument,
    downloadDocument,
    shareDocument
}
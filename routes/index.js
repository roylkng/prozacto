

const {createClinic, getClinic} = require('../service/clinic')
const {createUser, getUser} = require('../service/user')
const {login} = require('../service/login')
const {createAppointment, getAppointment} = require('../service/appointment')
const {createDocument, getDocument, downloadDocument, shareDocument} = require('../service/document')
var multer  = require('multer')
var upload = multer({ dest: './files/' })
module.exports = function (server) {
	server.get("/clinic/get", getClinic);
	server.post("/clinic/create", createClinic);
	server.get("/user/get", getUser);
	server.post("/user/login", login);
	server.post("/user/create", createUser);
	server.get("/appointment/get", getAppointment);
	server.post("/appointment/create", createAppointment);
	server.get("/doc/get", getDocument);
	server.post("/doc/upload/:appointment?", upload.any(), createDocument);
	server.post("/doc/share", shareDocument);
	server.get("/doc/download/:docId", downloadDocument);
};

var mongoose = require("mongoose")

const mongodbUri = "mongodb://127.0.0.1:27017/prozacto";
mongoose.connect(mongodbUri);

// get vars from env
module.exports = {
	privatekey: "prozacto-secret",
	mongoose: mongoose,
	Schema: mongoose.Schema
};
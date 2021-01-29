const { privatekey } = require("./config/config");

try {
	const express = require("express");
	const cors = require("cors");
    const jwt = require('express-jwt');
    const cookieParser = require('cookie-parser');
	const routes = require("./routes");


	const http = require('http');
    const app = express();
    

    app.set('port', process.env.PORT || 8000);
    var isMultipart = /^multipart\//i;
    var bodyParser = require('body-parser');
    var urlencodedMiddleware = bodyParser.urlencoded({ limit: '50mb', extended: true });
    app.use(function (req, res, next) {
    var type = req.get('Content-Type');
    if (isMultipart.test(type)) return next();
    return urlencodedMiddleware(req, res, next);
    });
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(cors());
	app.use(cookieParser("secretKey"));
	app.use((err, req, res, next) => {
		if (err) {
			console.log("request error occurred");
			if (err instanceof SyntaxError) {
				console.log("Syntax error: ", err);
				return res.status(400).send({
					success: false,
					response: {
						message: "Incorrect request data"
					}
				});
			}
			console.log("Internal error occurred", err);
			return res.status(500).send({
				success: false,
				response: {
					message: "Internal error occurred"
				}
			});
		}
		return next();
	});
	

	// check if app is running
	app.get("/health", (req, res) => {
		console.log("success");
		res.end('Success');
	});

	// use JWT auth to secure the api
	app.use(jwt({ secret: privatekey, algorithms: ['HS256'] }).unless({path: [/^\/login\/.*/, /^\/clinic\/.*/, /^\/user\/.*/]}));
	// api routes
    routes(app);

	http.createServer(app).listen(app.get('port'), function () {
		console.log('Express HTTPS server listening on port ' + app.get('port'));
	});
} catch (err) {
	console.log(err)
}
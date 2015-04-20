module.exports = function(webServerConfig, webServerCallback) {

	var
		http = require("http"),
		express = require("express"),
		webSockets = require("./web-sockets.js"),
		multer = require("multer"),
		app = express();

	app.use(express.static(webServerConfig.rootFolder));
	app.use(multer({
		dest: "./uploads",
		rename: function(fieldName, fileName) {
			return fileName;
		},
		onFileUploadStart: function(file, req, res) {
			console.log(file.originalname + ' is starting ...');
			return;
		},
		onFileUploadData: function(file, data, req, res) {
			console.log(data.length/file.size * 100 + '% of ' + file.originalname + ' has arrived ...');
			(function logProgress(dataLength) {

			})(data.length);
			return;
		},
		onFileUploadComplete: function(file, req, res) {
			console.log(file.originalname + ' uploaded to ' + file.path);
			return;
		}

	}));

	app.post("/uploads", function(req, res) {

		res.json({
			msg: "received"
		});

	});

	webSockets(http.createServer(app))
		.listen(webServerConfig.port, webServerCallback);

};

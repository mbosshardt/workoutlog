var express = require("express");
var app = express();

app.use(require("./middleware/headers"));

//this will send hello world to be printed when on the local host 3000
app.use("/api/test", function(req, res) {
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("app is listening on 3000");
});


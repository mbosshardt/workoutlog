require("dotenv").config();

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var sequelize = require("./db.js");

var User = sequelize.import("./models/user.js");


// creates the table in postgres
// matches the model we defined
// doesn't drop the db
//User.sync( {force: true}); //WARNING: this will DROP the table!
sequelize.sync();

app.use(bodyParser.json());

app.use(require("./middleware/headers"));
app.use(require("./middleware/validate-session"));
app.use("/api/user", require("./routes/user"));

//login route
app.use("/api/login", require("./routes/session"));
app.use("/api/definition", require("./routes/definition"));
app.use("/api/log", require("./routes/log"));

//this will send hello world to be printed when on the local host 3000
app.use("/api/test", function(req, res) {
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("app is listening on 3000");
});


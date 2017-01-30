var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Sequelize = require("sequelize");

var sequelize = new Sequelize("workoutlog", "postgres" ,"LetMeIn1234!", {
	host 	: "localhost",
	dialect : "postgres"
});

sequelize.authenticate().then(
	function() {
		console.log("connected to workoutlog postgres db");
	},
	function (err) {
		console.log(err);
	}
);

// build a user model in sqllize
var User = sequelize.define("user", {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING
});

// creates the table in postgres
// matches the model we defined
// doesn't drop the db
User.sync();
// User({ force: true}); //drops the table completely

app.use(bodyParser.json());

app.post("/api/user", function(req, res) {
	// when we post to api ser, it will want a user object in the body
	var username = req.body.user.username;
	var pass = req.body.user.password;		// TODO: has this password - HASH = not human readable
	// need to create a user object and use sequelize to put that user into our database

	// match the model we created above
	// Sequelize - take the user model and go out to the db and create this:
	User.create({
		username: username,
		passwordhash: ""
	}).then(
		// Sequelize is going to return the object it created from db
		function createSuccess(user){
			res.json({
				user: user,
				message: "create"
			});
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
});

app.use(require("./middleware/headers"));

//this will send hello world to be printed when on the local host 3000
app.use("/api/test", function(req, res) {
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("app is listening on 3000");
});


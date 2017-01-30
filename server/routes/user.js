var router = require("express").Router();
var sequelize = require("../db.js");
var User = sequelize.import("../models/user");

router.post("/", function(req, res) {
	// when we post to api ser, it will want a user object in the body
	var username = req.body.user.username;
	var pass = req.body.user.password;		// TODO: has this password - HASH = not human readable
	// need to create a user object and use sequelize to put that user into our database

	// match the model we created above
	// Sequelize - take the user model and go out to the db and create this:
	User.create({
		username: username,
		passwordhash: ""		// TODO: make it hashed
	}).then(
		// Sequelize is going to return the object it created from db
		function createSuccess(user){
			res.json({
				user: user,
				message: "created"
			});
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
});

module.exports = router;
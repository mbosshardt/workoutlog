var router = require("express").Router();
var sequelize = require("../db");
var Log = sequelize.import("../models/log");
var User = sequelize.import("../models/user");
var Definition = sequelize.import("../models/definition");

router.post("/", function(req, res) {
	var description = req.body.log.desc;
	var result = req.body.log.result;
	var user = req.user;
	var definition = req.body.log.def;

	Log
	.create({
		description: description,
		result: result,
		owner: user.id,
		def: definition

	}).then(

		function createSuccess(log) {
			res.json(log);
		},
		function createError(err) {
			res.status(500).send(err.message);
		}
	);
});

router.get("/", function(req, res) {
	var userid = req.user.id;
	Log
	.findAll({
		where: { owner: userid }
	})
	.then(
		function findAllSuccess(data) {
			res.json(data);
		},
		function findAllError(err) {
			res.status(500).send(err.message);
		}
	);
});

module.exports = router;
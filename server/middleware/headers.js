// this allows us to access the header
// the header written this way allows access by all origins (*)
module.exports = function(req, res, next){
	res.header("access-control-allow-origin","*");
	res.header("access-control-allow-methods","GET, POST, PUT, DELETE");
	res.header("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
};
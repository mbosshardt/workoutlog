$(function(){
	$("#testAPI").on("click", function(){
		console.log("it is working");
	});

// test will be connecting the client (local host 8080) to the server (local host 3000) to be able to communicate
	var test = $.ajax({
		type	: "GET",
		url		: "http://localhost:3000/api/test"
	});
	test.done(function(data){
		console.log(data);
	});
	test.fail(function(){
		console.log("Oh no!");
	});

});
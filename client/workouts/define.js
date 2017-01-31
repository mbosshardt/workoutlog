$(function(){
	$.extend(workoutlog, {
		definition: {
			userDefinitions: [],
			create: function() {
				var def = {
					desc: $("#def-description").val(),
					type: $("#def-logtype").val()
				};
				var postData = { definition: def };
				var define = $.ajax({
					type: "POST",
					url: workoutlog.API_BASE + "definition",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});
				define.done(function(data){
					workoutlog.definition.userDefinitions.push(data.definition);
					console.log("hello");
				});
			},

			fetchAll: function() {
				var fetchDefs = $.ajax({
					type: "GET",
					url: workoutlog.API_BASE + "definition",
					headers: {
						"authoriation": window.localStorage.getItem("sessionToken")
					}
				})
				.done(function(data) {
					workoutlog.definition.userDefinitions = data;
				})
				.fail(function(err) {
					console.log(err);
				});
			}
		}
	});

	// bindings
	$("#def-save").on("click", workoutlog.definition.create);
	// .fetch definitions if we already are authenticated and refreshed
	if (window.localStorage.getItem("sessionToken")) {
		workoutlog.definition.fetchAll();
	}
});
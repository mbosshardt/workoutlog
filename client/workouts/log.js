$(function(){
	$.extend(workoutlog, {
		log: {
			workouts: [],
			setDefinitions: function() {
				var defs = workoutlog.definition.userDefinitions;
				var len = defs.length;
				var opts;
				for (var i = 0; i < len; i++) {
					opts += "<option value=\"" + defs[i].id + "\">" + defs[i].description + "</option>";

					// TODO: not allow duplicate entries
				}
				$("#log-definition").children().remove();
				$("#log-definition").append(opts);
			},
			setHistory: function() {
				var history = workoutlog.log.workouts;
				var len = history.length;
				var lis = "";
				for (var i = 0; i < len; i++) {
					lis += "<li class=\"list-group-item\">" + history[i].def + " - " + history[i].result + "</li>";
				}
				$("#history-list").children().remove();
				$("#history-list").append(lis);
			},
			create: function() {
				var itsLog = {
					desc: $("#log-description").val(),
					result: $("#log-result").val(),
					def: $("#log-definition option:selected").text()
				};
				var postData = { log: itsLog };
				var logger = $.ajax({
					type: "POST",
					url: workoutlog.API_BASE + "log",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});

				logger.done(function(data) {
					workoutlog.log.workouts.push(data);
					console.log(data);
					$("#log-description").val("");
					$("#log-result").val("");
					$(".nav-tabs a[href=\"#history\"]").tab("show");
				});
			},
			fetchAll: function() {
				var fetchDefs = $.ajax({
					type: "GET",
					url: workoutlog.API_BASE + "log",
					headers: {
						"authorization": window.localStorage.getItem("sessionToken")
					}
				})
				.done(function(data) {
					workoutlog.log.workouts = data;
				})
				.fail(function(err) {
					console.log(err);
				});
			}
		}
	});

	$("#log-save").on("click", workoutlog.log.create);

	if (window.localStorage.getItem("sessionToken")){
		workoutlog.log.fetchAll();
	}
});
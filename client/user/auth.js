$(function(){
	$.extend(workoutlog, {

		// signup method
		signup: function(){
			// username & password variables
			var username = $("#su_username").val();
			var password = $("#su_password").val();
			// user object
			var user = {
				user: {
					username: username,
					password: password
				}
			};

			// signup post
			var signup = $.ajax({
				type: "POST",
				url: workoutlog.API_BASE + "user",
				data: JSON.stringify( user ),
				contentType: "application/json"
			});

			// signup done/fail
			signup.done(function(data) {
				if (data.sessionToken) {
					workoutlog.setAuthHeader(data.sessionToken);
					console.log("You made it!");
					// console.log(data.sessionToken);
				}

				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");
				
			}).fail(function() {
				$("su_error").text("There was an issue with sign up").show();
			});

		},
		// login method
		login: function() {
			// login variables
			var username = $("#li_username").val();
			var password = $("#li_password").val();
			var user = {
				user: {
					username: username,
					password: password
				}
			};

			// login POST
			var login = $.ajax({
				type: "POST",
				url: workoutlog.API_BASE + "login",
				data: JSON.stringify( user ),
				contentType: "application/json"
			});

			// login done/fail
			login.done(function(data) {
				if(data.sessionToken) {
					workoutlog.setAuthHeader(data.sessionToken);
					console.log("You are now signed in");
				}
					$("#login-modal").modal("hide");
					$(".disabled").removeClass("disabled");
					$("#loginout").text("Logout");
				}).fail(function(){
					$("#li_error").text("There was an issue with login").show();
				});

		},

		// loginout method
		loginout: function() {
			if (window.localStorage.getItem("sessionToken")) {
				window.localStorage.removeItem("sessionToken");
				$("#loginout").text("Login");
				console.log("You are now signed out");
			}

			// TODO: on logout make sure stuff is disabled
			$(".nav-tabs a[data-toggle=tab]").addClass("disabled");
		}

	});

	// blind events
	$("#signup").on("click", workoutlog.signup);
	$("#login").on("click",workoutlog.login);
	$("#loginout").on("click", workoutlog.loginout);

	if (window.localStorage.getItem("sessionToken")) {
		$("#loginout").text("Logout");
	}
});
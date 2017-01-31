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
				}

				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");
			}).fail(function() {
				$("su_error").text("There was an issue with sign up").show();
			});

		}
		// login method

		// loginout method

	});

	// blind events
	$("#signup").on("click", workoutlog.signup);

});
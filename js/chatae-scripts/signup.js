$(document).ready(function() {
	
});

$("#submit-button").click(function() {
	var username = $("#email").val();
	var password = $("#password").val();
	var confirmPassword = $("#confirm-password").val();
	var domain = Constants.XMPP_DOMAIN;
	
	if(validateForm()) {
		Connection.signUp(username, domain, password);
	}
});

function connstatus(cstatus) {
	console.log(cstatus);
	//$("#connection-status").text(cstatus);
}


$(document).ready(function() {
	
});

$("#submit-button").click(function() {
	var username = $("#email").val();
	var password = $("#password").val();
	var domain = Constants.XMPP_DOMAIN;
	
	Connection.signIn(username, domain, password);
});

function connstatus(cstatus) {
	$("#connection-status").text(cstatus);
}


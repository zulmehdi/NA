$(document).ready(function() {
	
});

$("#submit-button").click(function() {
	var username = $("#email").val();
	var password = $("#password").val();
	var domain = Constants.XMPP_DOMAIN;
	
	Connection.signIn(username, domain, password);
});

$(document).bind("addcontact", function(event, data) {
	var iq = $iq({type: "set"})
				.c("query", { xmlns: "jabber:iq:roster"})
					.c("item", data);
	
	ChatAEConnection.connection.sendIQ(iq, onAdded);
	//goToPage("chat.html");
});

function onAdded(iq) {
	goToPage("chat.html");
}

function connstatus(cstatus) {
	$("#connection-status").text(cstatus);
}


$(document).bind("connecting", function() {
	console.log("connecting");
	connstatus("Connecting");
});

$(document).bind("connected", function() {
	connstatus("Connected");

	setCookie("jid", Connection.connection.jid, "");
	setCookie("rid", Connection.connection._proto.rid, "");
	setCookie("sid", Connection.connection._proto.sid, "");
	
	Connection.connection.send($pres().c("priority").t("127"));
	
	ChatAEConnection.signIn();
});

$(document).bind("connfail", function() {
	connstatus("connection failed");
});

$(document).bind("authenticating", function() {
	connstatus("authenticating");
});

$(document).bind("authfail", function() {
	connstatus("authentication failed");
});

$(document).bind("disconnecting", function() {
	connstatus("disconnecting");
});

$(document).bind("disconnected", function() {
	connstatus("disconnected");
});

$(document).bind("attached", function() {
	//connstatus("attached");
	
	Connection.connection.addHandler(Chat.receiveMessage, null, "message", "chat");
	
	Connection.connection.send($pres().c("priority").t("127"));
	
	var iq = $iq({type: "get"})
			.c("query", {xmlns: "jabber:iq:roster"});
	
	Connection.connection.sendIQ(iq, Roster.getUserRoster);
});

$(document).bind("redirect", function() {
	connstatus("redirect");
});

$(document).bind("error", function() {
	connstatus("error");
});

$(document).bind("register", function(event, username, password) {
	connection.register.fields.username = username;
	connection.register.fields.password = password;
	
	connection.register.submit();
	
	connstatus("submitted");
});

$(document).bind("registered", function() {
	connstatus("registered");
	
	Connection.connection.authenticate();
});

$(document).bind("regifail", function() {
	connstatus("registration failed");
});

$(document).bind("conflict", function() {
	connstatus("conflict");
});

$(document).bind("notacceptable", function() {
	connstatus("not acceptable");
});
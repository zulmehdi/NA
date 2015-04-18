$(document).bind("chataeConnecting", function() {
	connstatus("ChatAE Connecting");
});

$(document).bind("chataeConnected", function() {
	//connstatus("ChatAE Connected");
	
	setCookie("chatAEjid", ChatAEConnection.connection.jid, "");
	setCookie("chatAErid", ChatAEConnection.connection._proto.rid, "");
	setCookie("chatAEsid", ChatAEConnection.connection._proto.sid, "");
	
	ChatAEConnection.connection.send($pres().c("priority").t("127"));
	
	$(document).trigger("addcontact", { jid: Strophe.getBareJidFromJid(Connection.jid),
								 		name: Strophe.getBareJidFromJid(Connection.jid) }
 	);
});

$(document).bind("chataeConnfail", function() {
	connstatus("ChatAE connection failed");
});

$(document).bind("chataeAuthenticating", function() {
	connstatus("ChatAe authenticating");
});

$(document).bind("chataeAuthfail", function() {
	connstatus("ChatAE authentication failed");
});

$(document).bind("chataeDisconnecting", function() {
	connstatus("ChatAE disconnecting");
});

$(document).bind("chataeDisconnected", function() {
	connstatus("ChatAE disconnected");
});

$(document).bind("chataeAttached", function() {
	log("chatae attached");
	//connstatus("ChatAEattached");
	
	
});

$(document).bind("chataeRedirect", function() {
	connstatus("ChatAE redirect");
});

$(document).bind("chataeError", function() {
	connstatus("ChatAE error");
});
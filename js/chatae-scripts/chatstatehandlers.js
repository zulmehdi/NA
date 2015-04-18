$(document).bind("chatConnecting", function() {
	console.log("connecting");
	//ChatAEConnection.connection.options.sync = true; // Switch to using synchronous requests since this is typically called onUnload.
    //ChatAEConnection.connection.flush();
    //ChatAEConnection.connection.disconnect();
	//connstatus("Connecting");
});

$(document).bind("chatConnected", function() {
	log("chat page connected");
	var iq = $iq({type: "get"})
				.c("query", {xmlns: "jabber:iq:roster"});
				
	ChatAEConnection.connection.addHandler(Chat.receiveMessage, null, "message", "chat");
				
	ChatAEConnection.connection.send($pres().c("priority").t("127"));
	Connection.connection.send($pres().c("priority").t("127"));
				
	ChatAEConnection.connection.sendIQ(iq, Roster.getChatAERoster);
	Connection.connection.sendIQ(iq, Roster.getUserRoster);
	
	ChatAEConnection.connection.addHandler(Roster.onChatAERosterChanged, "jabber:iq:roster", "iq", "set");
	Connection.connection.addHandler(Roster.onRosterChanged, "jabber:iq:roster", "iq", "set");
	
	setInterval(function(){
	 	Connection.connection.send($pres());
 	}, 1000);
});

$(document).bind("chatConnfail", function() {
	connstatus("connection failed");
});

$(document).bind("chatAuthenticating", function() {
	connstatus("authenticating");
});

$(document).bind("chatAuthfail", function() {
	connstatus("authentication failed");
});

$(document).bind("chatDisconnecting", function() {
	connstatus("disconnecting");
});

$(document).bind("chatDisconnected", function() {
	connstatus("disconnected");
});

$(document).bind("chatAttached", function() {
	log("attached");
	
	var iq = $iq({type: "get"})
				.c("query", {xmlns: "jabber:iq:roster"});
				
	ChatAEConnection.connection.addHandler(Chat.receiveMessage, null, "message", "chat");
				
	ChatAEConnection.connection.send($pres().c("priority").t("127"));
	Connection.connection.send($pres().c("priority").t("127"));
	
	ChatAEConnection.connection.sendIQ(iq, Roster.getChatAERoster);
	Connection.connection.sendIQ(iq, Roster.getUserRoster);
	
	ChatAEConnection.connection.addHandler(Roster.onChatAERosterChanged, "jabber:iq:roster", "iq", "set");
	Connection.connection.addHandler(Roster.onRosterChanged, "jabber:iq:roster", "iq", "set");
	
	log("chatae attached end");
	
	// ChatAEConnection.connection.addHandler(Chat.receiveMessage, null, "message", "chat");
// 	
	// var iq = $iq({type: "get"})
			// .c("query", {xmlns: "jabber:iq:roster"});
// 			
	// ChatAEConnection.connection.send($pres().c("priority").t("127"));
	// Connection.connection.send($pres().c("priority").t("127"));
// 	
	// ChatAEConnection.connection.sendIQ(iq, Roster.getChatAERoster);
	// //Connection.connection.sendIQ(iq, Roster.getUserRoster);
});

$(document).bind("chatRedirect", function() {
	connstatus("redirect");
});

$(document).bind("chatError", function() {
	connstatus("error");
});

$(document).bind("chatRegister", function(event, username, password) {
	connection.register.fields.username = username;
	connection.register.fields.password = password;
	
	connection.register.submit();
	
	connstatus("submitted");
});

$(document).bind("chatRegistered", function() {
	connstatus("registered");
	
	Connection.connection.authenticate();
});

$(document).bind("chatRegifail", function() {
	connstatus("registration failed");
});

$(document).bind("chatConflict", function() {
	connstatus("conflict");
});

$(document).bind("chatNotacceptable", function() {
	connstatus("not acceptable");
});
$(document).bind("connecting", function() {
	log("connecting");
	//connstatus("Connecting");
});

$(document).bind("connected", function() {
	log("Connected");

	setCookie("jid", Connection.connection.jid, "");
	setCookie("rid", Connection.connection._proto.rid, "");
	setCookie("sid", Connection.connection._proto.sid, "");
	
	Connection.connection.send($pres().c("priority").t("127"));
	
	goToPage("chat.html");
	
	//ChatAEConnection.signIn();
});

$(document).bind("connfail", function() {
	log("connection failed");
});

$(document).bind("authenticating", function() {
	console.log("authenticating");
});

$(document).bind("authfail", function() {
	connstatus("authentication failed");
});

$(document).bind("disconnecting", function() {
	log("disconnecting");
});

$(document).bind("disconnected", function() {
	log("disconnected");
});

$(document).bind("attached", function() {
	//connstatus("attached");
	
	Connection.connection.xmlOutput = function(body) {
		var rid = $(body).attr("rid");
		
		setCookie("rid", rid, "");
	};
	
	Connection.joined = false;
	Connection.participants = {};
	
	Connection.connection.addHandler(Chat.receiveMessage, null, "message", "chat");
	Connection.connection.addHandler(Chat.receiveGroupMessage, null, "message", "groupchat");
	
	var iq = $iq({type: "get"})
			.c("query", {xmlns: "jabber:iq:roster"});
	
	Connection.connection.sendIQ(iq, Roster.getUserRoster);
	Connection.connection.addHandler(Roster.onRosterChanged, "jabber:iq:roster", "iq", "set");
	
	$("#logged-in-user").text(Strophe.getNodeFromJid(jid));
	
	Connection.connection.addHandler(Group.onPresence, null, "presence");
	
	Connection.connection.muc.init(Connection.connection);
	
	var d = $pres({'from': Strophe.getNodeFromJid(jid), 'to': "jwchat@conference.jwchat.org" + '/' + Strophe.getNodeFromJid(jid)});
	Connection.connection.send(d.tree());
	
	iq = $iq({
	    to: Constants.GROUP_ROOM,
	    type: 'set'
	}).c("query", {
	    xmlns: Strophe.NS.MUC_OWNER
	});
	iq.c("x", {
	    xmlns: "jabber:x:data",
	    type: "submit"
	});
	
	Connection.connection.sendIQ(iq.tree(), function () { console.log('success'); }, function (err) { console.log('error', err); });
	
	log("attached end");
});

$(document).bind("redirect", function() {
	log("redirect");
});

$(document).bind("error", function() {
	log("error");
});

$(document).bind("register", function() {
	Connection.connection.register.fields.username = $("#email").val();
	Connection.connection.register.fields.password = $("#password").val();
	
	Connection.connection.register.submit();
	
	//connstatus("submitted");
});

$(document).bind("registered", function() {
	//connstatus("registered");
	
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
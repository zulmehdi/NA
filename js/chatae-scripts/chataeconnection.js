var ChatAEConnection = {
	connection: null,
	
	jid: "",
	rid: "",
	sid: "",
	
	username: "chatae",
	domain: Constants.XMPP_DOMAIN,
	password: "mehdi110",
	
	initConnection: function() {
		this.connection = new Strophe.Connection(Constants.SERVER);
	},
	
	signIn: function() {
		this.initConnection();
		
		this.connection.connect(this.username + "@" + this.domain, this.password, this.onConnect);
	},
	
	chatSignIn: function() {
		this.initConnection();
		
		this.connection.connect(this.username + "@" + this.domain, this.password, this.onChatConnect);
	},
	
	attach: function(jid, sid, rid) {
		this.initConnection();
		
		this.connection.attach(jid, sid, rid, this.onChatConnect);
	},
	
	onConnect: function() {
		var status = this.getStatus();
		
		if(status === 3) {
			$(document).trigger("chataeAuthenticating");
		} else if(status === 1) {
			$(document).trigger("chataeConnecting");
		} else if(status === 5) {
			$(document).trigger("chataeConnected");
		} else if(status === 7) {
			$(document).trigger("chataeDisconnecting");
		} else if(status === 6) {
			$(document).trigger("chataeDisconnected");
		} else if(status === 8) {
			$(document).trigger("chataeAttached");
		} else if(status === 9) {
			$(document).trigger("chataeRedirect");
		} else if(status === 4) {
			$(document).trigger("chataeAuthfail");
		} else if(status === 2) {
			$(document).trigger("chataeConnfail");
		} else {
			$(document).trigger("chataeError");
		}
	},
	
	onChatConnect: function() {
		var status = this.getStatus();
		
		if(status === 3) {
			$(document).trigger("chatAuthenticating");
		} else if(status === 1) {
			$(document).trigger("chatConnecting");
		} else if(status === 5) {
			log("chat connected");
			$(document).trigger("chatConnected");
		} else if(status === 7) {
			$(document).trigger("chatDisconnecting");
		} else if(status === 6) {
			$(document).trigger("chatDisconnected");
		} else if(status === 8) {
			$(document).trigger("chatAttached");
		} else if(status === 9) {
			$(document).trigger("chatRedirect");
		} else if(status === 4) {
			$(document).trigger("chatAuthfail");
		} else if(status === 2) {
			$(document).trigger("chatConnfail");
		} else {
			$(document).trigger("chatError");
		}
	}
};

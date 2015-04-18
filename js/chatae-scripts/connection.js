var Connection = {
	connection: null,
	
	jid: "",
	rid: "",
	sid: "",
	
	username: "",
	domain: "",
	password: "",
	
	joined: null,
	participants: null,
	
	initAttachment: function() {
		this.connection = new Strophe.Connection(Constants.SERVER);
	},
	
	initConnection: function(username, domain, password) {
		this.username = username;
		this.domain = domain;
		this.password = password;
		
		this.jid = username + "@" + domain;
		
		this.connection = new Strophe.Connection(Constants.SERVER);
	},
	
	signIn: function(username, domain, password) {
		this.initConnection(username, domain, password);
		
		this.connection.connect(username + "@" + domain, password, this.onConnect);
	},
	
	signUp: function(username, domain, password) {
		this.initConnection(username, domain, password);
				
		this.connection.register.connect(domain, this.onRegister);
	},
	
	attach: function(jid, sid, rid) {
		this.initAttachment();
		
		this.connection.attach(jid, sid, rid, this.onConnect);
	},
	
	onConnect: function() {
		var status = this.getStatus();
		log(status);
		if(status === 3) {
			$(document).trigger("authenticating");
		} else if(status === 1) {
			$(document).trigger("connecting");
		} else if(status === 5) {
			$(document).trigger("connected");
		} else if(status === 7) {
			$(document).trigger("disconnecting");
		} else if(status === 6) {
			$(document).trigger("disconnected");
		} else if(status === 8) {
			$(document).trigger("attached");
		} else if(status === 9) {
			$(document).trigger("redirect");
		} else if(status === 4) {
			$(document).trigger("authfail");
		} else if(status === 2) {
			$(document).trigger("connfail");
		} else {
			$(document).trigger("error");
		}
	},
	
	onRegister: function(status) {
		if(status == Strophe.Status.REGISTER) {
			$(document).trigger("register");
		} else if (status === Strophe.Status.REGISTERED) {
	        console.log("registered!");
	        Connection.signIn(Connection.username, Connection.domain, Connection.password);
	        $(document).trigger("registered");
	    } else if (status === Strophe.Status.REGIFAIL) {
	        console.log("The Server does not support In-Band Registration");
	        $(document).trigger("regifail");
	    } else if (status === Strophe.Status.CONFLICT) {
	        console.log("Contact already existed!");
	        $(document).trigger("conflict");
	    } else if (status === Strophe.Status.NOTACCEPTABLE) {
	        console.log("Registration form not properly filled out.");
	        $(document).trigger("notacceptable");
	    } else if(status === 3) {
			$(document).trigger("authenticating");
		} else if(status === 1) {
			$(document).trigger("connecting");
		} else if(status === 5) {
			$(document).trigger("connected");
		} else if(status === 7) {
			$(document).trigger("disconnecting");
		} else if(status === 6) {
			$(document).trigger("disconnected");
		} else if(status === 8) {
			$(document).trigger("attached");
		} else if(status === 9) {
			$(document).trigger("redirect");
		} else if(status === 4) {
			$(document).trigger("authfail");
		} else if(status === 2) {
			$(document).trigger("connfail");
		} else {
			$(document).trigger("error");
		}
	}
};

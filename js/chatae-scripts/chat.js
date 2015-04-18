var jid = "";
var sid = "";
var rid = "";

var chatAEjid = "";
var chatAEsid = "";
var chatAErid = "";

$(document).ready(function() {
	$(document).bind("updateSelectedUser", function() {
		$(".channel-name").children("h3").text(Chat.selectedUser);
		Chat.updateMessageWindow(Chat.selectedUser);
	});
	
	Chat.selectedUser = Constants.GROUP_NAME;
	$(document).trigger("updateSelectedUser");
	
	$(document).on("click", ".user", function(event) {
		if(isUserAdded()) {
			$(".add-or-remove").removeClass("add-user").removeClass("remove-user");
			$(".add-or-remove").addClass("remove-user");
			$(".add-or-remove").text("- remove");
		} else {
			$(".add-or-remove").removeClass("add-user").removeClass("remove-user");
			$(".add-or-remove").addClass("add-user");
			$(".add-or-remove").text("+ add");
		}
		
		Chat.selectedUser = getUsername(event.target.id);
		
		$(document).trigger("updateSelectedUser");
	});
	
	$(document).on("click", ".username", function(event) {
		event.stopPropagation();
		
		if(isUserAdded()) {
			$(".add-or-remove").removeClass("add-user").removeClass("remove-user");
			$(".add-or-remove").addClass("remove-user");
			$(".add-or-remove").text("- remove");
		} else {
			$(".add-or-remove").removeClass("add-user").removeClass("remove-user");
			$(".add-or-remove").addClass("add-user");
			$(".add-or-remove").text("+ add");
		}
		
		var id = $(this).parent().parent().attr("id");
		Chat.selectedUser = getUsername(id);
		
		$(document).trigger("updateSelectedUser");
	});

	$(document).on("click", ".status", function(event) {
		event.stopPropagation();
		
		if(isUserAdded()) {
			$(".add-or-remove").removeClass("add-user").removeClass("remove-user");
			$(".add-or-remove").addClass("remove-user");
			$(".add-or-remove").text("- remove");
		} else {
			$(".add-or-remove").removeClass("add-user").removeClass("remove-user");
			$(".add-or-remove").addClass("add-user");
			$(".add-or-remove").text("+ add");
		}
		
		var id = $(this).parent().parent().attr("id");
		Chat.selectedUser = getUsername(id);
		
		$(document).trigger("updateSelectedUser");
	});
	
	$(document).on("click", ".userinfo", function(event) {
		event.stopPropagation();
		
		if(isUserAdded()) {
			$(".add-or-remove").removeClass("add-user").removeClass("remove-user");
			$(".add-or-remove").addClass("remove-user");
			$(".add-or-remove").text("- remove");
		} else {
			$(".add-or-remove").removeClass("add-user").removeClass("remove-user");
			$(".add-or-remove").addClass("add-user");
			$(".add-or-remove").text("+ add");
		}
		
		var id = $(this).parent().attr("id");
		Chat.selectedUser = getUsername(id);
		
		$(document).trigger("updateSelectedUser");
	});

	$("#send-button").click(function() {
		var message = $("#send-input").val();
		
		Chat.sendMessage(message);
	});
	
	$(document).bind("roomJoined", function() {
		Connection.joined = true;
		
		log("joined room");
	});
	
	$(document).on("click", ".add-user", function() {
		var data = { jid: Chat.selectedUser + "@" + Constants.XMPP_DOMAIN,
					 name: Chat.selectedUser };
		var iq = $iq({type: "set"}).c("query", {xmlns: "jabber:iq:roster"})
		 .c("item", data);
		 Connection.connection.sendIQ(iq);
		 
		 var subscribe = $pres({to: Chat.selectedUser + "@" + Constants.XMPP_DOMAIN, "type": "subscribe"});
		 Connection.connection.send(subscribe);
		 
		 $(".add-user").text("- remove");
		 $(".add-user").addClass("remove-user");
		 $(".add-user").removeClass("add-user");
	});

	$(document).on("click", ".remove-user", function() {
		var data = { jid: Chat.selectedUser + "@" + Constants.XMPP_DOMAIN,
					 name: Chat.selectedUser };
					 
		var iq = $iq({type: "set"}).c("query", {xmlns: "jabber:iq:roster"})
		 .c("item", data);
		 Connection.connection.sendIQ(iq);
		 
		 var unsubscribe = $pres({to: Chat.selectedUser + "@" + Constants.XMPP_DOMAIN, "type": "unsubscribe"});
		 Connection.connection.send(unsubscribe);
		 
		 $(".remove-user").text("+ add");
		 $(".remove-user").addClass("add-user");
		 $(".remove-user").removeClass("remove-user");
	});
	
	$("#logout").click(function() {
		Connection.connection.disconnect();
		
		setCookie("jid", "", "");
		setCookie("sid", "", "");
		setCookie("rid", "", "");
		
		alert("Good bye!");
		
		goToPage("chat.html");
	});

	getUserCookies();
	
	getChatAECookies();
	
	
	if(jid === "" || sid === "" || rid === "") {
		goToPage("signin.html");
	}
	
	Connection.attach(jid, sid, rid);
	//ChatAEConnection.attach(chatAEjid, chatAEsid, chatAErid);
	
	
	 //ChatAEConnection.chatSignIn();
});

function isUserAdded() {
	var jid = Strophe.getNodeFromJid(this.jid);
	
	if(Users[jid]) {
	var i;
		for(i = 0; i < Users[jid].length; i++) {
			if(Users[jid][i].jid === Chat.selectedUser) {
				return true;
			}
		}
	}
	
	return false;
}

function getUserCookies() {
	getJid();
	getRid();
	getSid();
}

function getChatAECookies() {
	getChatAEJid();
	getChatAERid();
	getChatAESid();
}

function getJid() {
	this.jid = getCookie("jid");
}
	
function getRid() {
	this.rid = getCookie("rid");
}
	
function getSid() {
	this.sid = getCookie("sid");
}

function getChatAEJid() {
	this.chatAEjid = getCookie("chatAEjid");
}
	
function getChatAERid() {
	this.chatAErid = getCookie("chatAErid");
}
	
function getChatAESid() {
	this.chatAEsid = getCookie("chatAEsid");
}
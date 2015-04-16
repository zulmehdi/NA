var jid = "";
var sid = "";
var rid = "";

var chatAEjid = "";
var chatAEsid = "";
var chatAErid = "";

$(document).ready(function() {
	Chat.selectedUser = "chatae";
	$(document).trigger("updateSelectedUser");
	
	$(document).on("click", "#user", function() {
		Chat.selectedUser = ($(this).children("a").text());
		$(document).trigger("updateSelectedUser");
	});

	$("#send-button").click(function() {
		var message = $("#send-input").val();
		
		Chat.sendMessage(message);
	});

	$(document).bind("updateSelectedUser", function() {
		$(".channel-name").children("h3").text(Chat.selectedUser);
		Chat.updateMessageWindow(Chat.selectedUser);
	});

	getUserCookies();
	
	getChatAECookies();
	
	
	if(jid === "" || sid === "" || rid === "") {
		goToPage("signin.html");
	}
	
	Connection.attach(jid, sid, rid);
	
	ChatAEConnection.signIn();//attach(chatAEjid, chatAEsid, chatAErid);
});

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
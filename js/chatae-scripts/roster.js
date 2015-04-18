var Roster = {
	pendingSubscriber: null,
	
	getUserRoster: function(iq) {
		var count = 0;
		var userJid = getCookie("jid");
		
		$(iq).find('item').each(function() {
			count++;
			var jid = $(this).attr('jid');
			jid = Strophe.getNodeFromJid(jid);
						
			if(!Users[Strophe.getNodeFromJid(userJid)]) {
				Users[Strophe.getNodeFromJid(userJid)] = [];
			}
			
			var user = new User(jid, "unknown");
			
			Users[Strophe.getNodeFromJid(userJid)].push(user);
		});
		
		Roster.addUsers(userJid, "users-list");
		
		Connection.connection.addHandler(Roster.getPresence, null, "presence");
 		Connection.connection.send($pres());
		
		return true;
	},
	
	getChatAERoster: function(iq) {
		var count = 0;
		var userJid = "chatae";
		
		$(iq).find('item').each(function() {
			count++;
			var chatae_jid = $(this).attr('jid');
			chatae_jid = Strophe.getNodeFromJid(chatae_jid);
			
			if(!Users[userJid]) {
				Users[userJid] = [];
			}
			
			var user = new User(chatae_jid, "unknown");
			
			Users[userJid].push(user);
		});
		
		Roster.addUsers(userJid, "channels-list");
		
		ChatAEConnection.connection.addHandler(Roster.getChatAEPresence, null, "presence");
 		ChatAEConnection.connection.send($pres());
		
		log(s);
		return true;
	},
	
	onError: function(iq) {
		log("roster error");
	},
	
	getPresence: function(presence) {
		var ptype = $(presence).attr("type") || "";
		var from = $(presence).attr("from");
		
		var show = "";
		
		if(ptype === "subscribe") {
			Roster.pendingSubscriber = from;
			Connection.connection.send($pres({
				to: Roster.pendingSubscriber,
				"type" : "subscribed"
			}));
			Roster.pendingSubscriber = null;
		} else if (ptype !== "error") {
			var contact = $("#user-" + Strophe.getNodeFromJid(from))
							.removeClass("online")
							.removeClass("away")
							.removeClass("offline");
			if (ptype === "unavailable") {
				contact.addClass("offline");
				show = "offline";
			} else {
				show = $(presence).find("show").text() || "online";
				if (show === "" || show === "chat" || "online") {
					contact.addClass("online");
					show = "online";
				} else {
					contact.addClass("away");
					show = "away";
				}
			}
			
			Roster.updatePresence(from, show, "user");
		}
		return true;
	},
	
	updatePresence: function(from, show, list) {
		if(Users[Strophe.getNodeFromJid(getCookie("jid"))]) {
			var user = Users[Strophe.getNodeFromJid(getCookie("jid"))];
			var count = 0;
			while(count < user.length) {
				if(user[count].jid === Strophe.getNodeFromJid(from)) {
					Users[Strophe.getNodeFromJid(getCookie("jid"))][count].status = show;
					
					break;
				}
				
				count++;
			}
			
			Roster.updateStatus(from, show, list);
		} else {
			Users[Strophe.getNodeFromJid(getCookie("jid"))] = [];
			var user = new User(from, show);
			
			Users[Strophe.getNodeFromJid(getCookie("jid"))].push(user);
			
			Roster.updateStatus(from, show, list);
		}
	},
	
	updateStatus: function(from, show, list) {
		var contact = $("#" + list + "-" + Strophe.getNodeFromJid(from));
		contact.find(".userinfo").find(".status").text(show);
	},
	
	getChatAEPresence: function(presence) {
		var ptype = $(presence).attr("type") || "";
		var from = $(presence).attr("from");
		
		var show = "";
		
		if(ptype === "subscribe") {
			Roster.pendingSubscriber = from;
			ChatAEConnection.connection.send($pres({
				to: Roster.pendingSubscriber,
				"type" : "subscribed"
			}));
			
			var data = { jid: Strophe.getBareJidFromJid(from) + "@" + Constants.XMPP_DOMAIN,
					 name: Strophe.getNodeFromJid(from) };
			
			var iq = $iq({type: "set"}).c("query", {xmlns: "jabber:iq:roster"})
			 .c("item", data);
			 Connection.connection.sendIQ(iq);
			 
			 var subscribe = $pres({to: Strophe.getBareJidFromJid(from), "type": "subscribe"});
			 Connection.connection.send(subscribe);
			Roster.pendingSubscriber = null;
		} else if(ptype === "unsubscribe") {
			ChatAEConnection.connection.send($pres({
				to: Strophe.getBareJidFromJid(from),
				"type" : "unsubscribed"
			}));
		} else if (ptype !== "error") {
			var contact = $("#channel-" + Strophe.getNodeFromJid(from))
							.removeClass("online")
							.removeClass("away")
							.removeClass("offline");
			if (ptype === "unavailable") {
				contact.addClass("offline");
				show = "offline";
			} else {
				show = $(presence).find("show").text() || "online";
				if (show === "" || show === "chat" || show === "online") {
					contact.addClass("online");
					show = "online";
				} else {
					contact.addClass("away");
					show = "away";
				}
			}
			
			Roster.updatePresence(from, show, "channel");
			
			//contact.find(".userinfo").find(".status").text(show);
		}
		return true;
	},
	
	onChatAERosterChanged: function(iq) {
		$(iq).find("item").each(function() {
			var sub = $(this).attr("subscription");
			var jid = $(this).attr("jid");
			var name = $(this).attr("name") || jid;
			
			if(sub === "remove") {
				$("#channel-" + Strophe.getNodeFromJid(jid)).remove();
			} else {
				var ul = document.getElementById("channels-list");
				var li = document.createElement("li");
					li.className = "user";
					li.id = "channel-" + chatae_jid;
						var divUser = document.createElement("div");
							divUser.className = "userinfo";
								var username = document.createElement("b");
									username.className = "username";
									username.appendChild(document.createTextNode(chatae_jid));
								var status = document.createElement("div");
									status.className = "status";
									status.appendChild(document.createTextNode("unknown"));
							divUser.appendChild(username);
							divUser.appendChild(status);
				li.appendChild(divUser);
				ul.appendChild(li);
			}
		});
		
		ChatAEConnection.connection.send($pres());
		
		return true;
	},
	
	onRosterChanged: function(iq) {
		$(iq).find("item").each(function() {
			var sub = $(this).attr("subscription");
			var jid = $(this).attr("jid");
			var name = $(this).attr("name") || jid;
			
			if(sub === "remove") {
				$("#user-" + Strophe.getNodeFromJid(jid)).remove();
			} else {
				var ul = document.getElementById("users-list");
				var li = document.createElement("li");
					li.className = "user";
					li.id = "user-" + jid;
						var divUser = document.createElement("div");
							divUser.className = "userinfo";
								var username = document.createElement("b");
									username.className = "username";
									username.appendChild(document.createTextNode(chatae_jid));
								var status = document.createElement("div");
									status.className = "status";
									status.appendChild(document.createTextNode("unknown"));
							divUser.appendChild(username);
							divUser.appendChild(status);
				li.appendChild(divUser);
				ul.appendChild(li);
			}
		});
		
		Connection.connection.send($pres());
		
		return true;
	},
	
	addUsers: function(userJid, list) {
		var jid = userJid;
		if(jid !== "chatae") {
			jid = Strophe.getNodeFromJid(userJid);
		}
		if(Users[jid]) {
			var numberOfUsers = Users[jid].length;
			var count = 0;
			while(count < numberOfUsers) {
				var user = Users[jid][count];
				var ul = document.getElementById(list);
				ul.appendChild(Roster.addUser(list, user.jid, user.status));
				
				count++;
			}
		}
	},
	
	addUser: function(list, jid, userStatus) {
		var list = list.replace("s-list", "");
		var li = document.createElement("li");
			li.className = "user";
			li.id = list + "-" + jid;
				var divUser = document.createElement("div");
					divUser.className = "userinfo";
						var username = document.createElement("b");
							username.className = "username";
							username.appendChild(document.createTextNode(jid));
						var status = document.createElement("div");
							status.className = "status";
							status.appendChild(document.createTextNode(userStatus));
					divUser.appendChild(username);
					divUser.appendChild(status);
			li.appendChild(divUser);
		return li;
	}
};
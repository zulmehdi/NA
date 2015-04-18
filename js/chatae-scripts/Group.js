var Group = {
	onPresence: function(presence) {
		var from = $(presence).attr("from");
		var room = Strophe.getBareJidFromJid(from);
		var pres = $(presence).find("show").text();
		
		if (room === Constants.GROUP_ROOM) {
			var nick = Strophe.getResourceFromJid(from);
			
			if ($(presence).attr("type") === "error" && !Connection.joined) {
				Connection.connection.disconnect();
			} else if (!Connection.participants[nick] && $(presence).attr("type") !== "unavailable") {
				Connection.participants[nick] = true;
				//var ul = $("#channel-" + nick)
							//.removeClass("online")
							//.removeClass("away")
							//.removeClass("offline");
				if(pres === "" || pres === "chat" || pres === "online") {
					pres = "online";
				} else {
					pres = "away";
				}
				
				if(nick !== Strophe.getNodeFromJid(getCookie("jid"))) {
					$("#channels-list").append("<li class=\"user " + pres + "\" id=\"channel-" + nick + "\">" +
											   "<div class=\"userinfo\">" +
											   "<b class=\"username\">" + nick + "</b>" +
											   "<div class=\"status\">" + pres + "</div>" +
											   "</div>" +
											   "</li>");					   
				  }
				
				//ul.addClass(pres);
				//ul.append(Group.addUser("channels-list", nick, pres));
			}
			
			if ($(presence).attr("type") !== "error" && !Connection.joined) {
				if ($(presence).find("status[code='110']").length > 0) {
					if ($(presence).find("status[code='210']").length > 0) {
						Constants.nickname = Strophe.getResourceFromJid(from);
					}
					$(document).trigger("roomJoined");
				}
			}
		}
		return true;
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

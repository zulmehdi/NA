var Chat = {
	selectedUser: Constants.GROUP_NAME,
	message: "",
	
	sendMessage: function(message) {
		if(message !== null || message !== "" || message !== " ") {
			if(Chat.selectedUser === Constants.GROUP_NAME) {
				var msg = $msg({
							to: Constants.GROUP_ROOM,
							"type": "groupchat"
							}).c("body").t(message);
			} else {
				var msg = $msg({
							to: this.selectedUser + "@" + Constants.XMPP_DOMAIN,
							"type": "chat"
							}).c("body").t(message);
			}
			
			if(!Messages[this.selectedUser]) {
				Messages[this.selectedUser] = [];
			}
		
			var m = new Message(Strophe.getNodeFromJid(jid), this.selectedUser, msg.tree(), formatDate(new Date()));
		
			Messages[this.selectedUser].push(m);
			
			Connection.connection.send(msg);
			
 			Chat.updateMessageWindow(this.selectedUser);
		}
	},
	
	receiveMessage: function(message) {
		var from = Strophe.getNodeFromJid($(message).attr("from"));
		var to = Strophe.getNodeFromJid($(message).attr("to"));
		
		var m = new Message(from, to, message, formatDate(new Date()));
		
		var user = Chat.selectedUser;
		
		if(!Messages[from]) {
			Messages[from] = [];
		}
		
		Messages[from].push(m);
		
		if(from === user) {
 			Chat.updateMessageWindow(from);
		}
		
		return true;
	},
	
	receiveGroupMessage: function(message) {
		var from = Strophe.getResourceFromJid($(message).attr("from"));
		var to = "ChatAE";
		
		var m = new Message(from, to, message, formatDate(new Date()));
		
		var user = Chat.selectedUser;
		
		if(!Messages[to]) {
			Messages[to] = [];
		}
		
		Messages[to].push(m);
		
		if(to === user) {
 			Chat.updateGroupWindow(to);
		}
		
		return true;
	},
	
	updateMessageWindow: function(user) {
		$("#messages").empty();
		if(Messages[user]) {
			var numberOfMessages = Messages[user].length;
			var count = 0;
			while(count < numberOfMessages) {
				var m = Messages[user][count];
				var body = $(m.message).find("body");
				var from = m.from;
				var to = m.to;
				
				if (body.length === 0) {
					body = $(m.message).find("body");
					if (body.length > 0) {
						body = body.text();
					} else {
						body = null;
					}
				} else {
					body = body.contents();
		 			var span = $("<span></span>");
					body.each(function () {
						if (document.importNode) {
			 				$(document.importNode(this, true)).appendTo(span);
						} else {
			 				// IE workaround
			 				span.append(this.xml);
			 			}
					});
					body = span;
		 		}
				
				if (body) {
					var ul = document.getElementById("messages");
						var li = document.createElement("li");
							var rootDiv = document.createElement("div");
								var userinfo = document.createElement("div");
								userinfo.className = "user-info";
									var b = document.createElement("b");
										b.appendChild(document.createTextNode(from));
									var i = document.createElement("i");
									i.appendChild(document.createTextNode(" @ " + m.datetime));
								userinfo.appendChild(b);
								userinfo.appendChild(i);
								var messageDiv = document.createElement("div");
								messageDiv.className = "message";
								messageDiv.appendChild(document.createTextNode(body.text()));
							rootDiv.appendChild(userinfo);
							rootDiv.appendChild(messageDiv);
						li.appendChild(rootDiv);
					ul.appendChild(li);
					
					$('.messages').animate({scrollTop:$('.messages').height()}, 'slow');
				}
				count++;
			}
		}
	},
	
		updateGroupWindow: function(user) {
		$("#messages").empty();
		if(Messages[user]) {
			var numberOfMessages = Messages[user].length;
			var count = 0;
			while(count < numberOfMessages) {
				var m = Messages[user][count];
				var body = $(m.message).find("body");
				var from = m.from;
				var to = m.to;
				
				if (body.length === 0) {
					body = $(m.message).find("body");
					if (body.length > 0) {
						body = body.text();
					} else {
						body = null;
					}
				} else {
					body = body.contents();
		 			var span = $("<span></span>");
					body.each(function () {
						if (document.importNode) {
			 				$(document.importNode(this, true)).appendTo(span);
						} else {
			 				// IE workaround
			 				span.append(this.xml);
			 			}
					});
					body = span;
		 		}
				
				if (body) {
					var ul = document.getElementById("messages");
						var li = document.createElement("li");
							var rootDiv = document.createElement("div");
								var userinfo = document.createElement("div");
								userinfo.className = "user-info";
									var b = document.createElement("b");
										b.appendChild(document.createTextNode(from));
									var i = document.createElement("i");
									i.appendChild(document.createTextNode(" @ " + m.datetime));
								userinfo.appendChild(b);
								userinfo.appendChild(i);
								var messageDiv = document.createElement("div");
								messageDiv.className = "message";
								messageDiv.appendChild(document.createTextNode(body.text()));
							rootDiv.appendChild(userinfo);
							rootDiv.appendChild(messageDiv);
						li.appendChild(rootDiv);
					ul.appendChild(li);
					
					$('.messages').animate({scrollTop:$('.messages').height()}, 'slow');
				}
				count++;
			}
		}
	},
	
	logMessages: function(user) {
		for(var i = 0; i < (Messages[user]).length; i++) {
			log(Messages[user][i]);
		}
	}
};

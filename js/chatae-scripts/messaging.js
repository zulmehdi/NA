var Chat = {
	selectedUser: ChatAEConnection.userusername,
	message: "",
	
	sendMessage: function(message) {
		if(message !== null || message !== "" || message !== " ") {
			Connection.connection.send(
				$msg({
					to: this.selectedUser + "@" + Constants.XMPP_DOMAIN,
					"type": "chat"
				})
					.c("body")
						.t(message)
			);
			
			var ul = document.getElementById("messages");
				var li = document.createElement("li");
					var rootDiv = document.createElement("div");
						var userinfo = document.createElement("div");
						userinfo.className = "user-info";
							var b = document.createElement("b");
							b.appendChild(document.createTextNode(Strophe.getNodeFromJid(jid)));
							var i = document.createElement("i");
							i.appendChild(document.createTextNode(formatDate(new Date())));
						userinfo.appendChild(b);
						userinfo.appendChild(i);
						var messageDiv = document.createElement("div");
						messageDiv.className = "message";
						messageDiv.appendChild(document.createTextNode(message));
					rootDiv.appendChild(userinfo);
					rootDiv.appendChild(messageDiv);
				li.appendChild(rootDiv);
			ul.appendChild(li);
			
			$('.messages').animate({scrollTop:$('.messages').height()}, 'slow');
			
			message = "";
			$("#send-input").focus();
		}
	},
	
	receiveMessage: function(message) {
		var from = Strophe.getNodeFromJid($(message).attr("from"));
		var to = Strophe.getNodeFromJid($(message).attr("to"));
		var body = $(message).find("html > body");
		
		var user = Chat.selectedUser;
		
		if(to === "chatae") {
			if(!Messages[to]) {
				Messages[to] = [];
			}
			
			Messages[to].push(message);
			
			if(to === user) {
	 			Chat.updateMessageWindow(to);
			}
		} else {
			if(!Messages[from]) {
				Messages[from] = [];
			}
			
			Messages[from].push(message);
			
			if(from === user) {
	 			Chat.updateMessageWindow(from);
			}
		}
		
		
		
		return true;
	},
	
	updateMessageWindow: function(user) {
		if(Messages[user]) {
			$("#messages").empty();
			var numberOfMessages = Messages[user].length;
			var count = 0;
			while(count < numberOfMessages) {
				var body = $(Messages[user][count]).find("body");
				
				if (body.length === 0) {
					body = $(Messages[user][count]).find("body");
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
									b.appendChild(document.createTextNode(user));
									var i = document.createElement("i");
									i.appendChild(document.createTextNode(formatDate(new Date())));
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

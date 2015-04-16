var Roster = {
	getUserRoster: function(iq) {
		var s =  "";
		var count = 0;
		$(iq).find('item').each(function() {
			count++;
			var jid = $(this).attr('jid');
			jid = Strophe.getNodeFromJid(jid);
						
			//s += rjid + "\n";
			
			var ul = document.getElementById("users-list");
			var li = document.createElement("li");
				var a = document.createElement("a");
					a.href = "#";
						var divUser = document.createElement("div");
							divUser.className = "user";
								var divInfo = document.createElement("div");
									divInfo.className = "info";
									var b = document.createElement("b");
										b.appendChild(document.createTextNode(jid));
									var divLastText = document.createElement("div");
										divLastText.className = "last-text";
										divLastText.appendChild(document.createTextNode("last text"));
								divInfo.appendChild(b);
								divInfo.appendChild(divLastText);
							divUser.appendChild(divInfo);
						a.appendChild(divUser);
				li.appendChild(a);
			ul.appendChild(li);
		});
		
		// log(s);
	},
	
	getChatAERoster: function(iq) {
		var s =  "";
		var count = 0;
		$(iq).find('item').each(function() {
			count++;
			var chatae_jid = $(this).attr('jid');
			chatae_jid = Strophe.getNodeFromJid(chatae_jid);
			
			//s += jid + "\n";
			if(chatae_jid !== Strophe.getNodeFromJid(jid) && chatae_jid !== "null") {
				var ul = document.getElementById("channels-list");
				var li = document.createElement("li");
					li.id = "user";
					var a = document.createElement("a");						
						a.href = "#";
						a.appendChild(document.createTextNode(chatae_jid));
					li.appendChild(a);
				ul.appendChild(li);
			}
		});
		
		log(s);
	},
};
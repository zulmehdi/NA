$(document).bind("addcontact", function(event, data) {
	var iq = $iq({type: "set"})
				.c("query", { xmlns: "jabber:iq:roster"})
					.c("item", data);
					
	var subscribe = $pres({to: data.jid, "type": "subscribe"});
 	ChatAEConnection.connection.send(subscribe);
	
	ChatAEConnection.connection.sendIQ(iq, onAdded);
	//goToPage("chat.html");
});

function onAdded(iq) {
	goToPage("chat.html");
}

function log(s) {
	console.log(s);
}

function connectionstatus(s) {
	log(s);
}

function setCookie(name, value, expiry) {
	document.cookie = name + "=" + value + "; expires=" + expiry + ";path=/";
	log("cookie " + name + " set with value " + value);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        
        while(c.charAt(0) == ' ') {
        	c = c.substring(1);
        }
        
        if(c.indexOf(name) == 0) {
        	return c.substring(name.length,c.length);
        }
    }
    return "";
}

function goToPage(page) {
	window.location = page;
}

function validateForm() {
	var isFormValid = true;
	
	if(validatePassword()) {
		if(isFormValid !== false) {
			isFormValid = true;
		}
	} else {
		isFormValid = false;
	}
	
	if(validateConfirmPassword()) {
		if(isFormValid !== false) {
			isFormValid = true;
		}
	} else {
		isFormValid = false;
	}
	
	return isFormValid;
}

function validateEmail() {
	var email = document.getElementById("email").value;
	var emailValidationText = document.getElementById("email-validation-text");
	
    var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    
    emailValidationText.style.display = re.test(email) ? "none" : "block";
    
    return re.test(email);
}

function validatePassword() {
	var password = document.getElementById("password").value;
	var passwordValidationText = document.getElementById("password-validation-text");
	
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
	
	passwordValidationText.style.display = re.test(password) ? "none" : "block";
	
	return re.test(password);
}

function validateConfirmPassword() {
	var password = document.getElementById("password").value;
	var confirmPassword = document.getElementById("confirm-password").value;
	var confirmPasswordValidationText = document.getElementById("confirm-password-validation-text");
	
	if(confirmPassword === password) {
		confirmPasswordValidationText.style.display = "none";
	
		return true;
	}
	
	confirmPasswordValidationText.style.display = "block";
	
	return false;
}

function formatDate(date) {
    var year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        morning = hour < 12 ? "am" : "pm";

    return month + "/" + day + "/" + year + " " + hourFormatted + ":" +
            minuteFormatted + morning;
}

function getUsername(username) {
	return username.replace("user-", "").replace("channel-", "");
}
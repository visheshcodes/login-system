window.onload = function(){
	login("start");

	$aEL($(".loginb"), "click", () => {location.href = "index.html"});
	
	$aEL($("button[name='rsubmit']"), "click", () => {
		login("signup");
	});
}

function responseHandler(responseText){
	console.log(responseText);

	var list = responseText.split("{");

	for(var item of list){
		if(item != ""){
			obj = "{" + item;

			var response = JSON.parse(obj);
			
			if(response.message == "userExists"){
				$(".alert").innerHTML = "Username already exists";
			}else if(response.message == "signed up"){
				localStorage.signedup = true;
				location.href = "userdata.html";
			}
		}
	}
}

function login(mode, n, p){
	xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200 && xhttp.responseText){
			responseHandler(xhttp.responseText);
		}
	};
	
	if(mode == "start"){console.log("start");
	
		xhttp.open("POST", "start.php", true);
		
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		xhttp.send();
		
	}else if(mode == "signup"){//console.log("signup");
		var n = $(".signup .username").value;
		var p = $(".signup .password").value;
		
		if(n && p){
			//console.log(n);console.log(p);console.log(uname);
			xhttp.open("POST", "signup.php", true);
		
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
			xhttp.send("username="+n+"&password="+p);
		}
		
	}
}

function signup(){
	$(".alert").innerHTML = "";
	
	$("fieldset[name='login']").classList = "hidden";
	$(".signupb").classList = "signupb hidden";
	
	$(".signup").classList = "signup";
}

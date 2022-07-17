//Author: Randal Obringer
//Date Last Modified: 29 May 2017
//Description: JavaScript code to demonstrate basic front end coding knowledge.

window.onload = function(){
	alert("Testing the onload function");
}

$(document).ready(function(){
	alert("testing the jQuery .ready function");
});

function showHidePage(){
	if(togglePage()){
		document.getElementById("webpage").style.display="block";
	}else{
		document.getElementById("webpage").style.display="none";
	}
}

//demonstrate another closure
var togglePage = (function (){
	var page = false; 
	return function(){
		page = !page;
		return page;
	};
})();

function showForm(){
	document.getElementById("form").style.display="block";
}

function hideForm(){
	//not proper for a form but this does illustrate how to hide something...
	//forms shouldn't be available after submitting anyways...
	document.getElementById("form").style.display="none";
}

function showName(){
	elem = document.getElementById("closureZone");
	elem.innerHTML = showMoreFromName();
}

//closure example
var showMoreFromName = (function(){
	var name = "Randal Obringer";
	var result = "";
	var count = 0;
	return function(){
		if(count < name.length){
			result = result + name[count];
			count++;
		}else{
			result="";
			count=0;
		}
		//console.log(result);
		return result;
	};
})();

//another closure example
var toggleLight = (function(){
	var light = false;
	return function(){
		light = !light;
		return light;
	};
})();

function turnLightOnOff(){
	if(toggleLight()){
		document.getElementById("lightBulb").src="lightOn.png";
	}else{
		document.getElementById("lightBulb").src="lightOff.png";
	}
}

function ajaxFunction(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			var elem = document.getElementById("ajaxZone");
			elem.style.color="red";
			elem.innerHTML = this.responseText;
		}
	};
	xhttp.open("GET","AJAXtoLoad.txt",true);
	xhttp.send();
}

/*function ajaxFunction(url,func){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			func(this);
		}
	};
	xhttp.open("GET",url,true);
	xhttp.send();
}*/

function redDisplay(xhttpObj){
	var elem = document.getElementById("ajaxZone");
	elem.style.color="red";
	elem.innerHTML = xhttpObj.responseText;
}

function purpleDisplay(xhttpObj){
	var elem = document.getElementById("ajaxZone");
	elem.style.color="purple";
	elem.innerHTML = xhttpObj.responseText;
}
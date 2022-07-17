$(document).ready(function(){
	$("#search").on("click",wikiSearchListings);
	$("#cancel").on("click",clearSearch);
	$("#searchQuery").on("keyup",function(e){
		console.log("logged key press");
		switch(e.which){
			case 13: //enter key was pressed
				wikiSearchListings();
				break;
			default:
				break;
		}
	});
});

//onclick event for x button
function clearSearch(){
	if($("#errorMsg").css("display")!="none"){
		$("#errorMsg").css("display","none");
	}
	if($("#searchQuery").prop("value")==""){
		$("#searchField").css("display","none");
	}else{
		$("#searchQuery").prop("value",null);
		$(".wikiEntry").remove(); //remove all of the listings we produced, if any.
		$("#searchQuery").focus();
	}
}

//onclick event for search icon button
function wikiSearchListings(){
	//if search bar is not displayed yet
	if($("#searchField").css("display")=="none"){ 
		$("#searchField").css("display","inline");
		$("#searchQuery").focus();
	//if search bar value is empty
	}else if($("#searchQuery").prop("value")==""){
		$("#errorMsg").css("display","block");
	//a search has been typed
	}else{
		//clear any previous error message
		if($("#errorMsg").css("display")!="none"){
			$("#errorMsg").css("display","none");
		}
		//clear any previous entries on the page
		$(".wikiEntry").remove();
		
		var query = $("#searchQuery").prop("value");
	
		console.log("attempting to grab json file");
		
		var apiURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
	
		//perform a new search
		$.ajax({
			type: "GET",
			url: apiURL + query,
			success: handleWikiListResponse,
			error: wikiErrorCallback,
			dataType: "jsonp"
		});
	}
}

function handleWikiListResponse(json){
	console.log("Successfully grabbed a wiki page in json format!");
	
	var i=0;
	
	for(var key in json.query.pages){
		if(json.query.pages.hasOwnProperty(key)){
			var newListing = 
			//start element **********
				'<a class="wikiEntry" href="https://en.wikipedia.org/?curid=' + json.query.pages[key].pageid + '" target="_blank">' + 
					'<div class="row listEntry">' +
						'<div class="col-md-12">';
							if(json.query.pages[key].hasOwnProperty("thumbnail")){
							newListing += 
							'<img src="' + json.query.pages[key].thumbnail.source + '" class="img-responsive preview" />';
							}
							newListing += 
							'<h4>' + json.query.pages[key].title + '</h4>' +
							'<p>' + json.query.pages[key].extract + '</p>'
						'</div>' + 
					'</div>' + 
				'</a>';
			//end element **********
			
			var blank = 
				'<div class="wikiEntry">' + 
					'<br />' +
				'</div>';
			
			//create a new wiki page link
			$("#wikiList").append(newListing,blank);
		}
	}
}

function wikiErrorCallback(error) {
	alert('ERROR(' + error.code + '): ' + error.message);
}
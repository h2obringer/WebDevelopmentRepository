var nextQuote = (function(){
	var jsonQuoteList;
	
	console.log("attempting to grab json file");
	$.getJSON("quotes.json", function(json) {
		jsonQuoteList = json;
		console.log("Quote: " + jsonQuoteList[0].quote);
	});
	
	return function(){
		
		var quoteID = Math.floor(Math.random() * jsonQuoteList.length);
		var red = Math.floor(Math.random() * 128);
		var green = Math.floor(Math.random() * 128);
		var blue = Math.floor(Math.random() * 128);
		
		$("#theQuote").html("\"" + jsonQuoteList[quoteID].quote + "\"");
		$("#theMovie").html("-" + jsonQuoteList[quoteID].movie);
		$("#quoteFrame").css("background-color","rgb(" + red + "," + green + "," + blue + ")");
		$("#twitter").prop("href", "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + 
			jsonQuoteList[quoteID].quote + "%20" + jsonQuoteList[quoteID].movie);
	}
})();

  
$(document).ready(function() {
	nextQuote();
	$("#nextQuote").on("click", nextQuote);
	console.log("onclick event registered");
});
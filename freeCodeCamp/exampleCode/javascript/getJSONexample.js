$(document).ready(function() {

    $("#getMessage").on("click", function() {
    	$.getJSON("/json/cats.json", function(json) {

			//var html = "";
			
			//optional filter on json data before looping through it
			/*json = json.filter(function(val) {
				return (val.id !== 1);
			});*/
			
			// Only change code below this line.
			json.forEach( function(val){
				var keys = Object.keys(val);
				//html += "<div class = 'cat'>";
				keys.forEach(function(key){
					//html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
					console.log("Key: " + key + ", Value: " + val[key]);)
				});
				//html += "</div><br>";
			});
			
			
			// Only change code above this line.

			//$(".message").html(html);

    	});
    });
  });
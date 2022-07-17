function determineMoon(value){
	var src;
	var moonphase;
	if(value===0){
		src="newmoon.jpg";
		moonphase="New Moon";
	}else if(value > 0 && value < 0.25){
		src="waxingcrescent.jpg";
		moonphase="Waxing Crescent";
	}else if(value==0.25){
		src="firstquarter.jpg";
		moonphase="First Quarter";
	}else if(value>0.25 && value < 0.5){
		src="waxinggibbous.jpg";
		moonphase="Waxing Gibbous";
	}else if(value==0.5){
		src="fullmoon.jpg";
		moonphase="Full Moon";
	}else if(value>0.5 && value < 0.75){
		src="waninggibbous.jpg";
		moonphase="Waning Gibbous";
	}else if(value==0.75){
		src="lastquarter.jpg";
		moonphase="Last Quarter";
	}else{
		src="waningcrescent.jpg";
		moonphase="Waning Crescent";
	}
	
	$("#moonimage").prop("src",src);
	$("#moonphase").html(moonphase);
}

function determineWeatherImage(selector,data){
	var src;
	console.log(data);
	switch(data){
		case "clear-day":
			$(selector).prop("src","clear-day.jpg");
			break;
		case "clear-night":
			$(selector).prop("src","clear-night.jpg");
			break;
		case "rain":
			$(selector).prop("src","rain.jpg");
			break;
		case "snow":
			$(selector).prop("src","snow.jpg");
			break;
		case "sleet":
			$(selector).prop("src","sleet.jpg");
			break;
		case "wind":
			$(selector).prop("src","wind.jpg");
			break;
		case "fog":
			$(selector).prop("src","fog.jpg");
			break;
		case "cloudy":
			$(selector).prop("src","cloudy.jpg");
			break;
		case "partly-cloudy-day":
			$(selector).prop("src","partly-cloudy-day.jpg");
			break;
		case "partly-cloudy-night":
			$(selector).prop("src","partly-cloudy-night.gif");
			break;
		default:
			$(selector).prop("src","weatherunknown.jpg");
	}
}

function determineWindDirection(selector, data){
	var direction;
	if(data >= 350 || data < 10){
		direction="N";
	}else if(data >=10 && data < 35){
		direction="N/NE";
	}else if(data >=35 && data < 55){
		direction="NE";
	}else if(data >=55 && data < 80){
		direction="E/NE";
	}else if(data >= 80 && data < 100){
		direction="E";
	}else if(data >=100 && data < 125){
		direction="E/SE";
	}else if(data >=125 && data < 145){
		direction="SE";
	}else if(data >=145 && data < 170){
		direction="S/SE";
	}else if(data >= 170 && data < 190){
		direction="S";
	}else if(data >=190 && data < 215){
		direction = "S/SW"
	}else if(data >= 215 && data < 235){
		direction = "SW";
	}else if(data >=235 && data < 260){
		direction = "W/SW";
	}else if(data >= 260 && data < 280){
		direction = "W";
	}else if(data >= 280 && data < 305){
		direction = "W/NW";
	}else if(data >= 305 && data < 325){
		direction = "NW";
	}else if(data >= 325 && data < 350){
		direction = "N/NW";
	}
	$(selector).html("Wind bearing: " + data + "&deg; (" + direction + ")");
}

function determineTime(data){
	//javascript uses milliseconds not seconds like UNIX(expected output) so correct it first
	var dateTime = new Date(data * 1000);
	var dayNight;
	var hours;
	var minutes;
	
	if(dateTime.getHours()<12){
		dayNight = "a.m.";
	}else{
		dayNight = "p.m.";
	}
	
	if(dateTime.getHours()===0 || dateTime.getHours()==12){
		hours=12;
	}else if(dateTime.getHours()>12){
		hours = dateTime.getHours()-12;
	}else{
		hours = dateTime.getHours();
	}
	
	if(dateTime.getMinutes()< 10){
		minutes = "0" + dateTime.getMinutes();
	}else{
		minutes = dateTime.getMinutes();
	}
	
	return hours + ":" + minutes + " " + dayNight;
}

function handleWeatherResponse(json){
	$("#todaysummarytext").html(json.daily.data[0].summary);
	determineWeatherImage("#todaysummaryimg",json.daily.data[0].icon);
	
	$("#sunrisetime").html("Sunrise: " + determineTime(json.daily.data[0].sunriseTime));
	$("#sunsettime").html("Sunset: " + determineTime(json.daily.data[0].sunsetTime));
	$("#maxTemp").html(json.daily.data[0].temperatureMax);
	$("#maxTempTime").html("Time: " + determineTime(json.daily.data[0].temperatureMaxTime));
	$("#minTemp").html(json.daily.data[0].temperatureMin);
	$("#minTempTime").html("Time: " + determineTime(json.daily.data[0].temperatureMinTime));
	determineMoon(json.daily.data[0].moonPhase);
	
	$("#todayhumidity").html("Humidity: " + (json.daily.data[0].humidity * 100) + "%");
	$("#todaywindspeed").html("Wind speed: " + json.daily.data[0].windSpeed + "mph");
	determineWindDirection("#todaywindbearing",json.daily.data[0].windBearing);
	$("#todaywindgust").html("Wind gust: " + json.daily.data[0].windGust + "mph");
	$("#todayvisibility").html("Visibility: " + json.daily.data[0].visibility + " miles");
	$("#todaycloudcover").html("Cloud cover: " + (json.daily.data[0].cloudCover * 100) + "%");
	$("#todaydewpoint").html(json.daily.data[0].dewPoint);
	$("#todayprecipitationtype").html("Precip Type: " + json.daily.data[0].precipType);
	$("#todayprecipitationintensity").html("Precip Intensity: " + json.daily.data[0].precipIntensity);
	$("#todayozone").html("Ozone: " + json.daily.data[0].ozone + " DU");
	
	$("#currentsummarytext").html(json.currently.summary);
	determineWeatherImage("#currentsummaryimg",json.currently.icon);
	
	$("#currenttemperature").html(json.currently.temperature);
	$("#currentapparenttemperature").html(json.currently.apparentTemperature);
	$("#currentneareststorm").html("Nearest storm: " + json.currently.nearestStormDistance + " miles");
	$("#currenthumidity").html("Humidity: " + (json.currently.humidity * 100) + "%");
	$("#currentwindspeed").html("Wind speed: " + json.currently.windSpeed + "mph");
	determineWindDirection("#currentwindbearing",json.currently.windBearing);
	$("#currentwindgust").html("Wind gust: " + json.currently.windGust + "mph");
	$("#currentvisibility").html("Visibility: " + json.currently.visibility + " miles");
	$("#currentcloudcover").html("Cloud cover: " + (json.currently.cloudCover * 100) + "%");
	$("#currentdewpoint").html(json.currently.dewPoint);
	$("#currentprecipitationtype").html("Precip type: " + json.currently.precipType);
	$("#currentprecipitationintensity").html("Precip intensity: " + json.currently.precipIntensity);
	
	//register onclick event to change temperatures - must be done after weather data has been successfully received
	$("#changeTempUnitBtn").on("click",changeTemperatureUnits());
}

function weatherErrorCallback(error) {
	alert('ERROR(' + error.code + '): ' + error.message);
}

function weatherSuccessCallback(position){
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var apiKey = "771daae439b30f4eade707d0fe0511c4";
	var weatherRequest = "https://api.darksky.net/forecast/" + apiKey + "/" + lat + "," + lon;
	
	console.log("Requesting: " + weatherRequest);
	
	console.log("attempting to grab json file");
	
	$.ajax({
		type: "GET",
		url: weatherRequest,
		success: handleWeatherResponse,
		dataType: "jsonp"
    });
}

function getWeather(){
	
	if (navigator.geolocation) {
		
		var timeoutVal = 10 * 1000 * 1000;
		
		navigator.geolocation.getCurrentPosition(
			weatherSuccessCallback, 
			weatherErrorCallback,
			{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
		);
	} else {
		alert("Geolocation is not supported by this browser");
	}
}

function convertCtoF(celsius){
	return celsius*(9.0/5.0) + 32;
}

function convertFtoC(fahrenheit){
	return (fahrenheit-32)*(5.0/9.0);
}

var changeTemperatureUnits = function(){
	var isTempFahr = true;
	var minimum = $("#minTemp").html();
	var maximum = $("#maxTemp").html();
	var todayDew = $("#todaydewpoint").html();
	var currentTemp = $("#currenttemperature").html();
	var currentAppTemp = $("#currentapparenttemperature").html();
	var currentDew = $("#currentdewpoint").html();
	
	return function(){
		isTempFahr = !isTempFahr;
		
		if(isTempFahr){
			$("#btnTempUnit").html("&deg;C");
			$(".tempUnit").html("&deg;F");
			minimum = convertCtoF(minimum);
			maximum = convertCtoF(maximum);
			todayDew = convertCtoF(todayDew);
			currentTemp = convertCtoF(currentTemp);
			currentAppTemp = convertCtoF(currentAppTemp);
			currentDew = convertCtoF(currentDew);
			
			$("#minTemp").html(minimum);
			$("#maxTemp").html(maximum);
			$("#todaydewpoint").html(todayDew);
			$("#currenttemperature").html(currentTemp);
			$("#currentapparenttemperature").html(currentAppTemp);
			$("#currentdewpoint").html(currentDew);
		}else{
			$("#btnTempUnit").html("&deg;F");
			$(".tempUnit").html("&deg;C");
			minimum = convertFtoC(Math.floor(minimum));
			maximum = convertFtoC(Math.floor(maximum));
			todayDew = convertFtoC(Math.floor(todayDew));
			currentTemp = convertFtoC(Math.floor(currentTemp));
			currentAppTemp = convertFtoC(Math.floor(currentAppTemp));
			currentDew = convertFtoC(Math.floor(currentDew));
			
			$("#minTemp").html(Math.floor(minimum));
			$("#maxTemp").html(Math.floor(maximum));
			$("#todaydewpoint").html(Math.floor(todayDew));
			$("#currenttemperature").html(Math.floor(currentTemp));
			$("#currentapparenttemperature").html(Math.floor(currentAppTemp));
			$("#currentdewpoint").html(Math.floor(currentDew));
		}
	};
};
  
$(document).ready(function() {
	getWeather();
});
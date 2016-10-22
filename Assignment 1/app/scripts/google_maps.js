// Asynchronous Loading of Google maps
// Source: 
// https://developers.google.com/maps/documentation/javascript/examples/map-simple-async
// https://developers.google.com/maps/documentation/javascript/examples/marker-simple

//default map values
var defMapValues = {
	//these coordinates should show Europe...
	lat: 56.20670343114287,
	lon: 18.896484375,	
	zoom: 3
};

function loadScript() {
	'use strict';
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
	  '&signed_in=true&callback=initialize';
	document.body.appendChild(script);
} //loadScript

/**
 Fills the dropdown (Select) with zoom values.
 These values are then used to zoom in/out on the Google map
**/
function fillSelectWithZoomValues() {
	'use strict';
	var min = 0;
	var max = 20;
	var dropdown = document.getElementById('zoomLevel');
	var option = document.createElement('option');
	//loop through the zoom values and add these as options to the dropdown
	for (var i = min; i < max; i++) {
		option.innerHTML = i;
		option.value = i;
		dropdown.appendChild(option);
		option = document.createElement('option');
	} //for
	//set current zoom level
	dropdown.value = defMapValues.zoom;
} //fillSelectWithZoomValues

/**
 Functions to be called when window is loaded
**/
function onLoadCall() {
	'use strict';
	loadScript();
	fillSelectWithZoomValues();
} //onLoadCall

//when the window is loading, load the Google Maps API and fill select
window.onload = onLoadCall;

/**
 Update the loaded Google Map with the 
 passed latitude, longitude and zoom.
 @param lat: double - latitude 
 @param lon: double - longitude 
 @param zoom: int - zoom value for google maps 
 @param addMarker: boolean - If true, add a marker 
 to the current location on the map
**/
function updateMap(lat, lon, zoom, addMarker) {
	'use strict';
	//settings for google maps
	var currentLocation = new google.maps.LatLng(lat, lon);
	var mapOptions = {
		zoom: zoom,
		center: currentLocation
	};
	//create a new map object
	var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);	
	//should a marker be added to the map?
	if (addMarker) {
		var marker = new google.maps.Marker({
			position: currentLocation,
			map: map,
			title: 'Your position!'
		});
	} //if
} //updateMap

/**
 * Callback function Google Maps.
 * Called after retrieval of the maps api in loadScript
**/
function initialize() {
	'use strict';
	//initialize the map with default values and without a marker
	updateMap(defMapValues.lat, defMapValues.lon, defMapValues.zoom, false);
} //initialize
/**

Contains Javascript code for the GeoLocation API

Sources: 

http://www.w3schools.com/html/html5_geolocation.asp
http://www.w3.org/TR/geolocation-API/
http://www.w3.org/TR/2013/CR-html5-20130806/webappapis.html#navigator
 
**/

//variable for message displayed to the user
var feedbackMsg = '';
	 
//object for the interface PositionOptions
var positionOptions = {
	//try to get the best results possible
	enableHighAccuracy: true,
	//maximum length of time (in milliseconds) before error is set to TIMEOUT 
	timeout: 27000,
	//indicates if a cached position is acceptable, 
	//where the age of the position doesn't exceed the specified time in milliseconds
	maximumAge: 30000
 };
 
 function convertMilliSecToSec(milliSeconds) {	 
	'use strict';
	return (milliSeconds / 1000);
 } //convertMilliSecToSec

/**
 Adds the passed message to the TextArea
 @param message: String - Message (for user) to display in TextArea 
**/
function updateFeedbackText(message, isError) {
	'use strict';
	var fontWeight = 0;
	var fontColour = 'black';
	var textArea = document.getElementById('resultMsg');
	if (isError) {
		fontWeight = 900;
		fontColour = 'red';
	} //if
	textArea.style.color = fontColour;
	textArea.style.fontWeight = fontWeight ;
	textArea.value = message;
} //updateFeedbackText

/**
 The users location was found, display the location data
 @param position: Position - Object of the position interface, containing location data
**/
function foundLocation(position) {
	'use strict';
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var altitude = position.coords.altitude;
	var accuracy = position.coords.accuracy;
	var timestamp = new Date(position.timestamp);
	var dropdown = document.getElementById('zoomLevel');
	//message to the user
	feedbackMsg = 'Found your position! Your current position is:\n';
	feedbackMsg += 'Latitude: ' + lat + '\nLongitude: ' + lon + '\n';
	feedbackMsg += 'Altitude: ' + ( (altitude === null) ? 'Cannot provide altitude information.' : altitude + ' meters.');
	feedbackMsg += '\nAccuracy level: ' + accuracy + ' meters.\n';
	feedbackMsg += 'Location data retrieved: ' + timestamp;
	updateFeedbackText(feedbackMsg, false);
	//get the selected zoom value from the dropdown
	//and update the map to display the users location
	var zoom = parseInt(dropdown.value, 10);
	updateMap(lat, lon, zoom, true);
} //foundPosition
	 
/**
 Handles the error that occurred and passes the error message to updateFeedbackText(...)
 @param error: PositionError - Object containing information about the error that occurred
**/
function displayErrorMsg(error) {
	alert('error.code: ' + error.code + ' message: ' + error.message);
	'use strict';
    switch(error.code) {
		//error code: 1
        case error.PERMISSION_DENIED:
            feedbackMsg = 'Permission to attempt to locate your position was denied.\n';
			feedbackMsg += 'To retry, please allow this web-page to locate your position.';
            break;
		//error code: 2
        case error.POSITION_UNAVAILABLE:
            feedbackMsg = 'Location information is un-available.\n';
			feedbackMsg += 'If you are on a computer/laptop, enable WiFi and try again.';
            break;
		//error code: 3
        case error.TIMEOUT:
            feedbackMsg = 'Failed to retrieve your location within the given time limit ';
			feedbackMsg += '(time limit: ' + convertMilliSecToSec(positionOptions.timeout) + ' seconds).';
            break;
        case error.UNKNOWN_ERROR:
            feedbackMsg = 'An unknown error occurred. \nError message: "' + error.message + '"';
            break;
    } //switch
	//show error message to user
	updateFeedbackText(feedbackMsg, true);
 } //displayErrorMsg

function findMyLocation() {
	'use strict';
	//check if the browser supports GeoLocation
	//(navigator is an instance of the Navigator interface)
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(foundLocation, displayErrorMsg, positionOptions);
	} else {
	  feedbackMsg = 'GeoLocation is not supported by this browser.';
	  updateFeedbackText(feedbackMsg, true);
	} //if
} //locateCurrentPosition
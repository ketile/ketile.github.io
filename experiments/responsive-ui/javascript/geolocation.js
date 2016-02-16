'use strict'

var latitudeString = 0;
var longitudeString = 0;

//window.onload = getGeolocation();
window.addEventListener("load", getGeolocation);

function getGeolocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        log('Geolocation supported!');
    } else { 
        log('Geolocation is not supported by this browser!');
    }
}

function showPosition(position) {
    log('Latitude: ' + position.coords.latitude + 
    ' Longitude: ' + position.coords.longitude);
    latitudeString = position.coords.latitude;
    longitudeString = position.coords.longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            log("An unknown error occurred.");
            break;
    }
}
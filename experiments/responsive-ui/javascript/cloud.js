'use strict'

var publicKey = "ZGRzj8o0nxHwLLdxXrZR";
var privateKey = "2mNWaXMJ75hMAA1VxRje";
var interval;

function sendCloudData() {
  log('> sendCloudData()')
  // create object
  var xhttp = new XMLHttpRequest();
  
  // callback will only fire if message was received successfully
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      log('XHTTP response: ' + xhttp.responseText);
      
      // Parse JSON reponse
      var response = JSON.parse(xhttp.responseText);
      log('JSON response: ' + response.message);
    }
  };
  
  // populate the data for the request. the ".json" part specifies that we want the response as json.
  var message =   "https://data.sparkfun.com/input/"
                  + publicKey
                  + ".json"
                  + "?private_key="
                  + privateKey
                  + "&temperature="
                  + temperatureString
                  + "&humidity="
                  + humidityString
                  + "&pressure="
                  + pressureString
                  + "&latitude="
                  + latitudeString
                  + "&longitude="
                  + longitudeString;
                  
  xhttp.open("GET", message, true);
  
  // send the request
  xhttp.send();
}

function startCloudLogging(){
  interval = setInterval(sendCloudData, 10000);
  log("> startCloudLogging()");
}

function stopCloudLogging(){
  clearInterval(interval)
  log("> stopCloudLogging()");
}
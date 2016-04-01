'use strict'

const primaryServiceUUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const button3characteristicUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
const button4characteristicUUID = '6e400004-b5a3-f393-e0a9-e50e24dcca9e';

var bleServer;
var bleService;
var button3char;
var button4char;

window.onload = function(){
  document.querySelector('#connect').addEventListener('click', connect);
};

function connect() {
  if (!navigator.bluetooth) {
      log('Web Bluetooth API is not available.\n' +
          'Please make sure the Web Bluetooth flag is enabled.');
      return;
  }
  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [primaryServiceUUID]}]})
  .then(device => device.connectGATT())
  .then(server => { 
    bleServer = server;
    log('Got bleServer');
    return server.getPrimaryService(primaryServiceUUID);
  })
  .then(service => {
    log('Got bleService');
    bleService = service;
  })
  
  /** Works in Chrome OS not on Android**/
  .then(() => bleService.getCharacteristic(button3characteristicUUID))
  .then( characteristic => {
    log('Got button3characteristic');
    button3char = characteristic;
    return button3char.startNotifications();
  })
  .then(() => {
    button3char.addEventListener('characteristicvaluechanged',handleNotifyButton3);
  })
  .then(() => bleService.getCharacteristic(button4characteristicUUID))
  .then( characteristic => {
    log('Got temperatureCharacteristic');
    button4char = characteristic;
    return button4char.startNotifications();
  })
  .then(() => {
    button4char.addEventListener('characteristicvaluechanged',handleNotifyButton4);
  })
  .catch(error => {
    log('> connect ' + error);
  });
}
  
function handleNotifyButton3(event) {
  let value = event.target.value;
  value = value.buffer ? value : new DataView(value);
  let temporary = value.getUint8(0);
  let temporaryString = temporary.toString();
  log('Notification triggered on Button 3');
  document.getElementById("btn3").innerHTML = temporaryString;
}

function handleNotifyButton4(event) {
  let value = event.target.value;
  value = value.buffer ? value : new DataView(value);
  let temporary = value.getUint8(0);
  let temporaryString = temporary.toString();
  log('Notification triggered on Button 4');
  document.getElementById("btn4").innerHTML = temporaryString;
}

function log(text) {
    console.log(text);
    // more logging options here
}
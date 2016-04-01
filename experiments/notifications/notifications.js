'use strict'

const primaryServiceUUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const button3characteristicUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
const button4characteristicUUID = '6e400004-b5a3-f393-e0a9-e50e24dcca9e';

var bleDevice;
var bleServer;
var bleService;
var button3char;
var button4char;
var button3count = 0;
var button4count = 0;

window.onload = function(){
  document.querySelector('#connect').addEventListener('click', connect);
  document.querySelector('#disconnect').addEventListener('click', disconnect);
};

function connect() {
  if (!navigator.bluetooth) {
      log('Web Bluetooth API is not available.\n' +
          'Please make sure the Web Bluetooth flag is enabled.');
      return;
  }
  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [primaryServiceUUID]}]})
  .then(device => {
    bleDevice = device;
    return device.connectGATT();
  })
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
    log('Got button4characteristic');
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

function disconnect() {
  if (!bleDevice) {
    log('No Bluetooth Device connected...');
    return;
  }
  log('Disconnecting from Bluetooth Device...');
  if (bleDevice.gatt.connected) {
    bleDevice.gatt.disconnect();
    log('> Bluetooth Device connected: ' + bleDevice.gatt.connected);
  } else {
    log('> Bluetooth Device is already disconnected');
  }
}
  
function handleNotifyButton3(event) {
  button3count += 1;
  log('Notification triggered by Button 3');
  document.getElementById("btn3").innerHTML = button3count;
}

function handleNotifyButton4(event) {
  button4count += 1;
  log('Notification triggered by Button 4');
  document.getElementById("btn4").innerHTML = button4count;
}

function log(text) {
    console.log(text);
    document.querySelector('#log').textContent += text + '\n';
}
/*  BLE Configuration Service
    deviceNameCharacteristicUUID - write/write without response - max 10 byte - ascii string
    advertisingParamCharacteristicUUID - write/write without response - 3 bytes - uint16_t adv interval in ms - uint8_t adv timeout in s
    appearanceCharacteristicUUID - write/write without response - 2 bytes - uint16_t appearance
    connectionParamCharacteristicUUID - write/write without response - 8 bytes - uint16_t min conn interval - uint16_t max conn interval - uint16_t slave latency - uint16_t supervision timeout
*/
var configurationServiceUUID = 'ef680001-9b35-4933-9b10-52ffa9740042';
var deviceNameCharacteristicUUID = 'EF680002-9B35-4933-9B10-52FFA9740042';
var advertisingParamCharacteristicUUID = 'EF680003-9B35-4933-9B10-52FFA9740042';
var appearanceCharacteristicUUID = 'EF680004-9B35-4933-9B10-52FFA9740042';
var connectionParamCharacteristicUUID = 'EF680005-9B35-4933-9B10-52FFA9740042';

/*  Weather Station Service
    temperatureCharacteristicUUID - notify/read - 2 bytes - uint8_t integer - uint8_t decimal
    pressureCharacteristicUUID - notify/read - 5 bytes - int32_t integer - uint8_t decimal
    humidityCharacteristicUUID - notify/read - 1 byte - uint8_t 
    configurationCharacteristicUUID - write/write without response - 7 bytes - uint16_t temp interval in ms - uint16_t pressure interval in ms - uint16_t humidity interval in ms - uint8_t pressure mode (0=barometer, 1=altimeter)
*/
var weatherStationServiceUUID = '20080001-e36f-4648-91c6-9e86ead38764';
var temperatureCharacteristicUUID = '20080002-e36f-4648-91c6-9e86ead38764';
var pressureCharacteristicUUID = '20080003-e36f-4648-91c6-9e86ead38764';
var humidityCharacteristicUUID = '20080004-e36f-4648-91c6-9e86ead38764';
var configurationCharacteristicUUID = '20080005-e36f-4648-91c6-9e86ead38764';

/*  User Interface Service
    ledCharacteristicUUID - write/read - 4 bytes - uint32_t - LED ID - Red - Green - Blue (LSB)
    buttonCharacteristicUUID - write/read - 2 bytes - uint16_t - Button 2 state - Button 1 state (LSB)
*/
var userInterfaceServiceUUID = 'C7AE0001-3266-4A5C-859F-0F4799146BB5';
var ledCharacteristicUUID = 'C7AE0002-3266-4A5C-859F-0F4799146BB5';
var buttonCharacteristicUUID = 'C7AE0003-3266-4A5C-859F-0F4799146BB5';

var isConnecting = false;
var isConnected = false;
var sInterval;
var sTimeout;
var humidity;
var temperature;
var pressure;
var bleDevice;
var bleServer;
var bleService;
var pressureChar;
var humidityChar;
var temperatureChar;
var pressureString;
var humidityString;
var temperatureString;

window.onload = function(){
  document.querySelector('#connect').addEventListener('click', getAll);
  document.querySelector('#disconnect').addEventListener('click', stopAll);
};

function log(text) {
    document.querySelector('#log').textContent += text + '\n';
    console.log(text);
}

function setConnecting(connecting) {
    isConnecting = connecting;
    if (connecting) {
        document.querySelector('#connect').style.display = "none";
    } 
    else {
        document.querySelector('#connect').style.display = "float";
    }
}

function setConnected(connected) {
    isConnected = connected;
    if (connected) {
        document.querySelector('#connect').style.display = "none";
        document.querySelector('#disconnect').style.display = "float";
    } 
    else {
        document.querySelector('#connect').style.display = "float";
        document.querySelector('#disconnect').style.display = "none";
        sServer.disconnect();
    }
}

function getAll() {
  'use strict'
  if (!navigator.bluetooth) {
      log('Web Bluetooth API is not available.\n' +
          'Please make sure the Web Bluetooth flag is enabled.');
      return;
  }
  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [configurationServiceUUID]}]})
  .then(device => device.connectGATT())
  .then(server => { 
    bleServer = server;
    return server.getPrimaryService(weatherStationServiceUUID);
  })
  .then(service => {
    return Promise.all([
      service.getCharacteristic(pressureCharacteristicUUID)
      .then(handlePressure),
      service.getCharacteristic(humidityCharacteristicUUID)
      .then(handleHumidity),
      service.getCharacteristic(temperatureCharacteristicUUID)
      .then(handleTemperature)
    ])
    .then(startCloudLogging())
    .catch(error => {
    log('> getAll() ' + error);
    });
  });
}
  
function handlePressure(characteristic){
  log('> handlePressure()');
  pressureChar = characteristic;
  characteristic.addEventListener('characteristicvaluechanged',handleNotifyPressure);
  return characteristic.startNotifications();
}

function handleTemperature(characteristic){
  log('> handleTemperature()');
  temperatureChar = characteristic;
  characteristic.addEventListener('characteristicvaluechanged',handleNotifyTemperature);
  return characteristic.startNotifications();
}

function handleHumidity(characteristic){
  log('> handleHumidity()');
  humidityChar = characteristic;
  characteristic.addEventListener('characteristicvaluechanged',handleNotifyHumidity);
  return characteristic.startNotifications();
}


function stopAll() {
  log('> stopAll()');
  if (pressureChar) {
    pressureChar.stopNotifications().then(() => {
      pressureChar.removeEventListener('characteristicvaluechanged',handleNotifyPressure);
      log('> Pressure notifications stopped');
    });
  }
  if (humidityChar) {
    humidityChar.stopNotifications().then(() => {
      humidityChar.removeEventListener('characteristicvaluechanged', handleNotifyHumidity);
      log('> Humidity notifications stopped');
    });
  }
  if (temperatureChar) {
    temperatureChar.stopNotifications().then(() => {
      temperatureChar.removeEventListener('characteristicvaluechanged',handleNotifyTemperature);
      log('> Temperature notifications stopped');
    });
  }
  stopCloudLogging();
  // Disconnect only for Chrome OS 50+
  //log('Disconnecting from Bluetooth Device...');
  //if (bleServer) {
  //  if (bleServer.connected) {
  //    bleServer.disconnect();
  //    log('Bluetooth Device connected: ' + bleServer.connected);
  //  } else {
  //    log('Bluetooth Device is already disconnected');
  //  }
}

function handleNotifyHumidity(event) {
  let value = event.target.value;
  value = value.buffer ? value : new DataView(value);
  humidity_int = value.getUint8(0);
  humidityString = humidity_int.toString();
  log('Humidity is ' + humidity_int + '%');
  document.getElementById("humidity_reading").innerHTML = humidity_int +"%";
}

function handleNotifyTemperature(event) {
  let value = event.target.value;
  value = value.buffer ? value : new DataView(value);
  temperature_int = value.getUint8(0);
  temperature_dec = value.getUint8(1);
  temperatureString = temperature_int.toString() + '.' + temperature_dec.toString();
  log('Temperature is ' + temperature_int + '.' + temperature_dec + 'C');
  document.getElementById("temperature_reading").innerHTML = temperature_int + '.' + temperature_dec + '&deg;C';
}

function handleNotifyPressure(event) {
  let value = event.target.value;
  value = value.buffer ? value : new DataView(value);
  pressure_pascal = value.getInt32(0, true);
  pressure_kpascal = pressure_pascal / 1000;
  pressure_decimal = value.getUint8(4);
  pressureString = pressure_kpascal.toString();
  log('Pressure is ' + pressure_kpascal + 'kPa');
  document.getElementById("pressure_reading").innerHTML = pressure_kpascal + 'kPa';
}

// Swap byte order of 32bit value
function swap32(val) {
    return ((val & 0xFF) << 24)
           | ((val & 0xFF00) << 8)
           | ((val >> 8) & 0xFF00)
           | ((val >> 24) & 0xFF);
}

function stop(event) {
    log("stop(" + event + ")");
    try {
        sCharacteristic.writeValue(new Uint8Array([0, 0, 0, 0, 0, 0]));
        event.preventDefault();
    } catch (error) {
        log(error);
    }
}

function disconnectDevice(){
  document.querySelector('#connect').style.display = "block";
  document.querySelector('#disconnect').style.display = "none";
  sServer.disconnect();
  log("Disconnected.");
}
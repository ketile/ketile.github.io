/*  BLE Configuration Service
    deviceNameCharacteristic - write/write without response - max 10 byte - ascii string
    advertisingParamCharacteristic - write/write without response - 3 bytes - uint16_t adv interval in ms - uint8_t adv timeout in s
    appearanceCharacteristic - write/write without response - 2 bytes - uint16_t appearance
    connectionParamCharacteristic - write/write without response - 8 bytes - uint16_t min conn interval - uint16_t max conn interval - uint16_t slave latency - uint16_t supervision timeout
*/
var configurationService = 'ef680001-9b35-4933-9b10-52ffa9740042';
var deviceNameCharacteristic = 'EF680002-9B35-4933-9B10-52FFA9740042';
var advertisingParamCharacteristic = 'EF680003-9B35-4933-9B10-52FFA9740042';
var appearanceCharacteristic = 'EF680004-9B35-4933-9B10-52FFA9740042';
var connectionParamCharacteristic = 'EF680005-9B35-4933-9B10-52FFA9740042';

/*  Weather Station Service
    temperatureCharacteristic - notify/read - 2 bytes - uint8_t integer - uint8_t decimal
    pressureCharacteristic - notify/read - 3 bytes - uint16_t integer - uint8_t decimal
    humidityCharacteristic - notify/read - 1 byte - uint8_t 
    configurationCharacteristic - write/write without response - 7 bytes - uint16_t temp interval in ms - uint16_t pressure interval in ms - uint16_t humidity interval in ms - uint8_t pressure mode (0=barometer, 1=altimeter)
*/
var weatherStationService = '20080001-e36f-4648-91c6-9e86ead38764';
var temperatureCharacteristic = '20080002-e36f-4648-91c6-9e86ead38764';
var pressureCharacteristic = '20080003-e36f-4648-91c6-9e86ead38764';
var humidityCharacteristic = '20080004-e36f-4648-91c6-9e86ead38764';
var configurationCharacteristic = '20080005-e36f-4648-91c6-9e86ead38764';

/*  User Interface Service
    ledCharacteristic - write/read - 4 bytes - uint32_t - LED ID - Red - Green - Blue (LSB)
    buttonCharacteristic - write/read - 2 bytes - uint16_t - Button 2 state - Button 1 state (LSB)
*/
var userInterfaceService = 'C7AE0001-3266-4A5C-859F-0F4799146BB5';
var ledCharacteristic = 'C7AE0002-3266-4A5C-859F-0F4799146BB5';
var buttonCharacteristic = 'C7AE0003-3266-4A5C-859F-0F4799146BB5';

var isConnecting = false;
var isConnected = false;
var sInterval;
var sTimeout;
var sServer;
var Device;
var GATT;
var myCharacteristic;
var myService;
var humidity;
var temperature;
var pressure;
var bleDevice;
var bleServer;
var bleService;

window.onload = function(){
  document.querySelector('#connect').addEventListener('click', getAll);
  document.querySelector('#disconnect').addEventListener('click', disconnectDevice);
  document.querySelector('#disconnect').style.display = "hide";
  document.querySelector('#humidity').addEventListener('click', getHumidity);
  document.querySelector('#temperature').addEventListener('click', getTemperature);
  document.querySelector('#pressure').addEventListener('click', getPressure);
};

function log(text) {
    document.querySelector('#log').textContent += text + '\n';
}

function setConnecting(connecting) {
    isConnecting = connecting;
    if (connecting) {
        document.querySelector('#connect').style.display = "none";
    } 
    else {
        document.querySelector('#connect').style.display = "block";
    }
}

function setConnected(connected) {
    isConnected = connected;
    if (connected) {
        document.querySelector('#connect').style.display = "none";
        document.querySelector('#disconnect').style.display = "block";
    } 
    else {
        document.querySelector('#connect').style.display = "block";
        document.querySelector('#disconnect').style.display = "none";
        sServer.disconnect();
    }
}

function connect() {
    'use strict';

    if (!navigator.bluetooth) {
        log('Web Bluetooth API is not available.\n' +
            'Please make sure the Web Bluetooth flag is enabled.');
        return;
    }

    if (isConnecting) {
        log('Connecting. Please wait.');
        return;
    }

    log('Requesting Bluetooth Device...');

    setConnecting(true);
    navigator.bluetooth.requestDevice({
        filters: [{
            services:[weatherStationService]
        }]
    })
    .then(device => {
        log('Device name: ' + device.name);
        log('Gatt server UUIDs: ' + device.uuids);
        connect2(device, 0);
    })
    .catch(error => {
        setConnecting(false);
        log(error);
    });
}

function connect2(device, retryCount) {
    'use strict';

    device.connectGATT()
    .then(server => {
        log('Got GATT server');
        sServer = server;
        return server.getPrimaryService(weatherStationService);
    })
    .then(service => {
        log('Got service');
        return service.getCharacteristic(humidityCharacteristic);
     })
    .then(characteristic => {
        log('Got characteristic');
        setConnecting(false);
        setConnected(true);
        myCharacteristic = characteristic;
        return myCharacteristic.startNotifications();
    })
    .then(() => {
          log('Notifications started');
          myCharacteristic.addEventListener('characteristicvaluechanged', 'handleNotifications');
    })
    .catch(error => {
        log(error);
        if (retryCount < 5) {
            log('Retrying...');
            connect2(device, retryCount + 1);
        } else {
            setConnecting(false);
        }
    });
}

function getHumidity() {
  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [weatherStationService]}]})
  .then(device => device.connectGATT())
  .then(server => server.getPrimaryService(weatherStationService))
  .then(service => service.getCharacteristic(humidityCharacteristic))
  .then(characteristic => {
    humidity = characteristic;
    return humidity.startNotifications().then(() => {
      log('> Notifications started');
      humidity.addEventListener('characteristicvaluechanged',
        handleNotifyHumidity);
    });
  })
  .catch(error => {
    log('Argh! ' + error);
  });
}

function getTemperature() {
  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [weatherStationService]}]})
  .then(device => device.connectGATT())
  .then(server => server.getPrimaryService(weatherStationService))
  .then(service => service.getCharacteristic(temperatureCharacteristic))
  .then(characteristic => {
    temperature = characteristic;
    return temperature.startNotifications().then(() => {
      log('> Notifications started');
      temperature.addEventListener('characteristicvaluechanged',
        handleNotifyTemperature);
    });
  })
  .catch(error => {
    log('Argh! ' + error);
  });
}

function getPressure() {
  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [weatherStationService]}]})
  .then(device => device.connectGATT())
  .then(server => server.getPrimaryService(weatherStationService))
  .then(service => service.getCharacteristic(pressureCharacteristic))
  .then(characteristic => {
    pressure = characteristic;
    return pressure.startNotifications().then(() => {
      log('> Notifications started');
      pressure.addEventListener('characteristicvaluechanged',
        handleNotifyPressure);
    });
  })
  .catch(error => {
    log('Argh! ' + error);
  });
}

function getAll() {
  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [weatherStationService]}]})
  .then(device => { 
    logObject(device);
    bleDevice = device;
    logObject(bleDevice);
    device.connectGATT();
    return server;
  })
  .then(server => {
    bleServer = server;
    server.getPrimaryService(weatherStationService);
    return server;
  })
  .then(service => {
    bleService = service;
    service.getCharacteristic(pressureCharacteristic);
    return characteristic;
  })
  .then(characteristic => {
    pressure = characteristic;
    return pressure.startNotifications().then(() => {
      log('> Notifications started');
      pressure.addEventListener('characteristicvaluechanged',
        handleNotifyPressure);
    });
  })
  .catch(error => {
    log('Argh! ' + error);
  });
}

function onStopButtonClick() {
  if (myCharacteristic) {
    myCharacteristic.stopNotifications().then(() => {
      log('> Notifications stopped');
      myCharacteristic.removeEventListener('characteristicvaluechanged',
        handleNotifications);
    });
  }
}

function handleNotifyHumidity(event) {
  let value = event.target.value;
  value = value.buffer ? value : new DataView(value);
  humidity_int = value.getUint8(0);
  log('Humidity is ' + humidity_int + '%');
  document.getElementById("humidity_reading").innerHTML = humidity_int +"%";
  logObject(event);
}

function handleNotifyTemperature(event) {
  let value = event.target.value;
  value = value.buffer ? value : new DataView(value);
  temperature_int = value.getUint8(0);
  temperature_dec = value.getUint8(1);
  log('Temperature is ' + temperature_int + '.' + temperature_dec + 'C');
  document.getElementById("temperature_reading").innerHTML = temperature_int + '.' + temperature_dec + 'C';
}

function handleNotifyPressure(event) {
  let value = event.target.value;
  pressure_pascal = value.getInt32(0);
  pressure_pascal = swap32(pressure_pascal);
  pressure_decimal = value.getUint8(4);
  log('Pressure is ' + pressure_pascal + '.' + pressure_decimal + 'Pa');
  document.getElementById("pressure_reading").innerHTML = pressure_pascal + 'Pa';
  
  let a = [];
  // Convert raw data bytes to hex values just for the sake of showing something.
  // In the "real" world, you'd use data.getUint8, data.getUint16 or even
  // TextDecoder to process raw data bytes.
  for (var i = 0; i < value.byteLength; i++) {
    a.push(('00' + value.getUint8(i).toString(16)).slice(-2));
  }
  log('> ' + a.join(''));
}

// Swap byte order of 32bit value
function swap32(val) {
    return ((val & 0xFF) << 24)
           | ((val & 0xFF00) << 8)
           | ((val >> 8) & 0xFF00)
           | ((val >> 24) & 0xFF);
}

function logObject(obj){
  // Logging property names and values using Array.forEach
  Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
    log(val + ' -> ' + obj[val]);
  });
}

function move(event, direction) {
    log("move(" + event + ", " + direction + ")");
    try {
        switch (direction) {
        case "forward":
            sCharacteristic.writeValue(new Uint8Array([1, 0, 0, 0, 0, 0]));
            break;
        case "backward":
            sCharacteristic.writeValue(new Uint8Array([0, 1, 0, 0, 0, 0]));
            break;
        case "left":
            sCharacteristic.writeValue(new Uint8Array([0, 0, 1, 0, 0, 0]));
            break;
        case "right":
            sCharacteristic.writeValue(new Uint8Array([0, 0, 0, 1, 0, 0]));
            break;
        case "up":
            sCharacteristic.writeValue(new Uint8Array([0, 0, 0, 0, 1, 0]));
            break;
        case "down":
            sCharacteristic.writeValue(new Uint8Array([0, 0, 0, 0, 0, 1]));
            break;
        }
        event.preventDefault();
    } catch (error) {
        setConnected(false);
        log(error);
    }
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
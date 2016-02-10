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
var humidityCharacteristic;

window.onload = function(){
  document.querySelector('#connect').addEventListener('click', connect);
  document.querySelector('#disconnect').addEventListener('click', disconnectDevice);
  document.querySelector('#disconnect').style.display = "hide";
  document.querySelector('#humidity').addEventListener('click', getHumidity);
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
        return service.getCharacteristic(temperatureCharacteristic);
     })
    .then(characteristic => {
        log('Got characteristic');
        humidityCharacteristic = characteristic;
        setConnecting(false);
        setConnected(true);
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

function getHumidity(){
  log('Getting humidity...');
  try {
    humidity = humidityCharacteristic.readValue();
    humidity = humidity.buffer ? value : new DataView(value);
    log('Humidity is ' + humidity.getUint8(0) + '%');
  } catch (error) {
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
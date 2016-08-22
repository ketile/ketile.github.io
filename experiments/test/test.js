window.onload = function(){

// Configuration
const configurationServiceUUID    = 'ef680001-9b35-4933-9b10-52ffa9740042';
const deviceNameUUID              = 'ef680002-9b35-4933-9b10-52ffa9740042';
const advertisingParametersUUID   = 'ef680003-9b35-4933-9b10-52ffa9740042';
const appearanceUUID              = 'ef680004-9b35-4933-9b10-52ffa9740042';
const connectionParametersUUID    = 'ef680005-9b35-4933-9b10-52ffa9740042';
const eddystoneUrlUUID            = 'ef680006-9b35-4933-9b10-52ffa9740042';
const cloudTokenUUID              = 'ef680007-9b35-4933-9b10-52ffa9740042';

// Weather Station
const weatherStationServiceUUID     = '20080001-e36f-4648-91c6-9e86ead38764';
const temperatureUUID               = '20080002-e36f-4648-91c6-9e86ead38764';
const pressureUUID                  = '20080003-e36f-4648-91c6-9e86ead38764';
const humidityUUID                  = '20080004-e36f-4648-91c6-9e86ead38764';
const gasUUID                       = '20080005-e36f-4648-91c6-9e86ead38764';
const colorUUID                     = '20080006-e36f-4648-91c6-9e86ead38764';
const weatherConfigurationUUID      = '20080007-e36f-4648-91c6-9e86ead38764';

// User Interface
const userInterfaceServiceUUID      = 'c7ae0001-3266-4a5c-859f-0f4799146bb5';
const ledUUID                       = 'c7ae0002-3266-4a5c-859f-0f4799146bb5';
const buttonUUID                    = 'c7ae0003-3266-4a5c-859f-0f4799146bb5';

// Motion
const motionServiceUUID             = '35310001-4b14-43f1-932e-06a86910429a';
const motionConfigurationUUID       = '35310002-4b14-43f1-932e-06a86910429a';
const tapUUID                       = '35310003-4b14-43f1-932e-06a86910429a';
const orientationUUID               = '35310004-4b14-43f1-932e-06a86910429a';
const quaternionUUID                = '35310005-4b14-43f1-932e-06a86910429a';
const pedometerUUID                 = '35310006-4b14-43f1-932e-06a86910429a';
const rawDataUUID                   = '35310007-4b14-43f1-932e-06a86910429a';
const eulerUUID                     = '35310008-4b14-43f1-932e-06a86910429a';
const rotationMatrixUUID            = '35310009-4b14-43f1-932e-06a86910429a';
const headingUUID                   = '3531000A-4b14-43f1-932e-06a86910429a';
const gravityVectorUUID             = '3531000B-4b14-43f1-932e-06a86910429a';

// Common
var bleDevice;
var bleServer;
var bleService;

// Characteristics
var deviceNameCharacteristic;
var advertisingParametersCharacteristic;
var appearanceCharacteristic;
var connectionParametersCharacteristic;
var eddystoneUrlCharacteristic;
var cloudTokenCharacteristic;

var temperatureCharacteristic;
var pressureCharacteristic;
var humidityCharacteristic;
var gasCharacteristic;
var colorCharacteristic;
var weatherConfigurationCharacteristic;

var ledCharacteristic;
var buttonCharacteristic;

var motionConfigurationCharacteristic;
var tapCharacteristic;
var orientationCharacteristic;
var quaternionCharacteristic;
var pedometerCharacteristic;
var rawDataCharacteristic;
var eulerCharacteristic;
var rotationMatrixCharacteristic;
var headingCharacteristic;
var gravityVectorCharacteristic;

var connect = document.getElementById("connect");
var startTest = document.getElementById("start-test");
var log = document.getElementById("log");

connect.addEventListener("click", connectBLE);
startTest.addEventListener("click", testBLE);

// Connect to BLE device, server and services
function connectBLE(){

  if (!navigator.bluetooth) {
      alert('> Web Bluetooth API is not available.\n' +
          '  Please make sure the Web Bluetooth\n' +
          '  flag is enabled.');
      return;
  }
    else{
        alert('connectBLE');
    }

  log('> Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [configurationServiceUUID, weatherStationServiceUUID, userInterfaceServiceUUID, motionServiceUUID]}]})
  .then(device => {
      bleDevice = device;
      log('  BLE Device OK');
      return device.gatt.connect();
  })
  .then(server => {
      bleServer = server;
      log('  BLE Server OK');
      return server.getPrimaryService(configurationServiceUUID);
  })
  .then(service => {
      log('  BLE Service OK');
      bleService = service;
  })
    .catch(error => {
      log('> Connect: ' + error);
  });
}

// Test characteristics
function testBLE(){
    
 bleService.getCharacteristic(deviceNameUUID)
  .then(characteristic => {
      deviceNameCharacteristic = characteristic;
      log('  Device Name Characteristic OK');
  })
.then(() => {
      bleService.getCharacteristic(advertisingParametersUUID)
  })
  .then(characteristic => {
      advertisingParametersCharacteristic = characteristic;
      log('  Advertising Parameters Characteristic OK');
  })
.then(() => {
      return bleService.getCharacteristic(appearanceUUID);
  })
  .then(characteristic => {
      appearanceCharacteristic = characteristic;
      log('  Appearance Characteristic OK');
  })
}

function log(message){
    console.log(message);
    var content = document.createTextNode(message);
    log.appendChild(content);
}

}
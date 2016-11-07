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
const headingUUID                   = '3531000a-4b14-43f1-932e-06a86910429a';
const gravityVectorUUID             = '3531000b-4b14-43f1-932e-06a86910429a';

// Common
var bleDevice;
var bleServer;
var bleConfigurationService;
var bleWeatherStationService;
var bleUserInterfaceService;
var bleMotionService;

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

var allCharacteristics;
var lastNotification;
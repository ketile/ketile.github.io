      // Configuration
      const configurationServiceUUID    = 'ef680100-9b35-4933-9b10-52ffa9740042';
      const deviceNameUUID              = 'ef680101-9b35-4933-9b10-52ffa9740042';
      const advertisingParametersUUID   = 'ef680102-9b35-4933-9b10-52ffa9740042';
      const connectionParametersUUID    = 'ef680104-9b35-4933-9b10-52ffa9740042';
      const eddystoneUrlUUID            = 'ef680105-9b35-4933-9b10-52ffa9740042';
      const cloudTokenUUID              = 'ef680106-9b35-4933-9b10-52ffa9740042';
      const firmwareVersionUUID         = 'ef680107-9b35-4933-9b10-52ffa9740042';

      // Environment
      const weatherStationServiceUUID     = 'ef680200-9b35-4933-9b10-52ffa9740042';
      const temperatureUUID               = 'ef680201-9b35-4933-9b10-52ffa9740042';
      const pressureUUID                  = 'ef680202-9b35-4933-9b10-52ffa9740042';
      const humidityUUID                  = 'ef680203-9b35-4933-9b10-52ffa9740042';
      const gasUUID                       = 'ef680204-9b35-4933-9b10-52ffa9740042';
      const colorUUID                     = 'ef680205-9b35-4933-9b10-52ffa9740042';
      const weatherConfigurationUUID      = 'ef680206-9b35-4933-9b10-52ffa9740042';

      // User Interface
      const userInterfaceServiceUUID      = 'ef680300-9b35-4933-9b10-52ffa9740042';
      const ledUUID                       = 'ef680301-9b35-4933-9b10-52ffa9740042';
      const buttonUUID                    = 'ef680302-9b35-4933-9b10-52ffa9740042';

      // Motion
      const motionServiceUUID             = 'ef680400-9b35-4933-9b10-52ffa9740042';
      const motionConfigurationUUID       = 'ef680401-9b35-4933-9b10-52ffa9740042';
      const tapUUID                       = 'ef680402-9b35-4933-9b10-52ffa9740042';
      const orientationUUID               = 'ef680403-9b35-4933-9b10-52ffa9740042';
      const quaternionUUID                = 'ef680404-9b35-4933-9b10-52ffa9740042';
      const pedometerUUID                 = 'ef680405-9b35-4933-9b10-52ffa9740042';
      const rawDataUUID                   = 'ef680406-9b35-4933-9b10-52ffa9740042';
      const eulerUUID                     = 'ef680407-9b35-4933-9b10-52ffa9740042';
      const rotationMatrixUUID            = 'ef680408-9b35-4933-9b10-52ffa9740042';
      const headingUUID                   = 'ef680409-9b35-4933-9b10-52ffa9740042';
      const gravityVectorUUID             = 'ef68040a-9b35-4933-9b10-52ffa9740042';  
      
      // Sound 
      const soundServiceUUID              = 'ef680500-9b35-4933-9b10-52ffa9740042';
      const soundConfigurationUUID        = 'ef680501-9b35-4933-9b10-52ffa9740042';
      const speakerUUID                   = 'ef680502-9b35-4933-9b10-52ffa9740042';
      const microphoneUUID                = 'ef680503-9b35-4933-9b10-52ffa9740042';

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
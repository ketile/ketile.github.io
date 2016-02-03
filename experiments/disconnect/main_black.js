document.addEventListener('WebComponentsReady', function() {

  //var BLEDevice = document.querySelector('platinum-bluetooth-device');
  //var characteristic = document.querySelector('platinum-bluetooth-characteristic');
  var btnConnect = document.querySelector("#Connect"); // Bruk ID i HTML og "#somename" syntax for å skille mellom knapper
  var btnDispense  = document.querySelector("#Dispense");
  var btnDisconnect = document.querySelector("#disconnect");
  
  var BLEDevice = document.getElementById('custom-device');
  var characteristic = BLEDevice.querySelector('[characteristic=a6c31338-6c07-453e-961a-d8a8a41bf368]');
  
  var numDispense = 0;
  
  var gameOverBtn = document.querySelector("#showModal");
  var gameOverDialog = document.querySelector("#gameOver");
  
  gameOverBtn.addEventListener('click', function() {
    gameOverDialog.open();
    console.log('Dialog opened');
  });
  
  btnDisconnect.addEventListener('click', function() {
    updateStatus('Disconnect clicked for ' + BLEDevice.name);
    BLEDevice.disconnect();
    console.log('Disconnected ' + BLEDevice);
  });
  
  // Connect on button press *****************************************************
  btnConnect.addEventListener('click', function() {
    progressBar(1);
    console.log('Requesting a bluetooth device advertising custom 128-bit UUID service...');
    updateStatus('Requesting BLE Device...');
    BLEDevice.request().then(function(device) {
      console.log('A bluetooth device has been found!');
      console.log('Device Name: ' + device.name);
      updateStatus('Found ' + device.name);
      
      // Neccessary to avoid delay on first button press
      var characteristicData = BLEDevice.querySelector('platinum-bluetooth-characteristic');
      return characteristicData.read().then(function(value) {
      console.log('Custom characteristic value is ' + data.getUint8(0) );
      updateStatus('Characteristic read. Ready to play!');
      progressBar(0);
      });
    })
    .catch(function(error) {
      updateStatus('ERROR ', error);
      console.error('Argh! ', error);
    });
  });
  
  // Give me candy button functionality *****************************************************
  
  btnDispense.addEventListener('touchstart', function() {
    var characteristicData = BLEDevice.querySelector('platinum-bluetooth-characteristic');
    var newData = new Uint8Array([1, 0, 0, 0, 0, 0]);
    return characteristicData.write(newData).then(function() {
      console.log('Characteristic was written: ' + newData);
      updateStatus(newData);
    })
    .catch(function(error) {
      console.error('Argh! ', error);
      updateStatus('ERROR ', error);
    });
  });
  
  btnDispense.addEventListener('touchend', function() {
      console.log('Delay 150ms');
      setTimeout(function(){
        var characteristicData = BLEDevice.querySelector('platinum-bluetooth-characteristic');
        var newData = new Uint8Array([0, 0, 0, 0, 0, 0]);
        return characteristicData.write(newData).then(function() {
          console.log('Characteristic was written: ' + newData);
          updateStatus(newData);
      });
    }, 150); // delay to avoid uncaught button actions
  });
});

function updateStatus(newContent){
  document.querySelector("#statusMessage").innerHTML = newContent;
}

function progressBar(status){
  var myDiv = document.querySelector("#progress");
  if(status === 0){
    myDiv.setAttribute('class', 'hidden');
  }
  else{
    myDiv.setAttribute('class', 'visible');
  }
}

window.onload = progressBar(0);


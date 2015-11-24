document.addEventListener('WebComponentsReady', function() {

  var BLEDevice = document.querySelector('platinum-bluetooth-device');

  var btnConnect = document.querySelector("#Connect"); // Bruk ID i HTML og "#somename" syntax for å skille mellom knapper
  
  var btnDispense  = document.querySelector("#Dispense");

  var characteristic = document.querySelector('platinum-bluetooth-characteristic');
  
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
      console.error('Argh! ', error);
    });
  });
  
  // Give me candy button functionality *****************************************************
  
  btnDispense.addEventListener('mousedown', function() {
    var characteristicData = BLEDevice.querySelector('platinum-bluetooth-characteristic');
    var newData = new Uint8Array([1, 0, 0, 0, 0, 0]);
    return characteristicData.write(newData).then(function() {
      console.log('Characteristic was written: ' + newData);
      updateStatus(newData);
    })
    .catch(function(error) {
      console.error('Argh! ', error);
    });
  });
  
  btnDispense.addEventListener('mouseup', function() {
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


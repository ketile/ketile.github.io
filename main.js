document.addEventListener('WebComponentsReady', function() {

var globalState = new Uint8Array([0,0,0,0,0,0]);

  var BLEDevice = document.querySelector('platinum-bluetooth-device');
  //var button = document.querySelector('paper-button');
  var button = document.querySelector("#myButton"); // Bruk ID i HTML og "#somename" syntax for å skille mellom knapper
  
  var btnForward  = document.querySelector("#Forward");
  var btnBack     = document.querySelector("#Back");
  var btnLeft     = document.querySelector("#Left");
  var btnRight    = document.querySelector("#Right");
  var btnUp       = document.querySelector("#Up");
  var btnDown     = document.querySelector("#Down");
  
  var characteristic = document.querySelector('platinum-bluetooth-characteristic');
  
  button.addEventListener('click', function() {
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
      var data = new DataView(value);
      console.log('Custom characteristic value is ' + data.getUint8(0) );
      updateStatus('Characteristic read. Ready to play!');
      progressBar(0);
      });
    })
    .catch(function(error) {
      console.error('Argh! ', error);
      updateStatus('Error', error);
    });
  });
  
  // Forward button functionality *****************************************************
  
  btnForward.addEventListener('mousedown', function() {
    
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
  
  btnForward.addEventListener('mouseup', function() {
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
    
    // Back button functionality *****************************************************
  
    btnBack.addEventListener('mousedown', function() {
      
      var characteristicData = BLEDevice.querySelector('platinum-bluetooth-characteristic');
      var newData = new Uint8Array([0, 1, 0, 0, 0, 0]);
      return characteristicData.write(newData).then(function() {
        console.log('Characteristic was written: ' + newData);
        updateStatus(newData);
      });
    });
  
      btnBack.addEventListener('mouseup', function() {
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
  
  // Left button functionality *****************************************************
  btnLeft.addEventListener('mousedown', function() {
    var characteristicData = BLEDevice.querySelector('platinum-bluetooth-characteristic');
    var newData = new Uint8Array([0, 0, 1, 0, 0, 0]);
    return characteristicData.write(newData).then(function() {
      console.log('Characteristic was written: ' + newData);
      updateStatus(newData);
    });
  });
  
  btnLeft.addEventListener('mouseup', function() {
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
  
  // Right button functionality *****************************************************
  btnRight.addEventListener('mousedown', function() {
    var characteristicData = BLEDevice.querySelector('platinum-bluetooth-characteristic');
    var newData = new Uint8Array([0, 0, 0, 1, 0, 0]);
    return characteristicData.write(newData).then(function() {
      console.log('Characteristic was written: ' + newData);
      updateStatus(newData);
    });
  });
  
  btnRight.addEventListener('mouseup', function() {
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
  
  // Up button functionality *****************************************************
  btnUp.addEventListener('mousedown', function() {
    var characteristicData = BLEDevice.querySelector('platinum-bluetooth-characteristic');
    var newData = new Uint8Array([0, 0, 0, 0, 1, 0]);
    return characteristicData.write(newData).then(function() {
      console.log('Characteristic was written: ' + newData);
      updateStatus(newData);
    });
  });
  
  btnUp.addEventListener('mouseup', function() {
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
  
  // Down button functionality *****************************************************
  btnDown.addEventListener('mousedown', function() {
    var characteristicData = BLEDevice.querySelector('platinum-bluetooth-characteristic');
    var newData = new Uint8Array([0, 0, 0, 0, 0, 1]);
    return characteristicData.write(newData).then(function() {
      console.log('Characteristic was written: ' + newData);
      updateStatus(newData);
    });
  });
  
  btnDown.addEventListener('mouseup', function() {
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


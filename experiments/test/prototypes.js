function startNotification(characteristic){
    // start notifications for the given characteristic
    characteristic.startNotifications();
}

function stopNotification(characteristic){
    // stop notifications for the given characteristic
    characteristic.stopNotifications();
}

function handleNotificationData(characteristic, dataFormat){
    // generic callback for handling notification data from a characteristic
    // the array input contains information on how many bytes and how they should be read
}

function registerCharacteristic(serviceUUID, characteristicUUID){
    // generic function for registering a characteristic belonging to a specific service
}

function createEventHandler(){
    var genericEventHandler = function (event){
        logRawHexValues(event);
    }
    return genericEventHandler;
}

function logRawHexValues(event){
      let value = event.target.value;
      let a = [];
      // Convert raw data bytes to hex values just for the sake of showing something.
      // In the "real" world, you'd use data.getUint8, data.getUint16 or even
      // TextDecoder to process raw data bytes.
      for (let i = 0; i < value.byteLength; i++) {
        a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
      }
      log('> ' + a.join(' ') + '(Bytewise reversed)');
}

function notificationTest(characteristic){
    
    // 1a. create event handler function for given characteristic
    var characteristicEventHandler = createEventHandler();
    
    // 1b. register the event handler
    characteristic.addEventListener('characteristicvaluechanged', characteristicEventHandler);
    
    // 2. start notifications for given characteristic
    startNotification(characteristic);
    
    // 3a. log data as raw hex values
    //    this is performed in the event handler
    
    // 3b. log metadata about the characteristic itself
    log('> Testing Characteristic UUID: ' + characteristic.uuid);  

    // 4. let some time pass...
    
    // 5. stop notifications for given characteristic
    stopNotification(characteristic);
    
    // event handler is destroyed when function is exited
}

function stopAllNotifications(allCharacteristics){
    // run over an array containing all characteristics
    allCharacteristics.forEach(function(item, index, array){
        // check if characteristic supports notifications
        if(item.properties.notify){
            item.stopNotifications();
            log("> Stopping notifications for UUID: " + item.uuid);
        }  
    })
}
function log(message){
    console.log(message);
//    var linebreak = document.createElement('br');
//    logs.appendChild(linebreak);
//    var content = document.createTextNode(message);
//    logs.appendChild(content);
}

function logProperties(characteristic){
    log('> UUID:                 ' + characteristic.uuid);
    log('> Broadcast:            ' + characteristic.properties.broadcast);
    log('> Read:                 ' + characteristic.properties.read);
    log('> Write w/o response:   ' +
      characteristic.properties.writeWithoutResponse);
    log('> Write:                ' + characteristic.properties.write);
    log('> Notify:               ' + characteristic.properties.notify);
    log('> Indicate:             ' + characteristic.properties.indicate);
    log('> Signed Write:         ' +
      characteristic.properties.authenticatedSignedWrites);
    log('> Queued Write:         ' + characteristic.properties.reliableWrite);
    log('> Writable Auxiliaries: ' +
      characteristic.properties.writableAuxiliaries);
    log('> Value (cached):       ' + characteristic.value);
    log(' ');
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
      log('> ' + a.join(' ') + ' (raw data)');
      document.getElementById("display-raw-data").innerHTML = a.join(' ');
      a.reverse();
      log('> ' + a.join(' ') + ' (bytewise reversed)');
      document.getElementById("display-reversed-data").innerHTML = a.join(' ');
}
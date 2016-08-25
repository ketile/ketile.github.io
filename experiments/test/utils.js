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
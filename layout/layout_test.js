document.addEventListener('DOMContentLoaded', function(){
  
  var buttonUp  = document.querySelector("#up");
  var buttonDown  = document.querySelector("#down");
  var buttonLeft  = document.querySelector("#left");
  var buttonRight  = document.querySelector("#right");

  buttonUp.addEventListener('touchstart', function() {
    console.log('Up was pressed');
  });
  
  buttonDown.addEventListener('touchstart', function() {
    console.log('Down was pressed');
  });
  
  buttonLeft.addEventListener('touchstart', function() {
    console.log('Left was pressed');
  });
  
  buttonRight.addEventListener('touchstart', function() {
    console.log('Right was pressed');
  });
  
  buttonUp.addEventListener('touchend', function() {
    console.log('Up was released');
  });
  
  buttonDown.addEventListener('touchend', function() {
    console.log('Down was released');
  });
  
  buttonLeft.addEventListener('touchend', function() {
    console.log('Left was released');
  });
  
  buttonRight.addEventListener('touchend', function() {
    console.log('Right was released');
  });
}, false);

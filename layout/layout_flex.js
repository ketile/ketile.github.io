
// Wait till page is loaded before resizing

document.addEventListener('DOMContentLoaded', function(){
  
  var buttonUp  = document.querySelector("#up");
  var buttonDown  = document.querySelector("#down");
  var buttonLeft  = document.querySelector("#left");
  var buttonRight  = document.querySelector("#right");
  
  // Get usable device screen dimensions

  deviceWidth = Math.min(window.innerWidth, window.outerWidth);
  deviceHeight = Math.min(window.innerHeight, window.outerHeight);
  
  // Print values to console
  
  console.log('Width: ' + deviceWidth);   
  console.log('Height: ' + deviceHeight);
  

}, false);
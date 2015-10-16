var b = require('bonescript');
var state1 = 0;
var state2 = 0;
var state3 = 0;
var state4 = 0;

//Input pins
b.pinMode('P8_11', b.INPUT);
b.pinMode('P8_13', b.INPUT);
b.pinMode('P8_15', b.INPUT);
b.pinMode('P8_19', b.INPUT);

//Output Pins
b.pinMode('P9_11', b.OUTPUT);
b.pinMode('P9_13', b.OUTPUT);
b.pinMode('P9_15', b.OUTPUT);
b.pinMode('P9_17', b.OUTPUT);

setInterval(check,100);

function check(){
b.digitalRead('P8_11', checkButton1);
b.digitalRead('P8_13', checkButton2);
b.digitalRead('P8_15', checkButton3);
b.digitalRead('P8_19', checkButton4);
}

var state1 = 0;
var state2 = 0;
var state3 = 0;
var state4 = 0;

//Functions that checks if the buttons have been pressed
//and turns led on/off accordingly
function checkButton1(x) {
  if(x.value == 1){
    if(state1 == 0) state1 = 1;
    else state1 = 0;
    b.digitalWrite('P9_11', state1);
  }
}

function checkButton2(x) {
   if(x.value == 1){
    if(state2 == 0) state2 = 1;
    else state2 = 0;
    b.digitalWrite('P9_13', state2);
  }
}

function checkButton3(x) {
  if(x.value == 1){
    if(state3 == 0) state3 = 1;
    else state3 = 0;
    b.digitalWrite('P9_15', state3);
  }
}

function checkButton4(x) {
  if(x.value == 1){
    if(state4 == 0) state4 = 1;
    else state4 = 0;
    b.digitalWrite('P9_17', state4);
  }
} 
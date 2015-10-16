var b = require('bonescript');
var state = b.LOW;

var button1 = 'P9_11';
var button2 = 'P9_12';

var LED1 = 'P9_13';
var LED2 = 'P9_14';

//Input pins
b.pinMode(button1, b.INPUT);
b.pinMode(button2, b.INPUT);

//Output Pin
b.pinMode(LED1, b.OUTPUT);

setInterval(check,100);

function check(){
b.digitalRead(button1, ON);
b.digitalRead(button2, OFF);
}
LED1//Function that checks if the button have been pressed
//and turns led on
function ON(x) {
  if(x.value === 1){
    state = 1;
    b.digitalWrite(LED1, state);
  }
}

//Function that checks if the button have been pressed
//and turns led off 
function OFF(x) {
  if(x.value === 1){
    state = 0;
    b.digitalWrite(LED1, state);
  }
}

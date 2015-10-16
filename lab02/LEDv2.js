var b = require('bonescript');
var i;
var state = b.LOW;
var button1 = 'P9_11';
var LED1 = 'P9_13';

//Seting up buttons as Input pins
b.pinMode(button1, b.INPUT);

//Seting up LEDs as Output pins
b.pinMode(LED1, b.OUTPUT);

setInterval(check,100);

function check(){
b.digitalRead(button1, blink10times);
}


//Function that checks if the buttons have been pressed
//and turns led on 10 times then stops
function blink10times(x) {
  if(x.value === 1){
    for(i=0;i<20;i++){
	if (state === b.LOW)
		state = b.HIGH;
	else 
		state = b.LOW;
    b.digitalWrite(LED1, state);
    }
  }
}
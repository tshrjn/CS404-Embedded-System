var b = require('bonescript');
var state = 0;

var button1 = 'P8_11';
var button2 = 'P9_12';

var LED1 = 'P9_13';
var LED2 = 'P9_14';

//Seting up buttons as Input pins
b.pinMode( buttton1, b.INPUT);
b.pinMode( button2, b.INPUT);

//Output Pins
b.pinMode(LED1, b.OUTPUT);
b.pinMode(LED2, b.OUTPUT);

setInterval(check,100);

function check(){

b.digitalRead( buttton1, glow1);
b.digitalRead( buttton1, glowBoth);

b.digitalRead( button2, glow1);
b.digitalRead( button2, glowBoth);
}


//Function that checks if any button have been pressed
//and turns led on/off accordingly
var high = 100,low=0;
function glow1(x) {
  if(x.value === 1){
    var randomInt = Math.floor(Math.random() * (high - low) + low);
    if (randomInt % 2)
      b.digitalWrite(LED1, b.HIGH);
    else
      b.digitalWrite(LED2, b.HIGH);

  }
}

//Function that checks if both the buttons have been pressed
//and turns led on/off accordingly
function glowBoth(x) {
  if(x.value === 1){
    	if(state === 1){
    		b.digitalWrite(LED2, b.HIGH);
		state = 0;	
	}
	else state = 1;
  }
  else  state = 0;
}
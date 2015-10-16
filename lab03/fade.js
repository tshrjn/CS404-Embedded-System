var b = require('bonescript');

// Initial conditions
var val = 0.01;
var dir = 1;
var Led1= "P9_14";
var LED2= "P9_16";

//Seting up LEDs as  Analog Output pins
b.pinMode(Led1, b.ANALOG_OUTPUT);
b.pinMode(LED2, b.ANALOG_OUTPUT);


// function fade is called every 10ms
setInterval(fade, 10);

// function to update brightness
function fade() {

 b.analogWrite(Led1, val);
 b.analogWrite(LED2, val);
 
 val = val + (dir*0.02);
 
 if(val > 1.0) { val= 1; dir = -1; }
 else if(val <= 0.01) { val = 0.01; dir = 1;}
}


var b = require('bonescript');

var Led1= "P9_14";
var LED2= "P9_16";

var pot = 'P9_36';

//Seting up LEDs as  Analog Output pins
b.pinMode(Led1, b.ANALOG_OUTPUT);
b.pinMode(LED2, b.ANALOG_OUTPUT);


// function check is called every 100ms
setInterval(check, 100);

function check(){
b.analogRead(pot, updateBrightness );
}

function updateBrightness(x) {
    //console.log('x.value = ' + x.value.toFixed(3));
    b.analogWrite(Led1, x.value);
    b.analogWrite(LED2, x.value);
}
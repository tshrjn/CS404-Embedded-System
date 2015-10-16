var b = require('bonescript');
var util = require('util');

var analogVoltage = 0;

/* Check the sensor values every 2 seconds*/
setInterval(read, 2000);

function read(){
    b.analogRead('P9_40', printStatus);
}

function printStatus(x) {

    var distanceInches;
    analogVoltage = x.value*1.8; // ADC Value converted to voltage
    console.log('x.value = ' + analogVoltage); 
    distanceInches = 5*(analogVoltage / 0.0083195);
    console.log(util.inspect(x));
    console.log("There is an object " + parseFloat(distanceInches).toFixed(3) + " inches away.");
    console.log("or " + (2.54*parseFloat(distanceInches).toFixed(3)) + " centimetres away.");

}
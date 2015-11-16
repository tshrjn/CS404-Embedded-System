var b = require('bonescript');
var button = "P9_42";

var tempSensor = "P9_33";
b.pinMode(button, b.OUTPUT);

b.attachInterrupt(button,true,b.RISING,readTemp);

function readTemp(x){
	b.analogRead(tempSensor,printTemp);
}
function printTemp(x){
	console.log(x);
	var temp = 100*x - 17;
	console.log("Temp is " + temp.toFixed(1) +"C")
}
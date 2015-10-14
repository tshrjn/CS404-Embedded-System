#!/usr/bin/env node
var b = require('bonescript');

var button = ['P9_12','P9_14', 'P9_16', 'P9_18'];
var LED = ['P9_11','P9_13', 'P9_15', 'P9_17'];
var clearbutton = 'P9_22';

//  Setting I/O modes for Pair of LEDs & buttons
for (var i = 0; i < 4; i++){
    // will run 4 times
    b.pinMode(LED[i], b.OUTPUT);
    b.pinMode(button[i], b.INPUT, 7, 'pulldown');
}

b.pinMode(clearbutton, b.INPUT, 7, 'pulldown');

for (var i = 0; i < 4; i++){
    // will run 4 times
	b.attachInterrupt(button[i], true,b.CHANGE, function(){
		if( x === 1)
			b.digitalWriteLED[this.i], b.HIGH);
		else
			b.digitalWriteLED[this.i], b.LOW);
	});
}.bind( {i: i})
	
	b.attachInterrupt(clearbutton, true,b.CHANGE, clear);

function clear(x)(x) {
	for (var i = 0; i < 4; i++){
    	// will run 4 times
		b.digitalWrite(LED[i], b.LOW);
	}		
}

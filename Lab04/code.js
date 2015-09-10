#!/usr/bin/env node

var b = require('bonescript');
var button1 = 'P9_13'; //Left 	Button
var button2 = 'P9_11'; //Right	Button
var button3 = 'P9_29'; //Down 	Button
var button4 = 'P9_31'; //Up 	Button

b.pinMode(button, b.INPUT, 7, 'pulldown');
b.attachInterrupt(button1, true, b.CHANGE, printStatus);
b.pinMode(button, b.INPUT, 7, 'pulldown');
b.attachInterrupt(button2, true, b.CHANGE, printStatus);
b.pinMode(button, b.INPUT, 7, 'pulldown');
b.attachInterrupt(button3, true, b.CHANGE, printStatus);
b.pinMode(button, b.INPUT, 7, 'pulldown');
b.attachInterrupt(button4, true, b.CHANGE, printStatus);
 

function printStatus(x) 
{
	console.log('x.value = ' + x.value);
	console.log('x.err = ' + x.err);
}
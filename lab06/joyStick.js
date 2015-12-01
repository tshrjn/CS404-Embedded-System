#! /usr/bin/env node
var b = require('bonescript');

var selPin = "P9_15";
var horzPin = "P9_33";
var vertPin = "P9_35";
var time = 1000;


b.pinMode(selPin, b.INPUT);
b.attachInterrupt(selPin, true, b.CHANGE, interruptCallback);

setInterval(horzRead, time);
setInterval(vertRead, time);

function horzRead() {
    console.log("Horz Read: " + b.analogRead(horzPin).toFixed(2));
}

function vertRead() {
    console.log("Vert Read: " + b.analogRead(vertPin).toFixed(2));
}

function interruptCallback(obj) {
    if(!obj.attached) {
        console.log("Button pressed!");
    }
    
}
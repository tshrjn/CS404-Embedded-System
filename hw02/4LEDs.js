#!/usr/bin/env node

var b = require('bonescript');
var state = b.LOW;
var button1,button2,button3,button4 ;

//1st Pair of LED & button
b.pinMode("P9_11", b.OUTPUT);
b.pinMode("P9_12", b.INPUT);

//2nd Pair of LED & button
b.pinMode("P9_13", b.OUTPUT);
b.pinMode("P9_14", b.INPUT);

//3rd Pair of LED & button
b.pinMode("P9_15", b.OUTPUT);
b.pinMode("P9_16", b.INPUT);

//4th Pair of LED & button
b.pinMode("P9_17", b.OUTPUT);
b.pinMode("P9_18", b.INPUT);
setInterval(check1, 0.25);


function check1(){
    b.digitalRead("P9_12",checkButton1);
}
function check2(x) {
  button1 = x.value;
  b.digitalRead("P9_14",checkButton2);
}
function check3(y) {
  button2 = y.value;
  b.digitalRead("P9_16",checkButton3);
}
function check4(z) {
  button3 = z.value;
  b.digitalRead("P9_18",lightingUpLEDs);
}
function lightingUpLEDs(w) {
  button4 = w.value;
  
  //1st pair
  if(button1 == 1)
    b.digitalWrite("P9_11", b.HIGH);
  else
    b.digitalWrite("P9_11", b.LOW);
  
  //2nd pair
  if(button2 == 1)
    b.digitalWrite("P9_13", b.HIGH);
  else
    b.digitalWrite("P9_13", b.LOW);
  
  //3rd pair
  if(button3 == 1)
    b.digitalWrite("P9_15", b.HIGH);
  else
    b.digitalWrite("P9_15", b.LOW);

  //4th pair
  if(button4 == 1)
    b.digitalWrite("P9_17", b.HIGH);
  else
    b.digitalWrite("P9_17", b.LOW);
}
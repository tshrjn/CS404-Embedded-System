#!/usr/bin/env node
/************************************ETCH-A-SKETCH*********************************
 *  Authors: Tushar Jain, Gopal Krishan Aggarwal
 *  Roll No: B13236, B13121
 *  Date: 15 November, 2015
 *  Description: Following code implements etch-a-sketch on a 8X8 I2C LED Matrix
 *              with eraser, invisiblemode, colour switching, clear matrix functionalities.
 *              The code requires to provide initial position as command-line arguments
 *              and 3rd argument as the colour of the first LED that will turn on.
 *              The project also gives an option to find out current position of the 'cursor'
 **********************************************************************************/

var b = require('bonescript');
var port = '/dev/i2c-2'; //LEDMatrix is connected to I2C-2
var matrix = 0x70; //I2CDetect detects matrix at location 0x70

b.i2cOpen(port, matrix);
b.i2cWriteByte(port, 0x21); //Start Oscillator (p10)
b.i2cWriteByte(port, 0x81); //Disp on, blink off (p11)
b.i2cWriteByte(port, 0xe7); //Full brightness

var colour = parseFloat(process.argv[4]); //0 implies Green and 1 implies red
var debounce = 300; //in milliseconds
/************************Set Initial Position*********************/
var x, y; //Co-ordinate x,y maintains current position of 'cursor'
x = process.argv[2];
y = process.argv[3];
//Note:The even bytes are Green, the odd ones are Red
console.log("Value of x is: " + x);
console.log("Value of y is: " + y);
console.log("Value of colour is: " + colour);
var ledMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
ledMatrix[2 * x + colour] |= 0x01 << y; //Taking bottom-left of the ledMatrix as (0,0)
b.i2cWriteBytes(port, 0x00, ledMatrix); //Write the initial position on matrix


/************************Set Colour Switch***********************/
//Var colour declared above
var colourSwitch = "P8_12";
var colourDebounceTime = [0, 0];
b.pinMode(colourSwitch, b.INPUT, 7, 'pulldown');
b.attachInterrupt(colourSwitch, true, b.FALLING, colourSwitchAction);

function colourSwitchAction(x) {
    var t = 0;
    t = process.hrtime(colourDebounceTime);
    if (x.attached) {
        colourDebounceTime = process.hrtime();
    }

    if (!x.attached && (t[0] * 1000 + t[1] / 1000000 > debounce)) {
        colour = (colour == 0) ? 1 : 0;
        console.log("New colour is " + colour);
    }
    colourDebounceTime = process.hrtime();
}

/************************Set Eraser Mode*******************/
var eraserMode = 0; //Eraser mode by default off
var eraserModeSwitch = "P9_15";
var eraserModeTime = [0, 0];
b.pinMode(eraserModeSwitch, b.INPUT, 7, 'pulldown');
b.attachInterrupt(eraserModeSwitch, true, b.FALLING, eraserModeSwitchAction);

function eraserModeSwitchAction(xyz) {
    var t = 0;
    t = process.hrtime(eraserModeTime);
    if (xyz.attached) {
        eraserModeTime = process.hrtime();
    }
    if (!xyz.attached && (t[0] * 1000 + t[1] / 1000000 > debounce)) {
        eraserMode = (eraserMode == 0) ? 1 : 0;
        eraserMode ? console.log("Eraser mode on!") : console.log("Eraser mode off");
    }
    eraserModeTime = process.hrtime();
}

/************************Set Invisible-Switch*******************/
var invisible = parseFloat(0);
var invisibleMovementSwitch = "P8_11";
var invisibleDebounceTime = [0, 0];
b.pinMode(invisibleMovementSwitch, b.INPUT, 7, 'pulldown');
b.attachInterrupt(invisibleMovementSwitch, true, b.FALLING, invisibleMovementSwitchAction);

function invisibleMovementSwitchAction(xyz) {
        var t = 0;
        t = process.hrtime(invisibleDebounceTime);
        if (xyz.attached) {
            invisibleDebounceTime = process.hrtime();
        }
        if (!xyz.attached && (t[0] * 1000 + t[1] / 1000000 > debounce)) {
            invisible = (invisible == 0) ? 1 : 0;
            invisible ? console.log("Going invisible!") : console.log("Visible mode activated!");
        }
        invisibleDebounceTime = process.hrtime();
    }
    //Option to go to eraser mode
    //Option to just erase red
    /************************Set Clear Switch***********************/
var clearSwitch = "P8_14";
var clearDebounceTime = [0, 0];
b.pinMode(clearSwitch, b.INPUT, 7, 'pulldown');
b.attachInterrupt(clearSwitch, true, b.FALLING, clearSwitchAction);

function clearSwitchAction(obj) {
        var t = 0;
        t = process.hrtime(clearDebounceTime);
        if (obj.attached) {
            clearDebounceTime = process.hrtime();
        }
        if (!obj.attached && (t[0] * 1000 + t[1] / 1000000 > debounce)) {
            console.log("clrSwitch pressed");
            for (var i = 0; i < 16; i++) {
                ledMatrix[i] = 0x00;
                b.i2cWriteBytes(port, 0x00, ledMatrix);
            }
        }
        currentDebounceTime = process.hrtime();
    }
    /************************Finding out Current position***********************/
var existingColumnState = [0x00, 0x00];
var currentStateSwitch = "P8_13";
var currentdebounceTime = [0, 0];
b.pinMode(currentStateSwitch, b.INPUT, 7, 'pulldown');
b.attachInterrupt(currentStateSwitch, true, b.FALLING, currentStateSwitchAction);

function currentStateSwitchAction(obj) {
    var t = 0;
    t = process.hrtime(currentdebounceTime);
    if (obj.attached) {
        currentdebounceTime = process.hrtime();
    }
    if (!obj.attached && (t[0] * 1000 + t[1] / 1000000 > debounce)) {
        console.log("Button Pressed!");
        existingColumnState[0] = ledMatrix[2 * x];
        //existingColumnState[1] = ledMatrix[2*x + 1];
        if ((ledMatrix[2 * x] >> y) & (0x01) == 1) {
            console.log("Green LED on here");
            ledMatrix[2 * x] &= (~(0x01 << y));
            console.log(~(0x01 << y));
            b.i2cWriteBytes(port, 0x00, ledMatrix);
            ledMatrix[2 * x] = existingColumnState[0];
            setTimeout(function() {
                b.i2cWriteBytes(port, 0x00, ledMatrix);
            }, 1000);
        }
        else {
            console.log("Green off on here");
            ledMatrix[2 * x] |= 0x01 << y;
            b.i2cWriteBytes(port, 0x00, ledMatrix);
            ledMatrix[2 * x] = existingColumnState[0]
            setTimeout(function() {
                b.i2cWriteBytes(port, 0x00, ledMatrix);
            }, 1000);
        }
        //b.i2cWriteBytes(port, 0x00, ledMatrix);
    }
    currentdebounceTime = process.hrtime();
}

/*************************Set Joystick************************/
var horzPin = "P9_33";
var vertPin = "P9_35";

setInterval(horzVertRead, 1); //Check vert and horz values as fast as possible

var currHorzValue;
var currVertValue;

var middleHorz = 1; //By default assumed to be at middle
var middleVert = 1; //By default assumed to be at middle
var up = "up";
var down = "down";
var left = "left";
var right = "right";
function horzVertRead() {
    currHorzValue = b.analogRead(horzPin);
    currVertValue = b.analogRead(vertPin);

    if(middleVert == 1 && (currVertValue > 0.95 || currVertValue < 0.05)) {
        if(currVertValue > 0.95)
            updateMatrix(up);
        else if(currVertValue < 0.05)
            updateMatrix(down);
    }
   if(middleHorz == 1 && (currHorzValue > 0.95 || currHorzValue < 0.05)) {
        if(currHorzValue > 0.95)
            updateMatrix(left);
        else if(currHorzValue < 0.05)
            updateMatrix(right);
    }


    if(currHorzValue > 0.05 && currHorzValue < 0.95) {
        middleHorz = 1;
    }
    else middleHorz = 0;
    if(currVertValue > 0.05 && currVertValue < 0.95) {
        middleVert = 1;
    }
    else middleVert = 0;

}

function updateMatrix(direction) {
    switch (direction) {
        case up:
                y = (parseFloat(y) + parseFloat(1)) % 8; //Loops around if y becomes larger than 7
                console.log("Going up");
            break;
        case down:
                y = (y == 0) ? (y + 7) : (y - 1); //Loops around if x becomes larger than 7
                console.log("Going Down");
            break;
        case right:
                x = (parseFloat(x) + parseFloat(1)) % 8; //Loops around if y becomes larger than 7
                console.log("Going Right");
            break;
        case left:
                x = (x == 0) ? (x + 7) : (x - 1); //Loops around if x becomes larger than 7
                console.log("Going Left");
            break;
    }
    console.log("X is " + x + " Y is " + y);
    if (!invisible) {
        if (!eraserMode)
            ledMatrix[2 * x + colour] |= 0x01 << y;
        else {
            ledMatrix[2 * x] &= (~(0x01 << y));
            ledMatrix[2 * x + 1] &= (~(0x01 << y));
        }
        b.i2cWriteBytes(port, 0x00, ledMatrix);
    }
    else console.log("Invisible Mode on.");
}
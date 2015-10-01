setTargetAddress('192.168.7.2', {
initialized: run
});

function run(){
var b = require('bonescript');
var gy-loc = 0x68;
var delay    = 1000;

b.i2cOpen(port, gy-loc);
b.i2cWriteBytes('/dev/i2c-2', 0x6b, [0]); // Waking up the device

setInterval(readInput, delay)

function readInput() {
    b.i2cReadBytes(port, 0x3b, 14, printStatus);
}
function PrintStatus(x) {
	if(x.event === 'return') {
$('#accelX').html(((x.return[0]<<8 | x.return[1])<<16)>>16));	$('#accelY').html(((x.return[2]<<8 | x.return[3])<<16)>>16));
$('#accelZ').html(((x.return[4]<<8 | x.return[5])<<16)>>16));

$('#temp').html((((x.return[6]<<8 | x.return[7])<<16)>>16)/340+36.53);	

$('#gyroX').html(((x.return[8]<<8 | x.return[9])<<16)>>16));	$('#gyroY').html(((x.return[10]<<8 | x.return[12])<<16)>>16));
$('#gyroZ').html(((x.return[12]<<8 | x.return[13])<<16)>>16));

	}
}
}
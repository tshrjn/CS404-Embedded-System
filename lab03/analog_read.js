var b = require('bonescript');

setInterval(reader, 100);
function reader(){
b.analogRead('P9_36', printStatus);
}

function printStatus(x) {
    console.log('x.value = ' + x.value.toFixed(3));
}

var b = require('bonescript');
var state = b.LOW;

b.pinMode('P9_11', b.OUTPUT);

setInterval(toggle, 1000);

function toggle() {
    if(state === b.LOW) state = b.HIGH;
    else state = b.LOW;
    b.digitalWrite('P9_11', state);
}
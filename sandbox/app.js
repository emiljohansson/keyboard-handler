'use strict';

const keyboard = require('./');

keyboard.keyPressed(function(e) {
    // console.log('pressed', e.which);
});

keyboard.keyReleased(function(e) {
    // console.log('released', e.which);
});

keyboard.keyIsDown(keyboard.codes.up, function(e) {
    // console.log('isdown', e.which);
});

keyboard.keysAreDown([69, 81, 87], function() {
    // console.log('combination');
});

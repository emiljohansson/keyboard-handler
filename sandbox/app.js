'use strict';

const keyboard = require('../');

keyboard.keyPressed(function(e) {
    // console.log('pressed', e.key, e.keyCode);
});

keyboard.keyReleased(function(e) {
    // console.log('released', e.key, e.keyCode);
});

keyboard.keyIsDown(keyboard.codes.up, function(e) {
    // console.log('isdown', e.key, e.keyCode);
});

keyboard.keysAreDown([69, 81, 87], function() {
    // console.log('combination');
});

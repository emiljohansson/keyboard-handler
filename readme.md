# keyboard-handler [![Build Status](https://travis-ci.org/emiljohansson/keyboard-handler.svg?branch=master)](https://travis-ci.org/emiljohansson/keyboard-handler)

> Single handler for all keyboard events.

## Install

```
$ npm install --save keyboard-handler
```

## Usage

```js
var keyboard = require('keyboard-handler');
keyboard.keyPressed((e) {
    console.log(e.which);
});
// => 27
```

## API

### keysAreDown(codes, cb)

Calls `cb` if all `codes` are held down.

#### codes

Type: `array`

#### cb

Type: `function`

### keyIsDown(code, cb)

Calls `cb` when a certain key `code` is pressed.

#### code

Type: `number`

#### cb

Type: `function`

### keyPressed(cb)

Calls `cb` when any key is pressed.

#### cb

Type: `function`

### keyReleased(cb)

Calls `cb` when any key is released.

#### cb

Type: `function`

## License

MIT © [Emil Johansson](http://emiljohansson.se)

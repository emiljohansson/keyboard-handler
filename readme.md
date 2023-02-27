# keyboard-handler [![Build Status](https://travis-ci.org/emiljohansson/keyboard-handler.svg?branch=master)](https://travis-ci.org/emiljohansson/keyboard-handler) [![npm version](https://img.shields.io/npm/v/keyboard-handler.svg)](https://www.npmjs.com/package/keyboard-handler) [![Coverage Status](https://img.shields.io/coveralls/emiljohansson/keyboard-handler/master.svg)](https://coveralls.io/r/emiljohansson/keyboard-handler?branch=master)

> Single handler for all browser keyboard events.

Appends a single listener for keyboard events, using the `document.addEventListener` function. See the API section for available helper functions, when key(s) are pressed and released.

## Install

```
$ npm install --save keyboard-handler
```

or

```
$ pnpm add keyboard-handler
```

## Usage

```js
import * as keyboard from 'keyboard-handler'
keyboard.keyPressed(e => {
	console.log(e.key)
})
// => 27
```

## API

### keysAreDown(keys, cb)

Calls `cb` if all `keys` are held down.

#### keys

Type: `array`

#### cb

Type: `function`

### keyIsDown(key, cb)

Calls `cb` when a certain key `key` is pressed.

#### key

Type: `string`

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

MIT © [Emil Johansson](http://emiljohansson.dev)

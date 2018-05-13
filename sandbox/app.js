console.log('app')

const keyboard = require('../')

keyboard.keyPressed(e => {
  console.log('pressed', e.key, e.keyCode)
})

keyboard.keyReleased(e => {
  console.log('released', e.key, e.keyCode)
})

keyboard.keyIsDown(keyboard.codes.up, e => {
  console.log('isdown', e.key, e.keyCode)
})

// q+w+e
keyboard.keysAreDown([69, 81, 87], () => {
  console.log('combination')
})

import { keyPressed, keyReleased, keyIsDown, keysAreDown } from '../src/index'

const pressed = document.getElementById('pressed')
const released = document.getElementById('released')
const keyDown = document.getElementById('key-down')
const keysDown = document.getElementById('keys-down')

keyPressed(e => {
	pressed!.innerHTML = `keyPressed: ${e.key}`
})

keyReleased(e => {
	released!.innerHTML = `keyReleased: ${e.key}`
})

keyIsDown('ArrowUp', e => {
	keyDown!.innerHTML = `keyIsDown: ${e.key}`
})

keysAreDown(['Shift', 'E'], () => {
	keysDown!.innerHTML = `keysAreDown: Shift, E`
})

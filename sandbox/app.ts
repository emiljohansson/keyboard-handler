import { keyPressed, keyReleased, keyIsDown, keysAreDown } from '../src/index'

const pressed = document.getElementById('pressed') as HTMLInputElement
const released = document.getElementById('released') as HTMLInputElement
const keyDown = document.getElementById('key-down') as HTMLInputElement
const keysDown = document.getElementById('keys-down') as HTMLInputElement
const clearTexts = document.getElementById('clear-texts')

let onRemoveKeyPressed: () => void
let onRemoveKeyReleased: () => void
let onRemoveKeyIsDown: () => void
let onRemoveKeysAreDown: () => void

const addAllListeners = () => {
	onRemoveKeyPressed = keyPressed(e => {
		pressed!.value = `keyPressed: ${e.key}`
	})

	onRemoveKeyReleased = keyReleased(e => {
		released!.value = `keyReleased: ${e.key}`
	})

	onRemoveKeyIsDown = keyIsDown('ArrowUp', e => {
		keyDown!.value = `keyIsDown: ${e.key}`
	})

	onRemoveKeysAreDown = keysAreDown(['Shift', 'E'], () => {
		keysDown!.value = `keysAreDown: Shift, E`
	})
}

const removeAllListeners = () => {
	onRemoveKeyPressed()
	onRemoveKeyReleased()
	onRemoveKeyIsDown()
	onRemoveKeysAreDown()
}

clearTexts?.addEventListener('click', () => {
	pressed!.value = ''
	released!.value = ''
	keyDown!.value = ''
	keysDown!.value = ''
})

document.getElementById('add-events')?.addEventListener('click', addAllListeners)
document.getElementById('remove-events')?.addEventListener('click', removeAllListeners)
// document.getElementById('current-state')?.addEventListener('click', currentState)

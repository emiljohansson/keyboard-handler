import { keyPressed, keyReleased, keyIsDown, keysAreDown } from '../src/index'

const pressed = document.getElementById('pressed') as HTMLInputElement
const released = document.getElementById('released') as HTMLInputElement
const keyDown = document.getElementById('key-down') as HTMLInputElement
const keysDown = document.getElementById('keys-down') as HTMLInputElement
const clearTexts = document.getElementById('clear-texts')

const onRemoveKeyPressed = keyPressed(e => {
	pressed!.value = `keyPressed: ${e.key}`
})

const onRemoveKeyReleased = keyReleased(e => {
	released!.value = `keyReleased: ${e.key}`
})

const onRemoveKeyIsDown = keyIsDown('ArrowUp', e => {
	keyDown!.value = `keyIsDown: ${e.key}`
})

const onRemoveKeysAreDown = keysAreDown(['Shift', 'E'], () => {
	keysDown!.value = `keysAreDown: Shift, E`
})

clearTexts?.addEventListener('click', () => {
	console.log('clear')

	pressed!.value = ''
	released!.value = ''
	keyDown!.value = ''
	keysDown!.value = ''
})

document.getElementById('remove-events')?.addEventListener('click', () => {
	onRemoveKeyPressed()
	onRemoveKeyReleased()
	onRemoveKeyIsDown()
	onRemoveKeysAreDown()
})

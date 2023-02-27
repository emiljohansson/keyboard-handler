type EventTypes = 'keydown' | 'keyup'
type EventCallback = (event: KeyboardEvent) => void

const events: { [key in EventTypes]?: EventCallback[] } = {}
const keyCache: { [key: string]: boolean } = {}
let keyDownEvents: { [key: string]: EventCallback[] }

const onKeyIsDown = (event: KeyboardEvent) => {
	const callbacks = keyDownEvents[event.key]
	if (callbacks == null) {
		return
	}
	callbacks.forEach((callback) => callback(event))
}

const initEvent = (type: EventTypes) => {
	if (events[type]) {
		return
	}
	events[type] = []
	document.addEventListener(type, on(events[type]!))
}

const on = (eventCallbacks: EventCallback[]) => (event: KeyboardEvent) => {
	const type = event.type as EventTypes
	if (type === 'keydown') {
		keyCache[event.key] = true
	}
	if (type === 'keyup') {
		delete keyCache[event.key]
	}
	eventCallbacks.forEach((callback) => callback(event))
}

export const keysAreDown = (keys: string[], callback: () => void) => {
	initEvent('keyup')
	keyPressed(() => {
		if (!keys.every((key) => keyCache[key] === true)) return
		callback()
	})
}

export const keyIsDown = (key: string, callback: EventCallback) => {
	if (keyDownEvents) {
		if (!keyDownEvents[key]) {
			keyDownEvents[key] = [callback]
			return
		}
		keyDownEvents[key].push(callback)
		return
	}
	keyDownEvents = {}
	keyDownEvents[key] = [callback]
	keyPressed(onKeyIsDown)
}

export const keyPressed = (callback: EventCallback) => {
	initEvent('keydown')
	events['keydown']!.push(callback)
}

export const keyReleased = (callback: EventCallback) => {
	initEvent('keyup')
	events['keyup']!.push(callback)
}

type EventTypes = 'keydown' | 'keyup'
type EventCallback = (event: KeyboardEvent) => void

const events: { [key in EventTypes]?: Set<EventCallback> } = {}
const keyCache: { [key: string]: boolean } = {}
const addedEventListeners: { [key in EventTypes]?: (event: KeyboardEvent) => void } = {}
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
	events[type] = new Set()
	addedEventListeners[type] = on(events[type]!)
	document.addEventListener(type, addedEventListeners[type]!)
}

const on = (eventCallbacks: Set<EventCallback>) => (event: KeyboardEvent) => {
	const type = event.type as EventTypes
	if (type === 'keydown') {
		keyCache[event.key] = true
	}
	if (type === 'keyup') {
		delete keyCache[event.key]
	}
	eventCallbacks.forEach((callback) => callback(event))
}

const removeCallback = (type: EventTypes, callback: EventCallback) => () => {
	events[type]?.delete(callback)
	if (!events[type]?.size) {
		document.removeEventListener(type, addedEventListeners[type]!)
	}
}

export const keysAreDown = (keys: string[], callback: () => void) => {
	initEvent('keyup')
	return keyPressed(() => {
		if (!keys.every((key) => keyCache[key] === true)) return
		callback()
	})
}

export const keyIsDown = (key: string, callback: EventCallback) => {
	if (keyDownEvents) {
		if (!keyDownEvents[key]) {
			keyDownEvents[key] = [callback]
			return () => {}
		}
		keyDownEvents[key].push(callback)
		return () => {}
	}
	keyDownEvents = {}
	keyDownEvents[key] = [callback]
	return keyPressed(onKeyIsDown)
}

export const keyPressed = (callback: EventCallback) => {
	initEvent('keydown')
	events['keydown']!.add(callback)
	return removeCallback('keydown', callback)
}

export const keyReleased = (callback: EventCallback) => {
	initEvent('keyup')
	events['keyup']!.add(callback)
	return removeCallback('keyup', callback)
}

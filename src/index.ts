type EventTypes = 'keydown' | 'keyup'
type EventCallback = (event: KeyboardEvent) => void

const events: { [key in EventTypes]?: Set<EventCallback> } = {}
let keyCache: { [key: string]: boolean } = {}
const addedEventListeners: { [key in EventTypes]?: (event: KeyboardEvent) => void } = {}
const keyDownEvents: { [key: string]: Set<EventCallback> } = {}

const onKeyIsDown = (event: KeyboardEvent) => {
	if (!keyDownEvents[event.key]?.size) {
		return
	}
	const callbacks = keyDownEvents[event.key]
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
	const key = event.key.toLowerCase()

	if (type === 'keydown') {
		keyCache[event.key.toLowerCase()] = true
	}
	if (type === 'keyup') {
		if (key === 'meta') {
			keyCache = {}
		} else {
			delete keyCache[event.key.toLowerCase()]
		}
	}
	eventCallbacks.forEach((callback) => callback(event))
}

const removeCallback = (type: EventTypes, callback: EventCallback) => () => {
	events[type]?.delete(callback)
	if (!events[type]?.size) {
		document.removeEventListener(type, addedEventListeners[type]!)
		delete addedEventListeners[type]
		delete events[type]
	}
}

export const keysAreDown = (keys: string[], callback: () => void) => {
	initEvent('keyup')
	return keyPressed(() => {
		if (!keys.every((key) => keyCache[key.toLowerCase()] === true)) return
		callback()
	})
}

export const keyIsDown = (key: string, callback: EventCallback) => {
	if (!keyDownEvents[key]) {
		keyDownEvents[key] = new Set()
	}
	keyDownEvents[key].add(callback)
	const removeKeyPressed = keyPressed(onKeyIsDown)

	return () => {
		if (!keyDownEvents[key]) return
		keyDownEvents[key].delete(callback)
		removeKeyPressed()
		if (keyDownEvents[key].size < 1) {
			delete keyDownEvents[key]
		}
	}
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

// for testing
// export const currentState = () => {
// 	console.log('current state is:')
// 	console.log({
// 		events,
// 		keyCache,
// 		addedEventListeners,
// 		keyDownEvents,
// 	})
// }

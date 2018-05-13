const types = {
  down: 'keydown',
  up: 'keyup'
}
const events = {}
const codeCache = {}
let keyDownEvents

export const codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'control': 17,
  'alt': 18,
  'caps_lock': 20,
  'escape': 27,
  'space': 32,
  'page_up': 33,
  'page_down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'delete': 46
}

const getKey = event => event.keyCode || event.which

const onKeyIsDown = event => {
  const callbacks = keyDownEvents[getKey(event)]
  if (callbacks == null) {
    return
  }
  forEach(callbacks, bind(caller, event))
}

const bind = (cb, thisArg) => function () {
  const args = [...arguments]
  args.push(thisArg)
  cb.apply(thisArg, args)
}

const every = (array, predicate) => {
  const length = array.length
  let index = -1
  while (++index < length) {
    if (predicate(array[index]) === false) {
      return false
    }
  }
  return true
}

const forEach = (array, iteratee) => {
  const length = array.length
  let index = -1
  while (++index < length) {
    iteratee(array[index])
  }
}

const initEvent = type => {
  if (events[type]) {
    return
  }
  events[type] = []
  document.addEventListener(type, on(events[type]))
}

const on = array => event => {
  if (event.type === types.down) {
    codeCache[getKey(event)] = true
  }
  if (event.type === types.up) {
    delete codeCache[getKey(event)]
  }
  forEach(array, bind(caller, event))
}

const caller = (cb, event) => {
  cb(event)
}

export const keysAreDown = (codes, cb) => {
  initEvent(types.up)
  keyPressed(event => {
    if (!every(codes, code => {
      return codeCache[code] === true
    })) {
      return
    }
    cb()
  })
}

export const keyIsDown = (code, cb) => {
  if (keyDownEvents) {
    if (!keyDownEvents[code]) {
      keyDownEvents[code] = [cb]
      return
    }
    keyDownEvents[code].push(cb)
    return
  }
  keyDownEvents = {}
  keyDownEvents[code] = [cb]
  keyPressed(onKeyIsDown)
}

export const keyPressed = cb => {
  initEvent(types.down)
  events[types.down].push(cb)
}

export const keyReleased = cb => {
  initEvent(types.up)
  events[types.up].push(cb)
}

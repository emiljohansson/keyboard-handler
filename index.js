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

function getKey (event) {
  return event.keyCode || event.which
}

function onKeyIsDown (event) {
  var callbacks = keyDownEvents[getKey(event)]
  if (!callbacks) {
    return
  }
  forEach(callbacks, bind(caller, event))
}

function bind (cb, thisArg) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    args.push(thisArg)
    cb.apply(thisArg, args)
  }
}

function every (array, predicate) {
  var length = array.length
  var index = -1
  while (++index < length) {
    if (predicate(array[index]) === false) {
      return false
    }
  }
  return true
}

function forEach (array, iteratee) {
  var length = array.length
  var index = -1
  while (++index < length) {
    iteratee(array[index])
  }
}

function initEvent (type) {
  if (events[type]) {
    return
  }
  events[type] = []
  document.addEventListener(type, on(events[type]))
}

function on (array) {
  return function (event) {
    if (event.type === types.down) {
      codeCache[getKey(event)] = true
    }
    if (event.type === types.up) {
      delete codeCache[getKey(event)]
    }
    forEach(array, bind(caller, event))
  }
}

function caller (cb, event) {
  cb(event)
}

export const keysAreDown = function (codes, cb) {
  initEvent(types.up)
  keyPressed(function (event) {
    if (!every(codes, function (code) {
      return codeCache[code] === true
    })) {
      return
    }
    cb()
  })
}

export const keyIsDown = function (code, cb) {
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

export const keyPressed = function (cb) {
  initEvent(types.down)
  events[types.down].push(cb)
}

export const keyReleased = function (cb) {
  initEvent(types.up)
  events[types.up].push(cb)
}

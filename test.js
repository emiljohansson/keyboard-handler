import test from 'ava'
import sinon from 'sinon'
import keyboard from './'

global.document = require('jsdom').jsdom('<body></body>')
global.window = document.defaultView
global.navigator = window.navigator

function simulateKeyEvent (code, type, keyKey) {
  const KeyboardEventInit = {
    bubbles: true,
    cancelable: true,
    shiftKey: false
  }
  keyKey = keyKey || 'keyCode'
  KeyboardEventInit[keyKey] = code
  const e = new window.KeyboardEvent(type, KeyboardEventInit)
  document.dispatchEvent(e)
}

test('keyPressed calls callback', t => {
  const callback = sinon.spy()
  keyboard.keyPressed(callback)
  simulateKeyEvent(13, 'keydown')
  const actual = callback.called
  t.true(actual)

  simulateKeyEvent(13, 'keyup')
})

test('keyPressed passes event object', t => {
  const expected = 15
  keyboard.keyPressed(function (event) {
    const actual = event.keyCode
    t.is(actual, expected)
  })
  simulateKeyEvent(expected, 'keydown')
})

test('keyPressed passes event.which object', t => {
  const expected = 15
  keyboard.keyPressed(function (event) {
    const actual = event.which
    t.is(actual, expected)
  })
  simulateKeyEvent(expected, 'keydown', 'which')
})

test('keyReleased calls callback', t => {
  const callback = sinon.spy()
  keyboard.keyReleased(callback)
  simulateKeyEvent(13, 'keydown')
  simulateKeyEvent(13, 'keyup')
  const actual = callback.called
  t.true(actual)
})

test('keyIsDown calls callback', t => {
  const callback = sinon.spy()
  keyboard.keyIsDown(12, callback)
  keyboard.keyIsDown(13, callback)
  simulateKeyEvent(13, 'keydown')
  const actual = callback.callCount
  const expected = 1
  t.is(actual, expected)

  simulateKeyEvent(13, 'keyup')
})

test('keyIsDown calls callbacks', t => {
  const callback = sinon.spy()
  keyboard.keyIsDown(13, callback)
  keyboard.keyIsDown(13, callback)
  simulateKeyEvent(13, 'keydown')
  const actual = callback.callCount
  const expected = 2
  t.is(actual, expected)

  simulateKeyEvent(13, 'keyup')
})

test('keyIsDown NOT call callback', t => {
  const callback = sinon.spy()
  keyboard.keyIsDown(14, callback)
  simulateKeyEvent(13, 'keydown')
  const actual = callback.called
  t.false(actual)

  simulateKeyEvent(13, 'keyup')
})

test('keysAreDown calls callback', t => {
  const callback = sinon.spy()
  keyboard.keysAreDown([13, 14, 15], callback)
  simulateKeyEvent(13, 'keydown')
  simulateKeyEvent(14, 'keydown')
  simulateKeyEvent(15, 'keydown')
  const actual = callback.called
  const expected = true
  t.is(actual, expected)

  simulateKeyEvent(13, 'keyup')
  simulateKeyEvent(14, 'keyup')
  simulateKeyEvent(15, 'keyup')
})

test('keysAreDown NOT call callback', t => {
  const callback = sinon.spy()
  keyboard.keysAreDown([13, 14, 15], callback)
  simulateKeyEvent(13, 'keydown')
  simulateKeyEvent(15, 'keydown')
  const actual = callback.called
  const expected = false
  t.is(actual, expected)

  simulateKeyEvent(13, 'keyup')
  simulateKeyEvent(15, 'keyup')
})

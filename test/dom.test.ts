import {getBoundingClientRect} from '../src/core/dom'


test('getBoundingClientRect', () => {
  const div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.style.position = 'absolute'
  div.style.top = '100px'
  div.style.left = '100px'  
})
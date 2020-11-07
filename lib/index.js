// Original code from https://medium.com/@kosamari/how-to-be-a-compiler-make-a-compiler-with-javascript-4a8a13d473b4#.srhbdcq73
// Followed, Modified and enhanced.

import { Drawing } from './compiler'

const form      = document.getElementById('console')
const userInput = document.getElementById('user-input')
const result    = document.getElementById('generation')

const compiler = new Drawing()

const compile = event => {
  event.preventDefault()
  compiler.setValues(userInput.value, result)
  compiler.compile()
}

form.addEventListener('submit', compile)

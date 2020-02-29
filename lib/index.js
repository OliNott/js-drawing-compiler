import { Compiler } from './compiler'
import { lexicalAnalysis } from  './parser'

const consoleDrawer = document.getElementById('console')
const userInput = document.getElementById('user-input')
const drawing = document.getElementById('generation')

const analyseText = e => {
  e.preventDefault()
  console.log('Analyzing …')
  drawing.innerText = lexicalAnalysis(userInput.value)
}


consoleDrawer.addEventListener('submit', analyseText)

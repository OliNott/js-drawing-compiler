// Analyse the input of the user
// If it's a word, check if it is a valid keyword
// If it's a number
const RULE = {
  DRAWING: 'Drawing',
  WORD:    'word',
  NUMBER:  'number',
  PAPER:   'Paper'
}

const TYPE = {
  CALL:   'CallExpression',

  NUMBER: 'NumberLiteral',
  RGB:    'NumberLiteralRGB',
  COLOR:  'WordLiteralColor'
}

const COLORS = {
  red:   { red: 255, green: 0, blue: 0},
  green: { red: 0, green: 255, blue: 0 },
  blue:  { red: 0, green: 0, blue: 255 },
}

const parseColor = color => {
  // If single number, shade of grey of that number
  if (color.type === RULE.NUMBER) return { type: TYPE.NUMBER, value: color.value }
  // If word, may be color word or CSV RGB
  else if (color.type === RULE.WORD) {
    // RGB
    if (color.value.split(',').length === 3) return { type:  TYPE.RGB, value: color.value }
    // Color literal
    if (Objects.keys(COLORS).includes(color.value)) return { type: TYPE.RGB, value: COLORS[color.value] }
  }
  return { error: `${color.value} should be a color, but unable to parse` }
}

const handleError = error => document.getElementById('error').insertAdjacentElement('beforeend', error)

// DT is a Drawing Token
export const parser = toParse => {
  const DT = {
    type: RULE.DRAWING,
    body: []
  }

  // Since number token does not do anything by it self, we only analyze syntax when we find a word.
  toParse.forEach((currentToken, index) => {
    if (currentToken.type === RULE.WORD) {
        switch (currentToken.value) {
          case 'Paper':
            const expression = {
              type: TYPE.CALL,
              name: RULE.PAPER,
              arguments: []
            }
            // if current token is CallExpression of type Paper, next token or previous token should be color argument
            // const argument = toParse[index + 1]
            const colorBefore = parseColor(toParse[index - 1])
            if (colorBefore.error) {
              handleError(colorBefore.error)
              const colorAfter  = parseColor(toParse[index - 1])
              if (colorAfter.error) {
                handleError(colorBefore.error)
                break
              } else expression.arguments.push({
                    type: colorAfter.type,
                    value: colorAfter.value
                  })
            } else {
              expression.arguments.push({
                type: colorBefore.type,
                value: colorBefore.value
              })
            }

            // TODO : Handle different way of expressing  colors
            // Plus refactor horrible if/else above

            // DT.body.push(expression)    // push the expression object to body of our AST
            // if (argument.type === RULE.NUMBER) {
            //   expression.arguments.push({  // add argument information to expression object
            //     type: TYPE.NUMBER,
            //     value: argument.value
            //   })
            //   DT.body.push(expression)    // push the expression object to body of our AST
            // } else if (argument.type === RULE.WORD) {
            //   if (argument.value.split(',').length === 3) {
            //     expression.argument.push({
            //       type: 'NumberLiteral',
            //       value: argument.value
            //     })
            //   }
            // }
            // else {
            //   throw 'Paper command must be followed by a number.'
            // }
            break
        // case 'Pen':
        //   ...
        // case 'Line':
        //   ...
      }
    }
  })
  console.log('-------------')
  console.log('PARSER')
  console.table(DT)
  console.log('-------------')
  return DT
}

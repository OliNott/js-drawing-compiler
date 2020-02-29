// Analyse the input of the user
// If it's a word, check if it is a valid keyword
// If it's a number

const lexicalAnalysis = input => {
  const result = input.split(' ')
  .filter(word => word.length > 0)
  .map(value => {
    console.log(isNaN(value))
    let type = isNaN(value) ? 'word' : 'number'
    return { type, value }
  })
  console.table(result)
  return result
}

const parser = toParse => {

}

export { lexicalAnalysis, parser }

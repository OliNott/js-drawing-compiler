// Build an object of type and value for each word

const objectBuilder = val => {
  const type  = isNaN(val) ? 'word' : 'number'
  const value = val.toLowerCase()
  return  { type, value }
}

const lexicator = input => {
  return input.split(' ')
              .filter(word => word.length > 0)
              .map(objectBuilder)
}

export { lexicator }

export const transformer = ast => {
  const svgContainer = {
    tag: 'svg',
    attr: {
      width: 300, height: 300, viewBox: '0 0 300 300',
      xmlns: 'http://www.w3.org/2000/svg', version: '1.1'
    },
    body: []
  }

  const pen_color = 100 // default pen color is black

  ast.body.forEach(node => {
    console.log(node)
    switch (node.name) {
      case 'Paper':
        const paper_color = 100 - node.arguments[0].value
        svgContainer.body.push({ // add rect element information to svgContainer's body
          tag: 'rect',
          attr: {
            x: 0, y: 0,
            width: 300, height: 300,
            fill: 'rgb(' + paper_color + '%,' + paper_color + '%,' + paper_color + '%)'
          }
        })
        break
      case 'Pen':
        pen_color = 100 - node.arguments[0].value // keep current pen color in `pen_color` variable
        break
      // case 'Line':
        // ...
    }
  })
  console.log('-------------')
  console.log('TRANSFORMER')
  console.table(svgContainer)
  console.log('-------------')
  return svgContainer
}

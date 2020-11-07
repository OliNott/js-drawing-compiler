export const generator = svg_ast => {
  // create attributes string out of attr object
  // { "width": 100, "height": 100 } becomes 'width="100" height="100"'
  const createAttrString = (attr) => {
    return Object.keys(attr).map(function (key) {
      return key + '="' + attr[key] + '"'
    }).join(' ')
  }

  // top node is always <svg>. Create attributes string for svg tag
  const svg_attr = createAttrString(svg_ast.attr)

  // for each elements in the body of svg_ast, generate svg tag
  const elements = svg_ast.body.map(node => '<' + node.tag + ' ' + createAttrString(node.attr) + '></' + node.tag + '>')
    .join('\n\t')

  // wrap with open and close svg tag to complete SVG code
  console.log('-------------')
  console.log('GENERATOR')
  console.log('<svg ' + svg_attr + '>\n' + elements + '\n</svg>')
  console.log('-------------')
  return '<svg ' + svg_attr + '>\n' + elements + '\n</svg>'
}

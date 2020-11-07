import { lexicator } from './lexicator'
import { parser } from './parser'
import { generator } from './generator'
import { transformer } from './transformer'

export class Drawing {
  setValues(value, node) {
    this.value = value
    this.node  = node
  }

  compile() {
    const lexicated     = lexicator(this.value)
    const parsed        = parser(lexicated)
    const transformed   = transformer(parsed)
    const svg           = generator(transformed)
    this.node.innerHTML = svg
  }
}

import setup from '../index.js'
import { getText } from '../utils/hyper.js'

export default function foundationForm(h) {
  return setup({
    form({ children }) {
      return h('form.grid-container', children())
    },
    option({ schema }) {
      const value = schema.value || schema
      const label = schema.label || value
  
      return h('option', { value,  ...schema.attrs }, [ label ])
    },
    select({ schema, children }) {  
      const select = h(`select`, schema.attrs, children())
  
      return h('.grid-x grid-padding-x', [
        h(`label.cell`, [ getText(schema), select ].filter(Boolean)) 
      ])
    },
    input({ type, schema, parent, update, path }) {
      const attrs = getInputAttrs({ type, path, schema, update }) 
      const input = h(`input`, { ...attrs, ...schema.attrs })
  
      return h(`.grid-x grid-padding-x`, [
        h('label.cell', [ getText(schema), input ].filter(Boolean))
      ])    
    }
  })
}
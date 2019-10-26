import setup from '../index.js'
import { getText, getInputAttrs } from '../utils/hyper.js'

export default function bootStrapForm(h) {
  return setup({
    form({ children }) {
      return h('form.p-3', children())
    },
    array({ type, schema, update, children, path }) {
      return h('.form-check', children())
    },
    select({ schema, update, children, path }) {
      const id = path.join('-')
  
      const label = h('label', { for: id }, getText(schema))
  
      function onchange(event) {
        update(event.target.value)
      }

      const select = h(`select.form-control`, { onchange, ...schema.attrs }, children())
  
      return h(`.form-group`, [ label, select ].filter(Boolean))    
    },
    option({ schema }) {
      const value = schema.value || schema
      const label = schema.label || value
  
      return h('option', { value,  ...schema.attrs }, [ label ])
    },
    input({ type, schema, parent, update, path }) {
      const attrs = getInputAttrs({ type, path, schema, update }) 

      const text = getText(schema)

      const input = h(`input.form-control`, { ...attrs, ...schema.attrs })

      if(!text) return input

      const label = h('label', { for: attrs.id }, )
  
      return h(`.form-group`, [ label, input ])    
    }
  })
}
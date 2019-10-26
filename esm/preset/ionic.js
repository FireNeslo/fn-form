import setup from '../index.js'
import { getText } from '../utils/hyper.js'

export default function ionicForm(h) {
  return setup({
    form({ children }) {
      return h('form', children())
    },
    option({ schema }) {
      const value = schema.value || schema
      const label = schema.label || value
  
      return h('ion-select-option', { value,  ...schema.attrs }, [ label ])
    },
    select({ schema, children }) {  
      const select = h(`ion-select`, schema.attrs, children())
  
      return h(`label`, [ getText(schema), select ].filter(Boolean)) 
    },
    input({ type, schema, update, path }) {
      const attrs = getInputAttrs({ type, path, schema, update }) 
      const input = h(`ion-input`, { ...attrs, ...schema.attrs })
  
      return h('label', [ getText(schema), input ].filter(Boolean))
    }
  })
}
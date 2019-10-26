fn-form - Yet another form builder (WIP)
========================================

Unless you are very brave or foolish do not use

If you want to help get in contact, more heads is better than one probably.


```js
import setup from 'fn-form'
import jsonSchema from './schemas/schema.json'
import h from 'hyperscript'

const createForm = setup({
  form({ children }) {
    return h('form', children())
  },
  input({ type, schema }) {
    return h('input', { type })
  },
  select() {
    ...
  }
})

const form = createForm(jsonSchema)

document.body.appendChild(form)
```

```js
import setup from 'fn-form/preset/bootstrap'
import jsonSchema from './schemas/schema.json'
import h from 'hyperscript'

const createForm = setup(h)
const form = createForm(jsonSchema)

document.body.appendChild(form)
```
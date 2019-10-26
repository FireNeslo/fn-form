import h from 'hyperscript'
import setupFoundation from '../esm/preset/foundation'
import setupBootstrap from '../esm/preset/bootstrap'
import setupIonic from '../esm/preset/ionic'

import schema from './schema.json'


document.head.append(h('script', { type: 'module', src: 'https://cdn.jsdelivr.net/npm/@ionic/core@4.7.4/dist/ionic/ionic.esm.js' }))

const styles = [
  [ 
    setupBootstrap(h), 
    h('style', `@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'`)
  ],
  [ setupFoundation(h), 
    h('style', `@import 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.5.3/css/foundation.css'`)
  ],
  [ setupIonic(h), 
    h('style', `@import 'https://cdn.jsdelivr.net/npm/@ionic/core@4.7.4/css/ionic.bundle.css'`),
  ]
].slice(0, 1)

for(const [ createForm, ...nodes ] of styles) {

  const wrapper = h('section')
  const shadow = wrapper.attachShadow({ mode: 'open' })
  const form = createForm(schema)

  for(const node of nodes) {
    shadow.append(node)
  } 

  shadow.append(form)
  document.body.append(wrapper)
}
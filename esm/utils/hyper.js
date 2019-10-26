export function getText(schema) {
  return (
    schema.label || 
    schema.title || 
    (schema.attrs && (
      schema.attrs.placeholder
    ))
  )
}

export function getInputAttrs({ type, path, schema, update }) {
  const id = path.join('-')  
  const name = path[path.length - 1]
  const required = parent.required || []

  if(!type) debugger

  const attrs = {
    id: id,
    attrs: { id },
    name: path.join('.'),
    type: { string: 'text' }[type] || type,
    required: required.includes(name),
    oninput(event) {
      if(schema.type == 'boolean') {
        update(event.target.checked)
      } else {
        update(event.target.value)
      }
    },
  }

  return attrs
}
export const DEFAULT_TYPES = {
  string: 'text',
  boolean: 'checkbox',
}

export default function setup(components) {
  
  function getType(schema, parent) {
    if(!schema) return 'null'
  
    const attr = schema.attrs && schema.attrs.type
    const type = schema.type || typeof schema
  
    if(components[attr]) return attr
    
    if(schema.enum) return 'select'
    else if(schema.oneOf) return 'radio'
    else if(schema.anyOf) return 'checkbox'
    
    if(getType(parent) === 'select') {
      return 'option'
    }
  
    return DEFAULT_TYPES[type] || type
  }

  function component(schema, { path, root, parent }) {
    const type = getType(schema, parent)
    const scope = { type, children, update, schema, parent, root, path }

    function update(value) {
      console.log(path, value)
    }

    function children() {      
      if(schema.properties) {
        return Object.entries(schema.properties)
          .map(([ name, field ]) => {
            return component(field, { path: path.concat([name]), parent: schema, root })
          })
      }
      
      let array = schema.anyOf || schema.oneOf || schema.items || schema.enum

      if(!Array.isArray(array)) array = [ array ]

      return array.map((field, name) => {
        return component(field, { path: path.concat([name]), parent: schema, root })
      })
    }

    switch(type) {
      case "object":
        if(parent) {
          return components.group(scope)
        } else {
          return components.form(scope)
        }
    }

    if(components[type]) {
      return components[type](scope)
    } else {
      return components.input(scope)
    }
  }

  return function create(root) {
    return component(root, { root, path: [] })
  }
}
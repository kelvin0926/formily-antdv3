import { Engine } from '@designable/core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { message } from 'ant-design-vue'

export const saveSchema = (designer: Engine) => {
  const schema = transformToSchema(designer.getCurrentTree());
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(schema)
  )
  message.success('Save Success');
  console.log('schema', schema)
}

export const loadInitialSchema = (designer: Engine) => {
  try {
    const tree = transformToTreeNode(
      JSON.parse(localStorage.getItem('formily-schema'))
    )
    designer.setCurrentTree(tree)
  } catch (err) { }
}

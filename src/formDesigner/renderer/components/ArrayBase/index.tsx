import { createBehavior } from '@designable/core'
import { createFieldSchema, createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { composeExport } from '@form-designer/components/__builtins__'
import { Button, } from 'ant-design-vue'
import { ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { ArrayBase as FArrayBase } from '@form-designer/components'
export const createArrayBehavior = (name: string) => {
  return createBehavior(
    {
      name,
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === name,
      designerProps: {
        droppable: true,
        propsSchema: createFieldSchema(AllSchemas[name]),
      },
      designerLocales: AllLocales[name],
    },
    {
      name: `${name}.Addition`,
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === `${name}.Addition`,
      designerProps: {
        allowDrop(parent) {
          return parent.props?.['x-component'] === name
        },
        propsSchema: createVoidFieldSchema(AllSchemas[name].Addition),
      },
      designerLocales: AllLocales.ArrayAddition,
    },
    {
      name: `${name}.Remove`,
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === `${name}.Remove`,
      designerProps: {
        allowDrop(parent) {
          return parent.props?.['x-component'] === name
        },
        propsSchema: createVoidFieldSchema(),
      },
      designerLocales: AllLocales.ArrayRemove,
    },
    {
      name: `${name}.Index`,
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === `${name}.Index`,
      designerProps: {
        allowDrop(parent) {
          return parent.props?.['x-component'] === name
        },
        propsSchema: createVoidFieldSchema(),
      },
      designerLocales: AllLocales.ArrayIndex,
    },
    {
      name: `${name}.MoveUp`,
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === `${name}.MoveUp`,
      designerProps: {
        allowDrop(parent) {
          return parent.props?.['x-component'] === name
        },
        propsSchema: createVoidFieldSchema(),
      },
      designerLocales: AllLocales.ArrayMoveUp,
    },
    {
      name: `${name}.MoveDown`,
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === `${name}.MoveDown`,
      designerProps: {
        allowDrop(parent) {
          return parent.props?.['x-component'] === 'ArrayCards'
        },
        propsSchema: createVoidFieldSchema(),
      },
      designerLocales: AllLocales.ArrayMoveDown,
    }
  )
}

export const ArrayBase =
  composeExport(FArrayBase, {
    Addition: FArrayBase.Addition,
    Index: (props, { attrs }) => (<span {...attrs} > #1. </span>),
    Item: FArrayBase.Item,
    MoveDown: (props, { attrs }) => (<Button size='small' {...attrs}><><ArrowDownOutlined></ArrowDownOutlined></></Button>),
    MoveUp: (props, { attrs }) => (<Button size='small' {...attrs}><><ArrowUpOutlined></ArrowUpOutlined></></Button>),
    Remove: (props, { attrs }) => (<Button size='small' {...attrs}><><DeleteOutlined></DeleteOutlined></></Button>),
    SortHandle: FArrayBase.SortHandle
  })
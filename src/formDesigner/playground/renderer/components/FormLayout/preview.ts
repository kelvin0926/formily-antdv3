import { FormLayout as FormilyFormLayout } from '../../../components'
import { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
// import { DnFC } from '../../prototypes'
import { withContainer } from '../../common/Container'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { composeExport } from '../../../components/__builtins__'

export const FormLayout =
  composeExport(withContainer(FormilyFormLayout), {
    Behavior: createBehavior({
      name: 'FormLayout',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'FormLayout',
      designerProps: {
        droppable: true,
        propsSchema: createVoidFieldSchema(AllSchemas.FormLayout),
      },
      designerLocales: AllLocales.FormLayout,
    }),
    Resource: createResource({
      icon: 'FormLayoutSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormLayout',
          },
        },
      ],
    }),
  })

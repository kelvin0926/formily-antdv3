import { Space as FormilySpace } from '../../../components'
import { composeExport } from '../../../components/__builtins__'
import type { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '../../../prototypes'
import { createVoidFieldSchema } from '../Field'
import { withContainer } from '../../common/Container'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

export const Space: DnFC<VNode> = composeExport(
  withContainer(FormilySpace),
  {
    Behavior: createBehavior({
      name: 'Space',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Space',
      designerProps: {
        droppable: true,
        inlineChildrenLayout: true,
        propsSchema: createVoidFieldSchema(AllSchemas.Space),
      },
      designerLocales: AllLocales.Space,
    }),
    Resource: createResource({
      icon: 'SpaceSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Space',
          },
        },
      ],
    }),
  }
)

import { Switch as FormilySwitch } from '../../../components'
import { composeExport } from '../../../components/__builtins__'
import type { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '../../../prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

export const Switch: DnFC<VNode> = composeExport(
  FormilySwitch,
  {
    Behavior: createBehavior({
      name: 'Switch',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Switch',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Switch),
      },
      designerLocales: AllLocales.Switch,
    }),
    Resource: createResource({
      icon: 'SwitchSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'boolean',
            title: 'Switch',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
        },
      ],
    }),
  }
)

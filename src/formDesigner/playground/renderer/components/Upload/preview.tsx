import { Upload as FormilyUpload } from '../../../components'
import { composeExport } from '../../../components/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '../../../prototypes'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

export const Upload: DnFC<VNode> = composeExport(
  FormilyUpload,
  {
    Behavior: createBehavior({
      name: 'Upload',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Upload',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Upload),
      },
      designerLocales: AllLocales.Upload,
    }),

    Resource: createResource({
      icon: 'UploadSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'Array<object>',
            title: '上传',
            'x-decorator': 'FormItem',
            'x-component': 'Upload',
            'x-component-props': {
              textContent: '上传',
            },
          },
        },
      ],
    }),
  }
)

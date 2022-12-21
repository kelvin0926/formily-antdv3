import { composeExport, transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import { Input as AntInput } from 'ant-design-vue'
// import type { Input as AntInputProps } from 'ant-design-vue/types/input/input'
import type { InputProps as AntInputProps } from 'ant-design-vue'

const TransformElInput = transformComponent<AntInputProps>(AntInput, {
  change: 'input',
})

const InnerInput = connect(
  TransformElInput,
  mapProps({ readOnly: 'read-only' }),
  mapReadPretty(PreviewText.Input)
)

const TextArea = connect(
  InnerInput,
  mapProps((props) => {
    return {
      ...props,
      type: 'textarea',
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export const Input = composeExport(InnerInput, {
  TextArea,
})

export default Input

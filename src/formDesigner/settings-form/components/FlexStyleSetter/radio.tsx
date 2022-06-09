import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { defineComponent, PropType, h } from 'vue'
import {
  composeExport,
  resolveComponent,
  SlotTypes,
} from '@form-designer/components/__builtins__'
import { PreviewText } from '@form-designer/components'

import { Radio as ARadio, RadioGroup as ARadioGroup, RadioButton as ARadioButton } from 'ant-design-vue'

export type ARadioProps = typeof ARadio
export type RadioGroupProps = typeof ARadioGroup & {
  value: any
  options?: (
    | (Omit<ARadioProps, 'value'> & {
      value: ARadioProps['label']
      label: SlotTypes
    })
    | string
  )[]
  optionType: 'defalt' | 'button'
}

const RadioGroupOption = defineComponent({
  name: 'ARadioGroup',
  props: {
    value: {},
    options: {
      type: Array as PropType<RadioGroupProps['options']>,
      default: () => [],
    },
    optionType: {
      type: String as PropType<RadioGroupProps['optionType']>,
      default: 'default',
    },
  },
  emits: ['change'],
  setup(customProps, { attrs, slots, emit }) {
    return () => {
      const options = customProps.options || []
      const OptionType =
        customProps.optionType === 'button' ? ARadioButton : ARadio
      const children =
        options.length !== 0
          ? {
            default: () =>
              options.map((option) => {
                if (typeof option === 'string') {
                  return h(
                    OptionType,
                    { label: option },
                    {
                      default: () => [
                        resolveComponent(slots?.option ?? option, { option }),
                      ],
                    }
                  )
                } else {
                  return h(
                    OptionType,
                    {
                      ...option,
                      value: undefined,
                      label: option.value,
                    },
                    {
                      default: () => [
                        resolveComponent(slots?.option ?? option.label, {
                          option,
                        }),
                      ],
                    }
                  )
                }
              }),
          }
          : slots
      return (
        <ARadioGroup {...{ modelValue: customProps.value, ...attrs, "onUpdate:modelValue": (value: any) => { emit('change', value) } }}>
          {children}
        </ARadioGroup>
      )
    }
  },
})


const RadioGroup = connect(
  RadioGroupOption,
  mapProps({ dataSource: 'options' }),
  mapReadPretty(PreviewText.Select)
)
export const Radio = composeExport(ARadio, {
  Group: RadioGroup,
})

export default Radio

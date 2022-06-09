import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent } from 'vue'
import { PreviewText } from '@form-designer/components'
import { Select as ASelect, SelectOption as ASelectOption } from 'ant-design-vue'
import { resolveComponent } from '@form-designer/components/__builtins__'

const SelectOption = defineComponent({
  name: 'ASelect',
  props: ['options', 'value'],
  emits: ['change'],
  setup(props, { attrs, slots, emit }) {
    return () => {
      const options = props.options || []
      const _slots =
        options.length !== 0
          ? {
            default: () =>
              options.map((option) => {
                if (typeof option === 'string') {
                  return h(
                    ASelectOption,
                    { props: { value: option, label: option } },
                    {
                      default: () => [
                        resolveComponent(slots?.option, { option }),
                      ],
                    }
                  )
                } else {
                  return h(
                    ASelectOption,
                    {
                      props: {
                        ...option,
                      },
                    },
                    {
                      default: () => [
                        resolveComponent(slots?.option ?? option.component, {
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
        <ASelect v-model:value={props.value} v-slots={_slots} {...{ "onUpdate:modelValue": (value: any) => { emit('change', value) } }} />
      )
    }
  },
})

export const Select = connect(
  SelectOption,
  mapProps({ dataSource: 'options', loading: true }),
  mapReadPretty(PreviewText.Select)
)

export default Select

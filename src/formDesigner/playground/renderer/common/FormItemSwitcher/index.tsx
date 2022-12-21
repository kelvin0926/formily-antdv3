import { Switch } from '../../../components'
import { defineComponent } from 'vue-demi'

export interface IFormItemSwitcherProps {
  value?: string
  // onChange?: (value: string) => void
}

export const FormItemSwitcher = defineComponent({
  props: { value: {} },
  setup(props, { emit }) {
    return () => {
      console.log('这是？', props)
      return (
        <Switch
          checked={props.value === 'FormItem'}
          {...{
            "onUpdate:checked": (value) => {
              emit('change', value ? 'FormItem' : undefined)
            }
          }}
        />
      )
    }
  },
})

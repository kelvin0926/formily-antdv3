import { DroppableWidget } from '../../../prototypes'
import { VueComponent } from '@formily/vue'
import './styles.less'
import { defineComponent } from 'vue-demi'
import { VNode } from 'vue'

export const Container = defineComponent({
  name: 'DnContainer',
  setup(props, { slots }) {
    return () => {
      return <DroppableWidget v-slots={slots}></DroppableWidget>
    }
  },
})

export const withContainer = (Target: VNode) => {
  return defineComponent({
    setup(props, { attrs, slots }) {
      console.log({attrs})
      return () => {
        return (
          <DroppableWidget>
            <Target {...attrs} v-slots={slots} />
          </DroppableWidget>
        )
      }
    },
  })
}

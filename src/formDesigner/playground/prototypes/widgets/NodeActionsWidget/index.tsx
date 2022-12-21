import { observer } from '@formily/reactive-vue'
import { Space } from '../../../components'
import { Button as Button } from 'ant-design-vue'
import { usePrefix, useTreeNode, useSelected } from '../../hooks'
import { IconWidget } from '../IconWidget'
import { TextWidget } from '../TextWidget'
import cls from 'classnames'
import './styles.less'
import { composeExport } from '../../../components/__builtins__'
import { CSSProperties, defineComponent, VNode, ComponentCustomProps } from 'vue-demi'

// export interface INodeActionsWidgetProps {
//   activeShown?: boolean
// }

export interface INodeActionsWidgetActionProps
  extends ComponentCustomProps {
  className?: string
  style?: CSSProperties
  title: VNode
  icon?: VNode
}

const NodeActionsWidgetComponent = observer(
  defineComponent({
    props: ['activeShown'],
    setup(props, { slots }) {
      const nodeRef = useTreeNode()
      const prefixRef = usePrefix('node-actions')
      const selectedRef = useSelected()
      return () => {
        if (
          selectedRef.value.indexOf(nodeRef.value.id) === -1 &&
          props.activeShown
        )
          return null
        return (
          <div class={cls(prefixRef.value)}>
            <div class={prefixRef.value + '-content'}>
              <Space split="|">{slots.default?.()}</Space>
            </div>
          </div>
        )
      }
    },
  })
)

const ActionComponent = defineComponent({
  props: ['icon', 'title', 'onClick'],
  setup(props, { attrs, emit }) {
    const prefixRef = usePrefix('node-actions-item')
    return () => {
      return (
        <Button
          text={true}
          {...attrs}
          class={cls(prefixRef.value)}
          data-click-stop-propagation="true"
          onClick={() => {
            emit('click')
          }}
        >
          <span class={prefixRef.value + '-text'}>
            <IconWidget infer={props.icon} />
            <TextWidget>{props.title}</TextWidget>
          </span>
        </Button>
      )
    }
  },
})
export const NodeActionsWidget = composeExport(NodeActionsWidgetComponent, {
  Action: ActionComponent,
})

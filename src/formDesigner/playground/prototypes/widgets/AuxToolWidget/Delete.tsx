import { IconWidget } from '../IconWidget'
import { useOperation, usePrefix } from '../../hooks'
import { Button as Button } from 'ant-design-vue'
import { composeExport } from '../../../components/__builtins__'
import { defineComponent } from 'vue-demi'

// export interface IDeleteProps {
//   node: TreeNode
//   style?: React.CSSProperties
// }

const DeleteComponent = defineComponent({
  props: ['node'],
  setup(props) {
    const operationRef = useOperation()
    const prefixRef = usePrefix('aux-copy')
    return () => {
      if (props.node === props.node.root) return null
      return (
        <button
          class={prefixRef.value}
          onClick={() => {
            operationRef.value.removeNodes([props.node])
          }}
        >
          <IconWidget infer="Remove" />
        </button>
      )
    }
  },
})
export const Delete = composeExport(DeleteComponent, { displayName: 'Delete' })

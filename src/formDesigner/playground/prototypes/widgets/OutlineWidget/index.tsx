import cls from 'classnames'
import { useTree, usePrefix, useOutline, useWorkbench } from '../../hooks'
import { observer } from '@formily/reactive-vue'
import { OutlineTreeNode } from './OutlineNode'
import { Insertion } from './Insertion'
import { TreeNode, Viewport } from '@designable/core'
import { NodeSymbol } from './context'
import { CSSProperties, defineComponent, onMounted, provide, ref, unref, VNode, onBeforeUnmount } from 'vue-demi'
import { useStyle } from '../../../prototypes'
import { useEffect } from '../../shared'

export interface IOutlineTreeWidgetProps {
  className?: string
  style?: CSSProperties
  onClose?: () => void
  renderTitle?: (node: TreeNode) => VNode
  renderActions?: (node: TreeNode) => VNode
}

export const OutlineTreeWidget = observer(
  defineComponent({
    name: 'OutlineTreeWidget',
    props: ['renderActions', 'renderTitle', 'onClose'],
    setup(props, { attrs }) {
      // { onClose, style, renderActions, renderTitle, className,
      const refInstance = ref<HTMLDivElement>()
      const prefixRef = usePrefix('outline-tree')
      const workbenchRef = useWorkbench()
      const current = workbenchRef.value?.activeWorkspace || workbenchRef.value?.currentWorkspace
      const workspaceId = current?.id
      const treeRef = useTree(workspaceId)
      const outline = useOutline(workspaceId)
      const outlineRef = ref<Viewport>()
      const style = useStyle()

      provide(
        NodeSymbol,
        ref({
          renderActions: props.renderActions,
          renderTitle: props.renderTitle,
        })
      )

      useEffect(() => {
        const _outline = outline.value
        if (!workspaceId) return
        if (outlineRef.value && outlineRef.value !== _outline) {
          outlineRef.value.onUnmount()
        }
        if (refInstance.value && outline) {
          _outline.onMount(refInstance.value, window)
        }
        outlineRef.value = _outline
        return () => {
          outlineRef.value?.onUnmount()
        }
      }, [refInstance, outlineRef, outline, () => workbenchRef.value?.activeWorkspace || workbenchRef.value?.currentWorkspace])
      // outlineRef

      return () => {
        const prefix = unref(prefixRef)
        const tree = unref(treeRef)
        if (!outline.value || !workspaceId) return null
        return (
          <div {...attrs} class={cls(prefix + '-container')} style={style}>
            <div class={prefix + '-content'} ref={refInstance}>
              <OutlineTreeNode node={tree} workspaceId={workspaceId} />
              <div
                class={prefix + '-aux'}
                style={{
                  pointerEvents: 'none',
                }}
              >
                <Insertion workspaceId={workspaceId} />
              </div>
            </div>
          </div>
        )
      }
    },
  })
)

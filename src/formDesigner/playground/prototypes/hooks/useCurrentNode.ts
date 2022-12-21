import { computed } from 'vue-demi'
import { useSelected } from './useSelected'
import { useTree } from './useTree'
import { computed as reactiveComputed } from '../shared'

export const useCurrentNode = (workspaceId?: string) => {
  // TODO:: selected changes cause Vue computed to change, however when treenode changes there is no reaction
  const selected = useSelected(workspaceId)

  const tree = useTree(workspaceId)

  return reactiveComputed(() => {
    return tree.value?.findById?.(selected.value[0])
  })
}

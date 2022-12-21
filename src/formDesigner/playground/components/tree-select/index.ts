import { connect, mapProps, h } from '@formily/vue'
import { TreeSelect as AntdTreeSelect,  } from 'ant-design-vue'
import Icon from '@ant-design/icons-vue'

export const TreeSelect = connect(
  AntdTreeSelect,
  mapProps(
    {
      dataSource: 'treeData',
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon:
          field?.['loading'] || field?.['validating']
            ? h(Icon, { props: { type: 'loading' } }, {})
            : props.suffixIcon,
      }
    }
  )
)

export default TreeSelect

/*
 * 支持文本、数字、布尔、表达式
 * Todo: JSON、富文本，公式
 */
import { createPolyInput } from '../PolyInput'
import { Select as Select, Popover, Button as Button } from 'ant-design-vue'
const {Option} = Select;
import { InputNumber, Input } from '../../../components'
import { defineComponent } from 'vue-demi'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { TextWidget } from '../../../prototypes'

const STARTTAG_REX =
  /<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/

const EXPRESSION_REX = /^\{\{([\s\S]*)\}\}$/

const isNumber = (value: any) => typeof value === 'number'

const isBoolean = (value: any) => typeof value === 'boolean'

const isExpression = (value: any) => {
  return typeof value === 'string' && EXPRESSION_REX.test(value)
}

const isRichText = (value: any) => {
  return typeof value === 'string' && STARTTAG_REX.test(value)
}

const isNormalText = (value: any) => {
  return typeof value === 'string' && !isExpression(value) && !isRichText(value)
}

const takeNumber = (value: any) => {
  const num = String(value).replace(/[^\d\.]+/, '')
  if (num === '') return
  return Number(num)
}

export const ValueInput = createPolyInput([
  {
    type: 'TEXT',
    icon: 'Text',
    component: Input,
    checker: isNormalText,
  },
  {
    type: 'EXPRESSION',
    icon: 'Expression',
    component: defineComponent({
      props: ['value'],
      setup(props: any, { emit }) {
        return () => {
          const renderEditor = () => {
            return (
              <div
                style={{
                  width: '400px',
                  height: '200px',
                }}
              >
                <Codemirror
                  v-model:value={props.value}
                  extensions={[javascript()]}
                  onChange={(value) => emit('change', value)}
                  style={{ height: '100%', width: '100%', background: 'var(--dn-composite-panel-tabs-content-bg-color)' }}
                  {...{
                    tabSize: 4,
                    lineNumbers: true,
                    line: true,
                    mode: 'text/javascript',
                  }}
                />
              </div>
            )
          }
          const renderButton = () => {
            return (
              <Button>
                <TextWidget token="SettingComponents.ValueInput.expression" />
              </Button>
            )
          }
          return (
            <Popover
              width={'auto'}
              v-slots={{
                reference: renderButton
              }}
              trigger="click"
            >
              {renderEditor()}
            </Popover>
          )
        }
      }
    }),
    checker: isExpression,
    toInputValue: (value) => {
      if (value === '{{}}') return
      const matched = String(value).match(EXPRESSION_REX)
      return matched?.[1] || value || ''
    },
    toChangeValue: (value) => {
      if (value === '{{}}') return
      const matched = String(value).match(EXPRESSION_REX)
      return `{{${matched?.[1] || value || ''}}}`
    },
  },
  {
    type: 'BOOLEAN',
    icon: 'Boolean',
    component: defineComponent({
      name: 'DnValueInput.Boolean',
      props: ['value'],
      emits: ['change'],
      setup(props, { emit }) {
        return () => {
          return (
            <Select
              v-model:value={props.value}
              {...{
                "onUpdate:modelValue": (value) => {
                  emit('change', value)
                }
              }}
            >
              <Option label="True" value={true}></Option>
              <Option label="False" value={false}></Option>
            </Select>
          )
        }
      },
    }),
    checker: isBoolean,
    toInputValue: (value) => {
      return !!value
    },
    toChangeValue: (value) => {
      return !!value
    },
  },
  {
    type: 'NUMBER',
    icon: 'Number',
    component: InputNumber,
    checker: isNumber,
    toInputValue: takeNumber,
    toChangeValue: takeNumber,
  },
])

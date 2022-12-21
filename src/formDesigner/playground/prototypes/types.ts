import { Engine, IResource, IBehavior } from '@designable/core'
import { DefineComponent } from 'vue'
// import Vue from 'vue'



export interface IDesignerLayoutProps {
  prefixCls?: string
  theme?: 'dark' | 'light' | (string & {})
}
export interface IDesignerProps extends IDesignerLayoutProps {
  engine: Engine
}

export interface IDesignerComponents {
  [key: string]: DnFC<any>
}

export interface IDesignerLayoutContext {
  theme?: 'dark' | 'light' | (string & {})
  prefixCls: string
}

export interface IWorkspaceContext {
  id: string
  title?: string
  description?: string
}

export type DnFC<P = {}> = DefineComponent<any, any, any, P> & {
  Resource?: IResource[]
  Behavior?: IBehavior[]
}

export type DnComponent<P = {}> = DefineComponent<any, any, any, P> & {
  Resource?: IResource[]
  Behavior?: IBehavior[]
}
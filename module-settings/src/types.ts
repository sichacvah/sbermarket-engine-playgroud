import type {
  ModuleParams
} from 'react-native-sbermarket-engine/src/ModuleManagement/Module'

export const PREFIX = 'settings' as const

export enum LayoutType {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

export type LocalState = {
  layoutType: LayoutType
}

export type State = {
  [PREFIX]: LocalState
}



export type Params = ModuleParams<State>

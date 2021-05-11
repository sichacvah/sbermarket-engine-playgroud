import type {
  ModuleParams
} from 'react-native-sbermarket-engine/src/ModuleManagement/Module'
import {State as SettingState} from 'module-settings/src/types'

export const PREFIX = 'products' as const

export type Product = {
  id: number
  image: string,
  name: string
}

export type LocalState = {
  products: Product[]
  isLoading: boolean
}

export type State = {
  [PREFIX]: LocalState
} & SettingState

export type Params = ModuleParams<State>

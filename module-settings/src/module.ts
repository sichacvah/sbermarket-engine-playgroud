import type {
  Module,
  ModuleGenerator
} from 'react-native-sbermarket-engine/src/ModuleManagement/Module'
import type {
  Params,
  State
} from './types'
import {PREFIX, LayoutType} from './types'
import {makeSettingsScreen} from './SettingsScreen'


const makeInitialState = (): State['settings'] => ({
  layoutType: LayoutType.vertical
})

const makeModule = (params: Params): Module => {
  const SettingsScreen = makeSettingsScreen(params)
  return {
    prefix: () => PREFIX,
    tabs: () => {
      
      return {
        settings: () => ({
          name: 'Settings',
          component: SettingsScreen
        })
      }
    }
  }
}

const moduleGenerator: ModuleGenerator<State> = {
  makeInitialState,
  makeModule
}

export default moduleGenerator

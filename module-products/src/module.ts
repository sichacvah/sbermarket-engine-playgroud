import type {
  Module,
  ModuleGenerator
} from 'react-native-sbermarket-engine/src/ModuleManagement/Module'
import type {
  Params,
  State,
  LocalState,
} from './types'
import {makeProductScreen} from './ProductsScreen'
import {PREFIX} from './types'


const makeInitialState = (): LocalState => ({
  isLoading: false,
  products: []
})

const makeModule = (params: Params): Module => ({
  prefix: () => PREFIX,
  tabs: () => {
    const ProductsScreen = makeProductScreen(params)
    return {
      products: () => ({
        name: 'Products',
        component: ProductsScreen
      })
    }
  }
})

const moduleGenerator: ModuleGenerator<State> = {
  makeInitialState,
  makeModule
}

export default moduleGenerator
import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Switch,
} from 'react-native'
import {Params, LayoutType, LocalState} from './types'

const layoutTypeUpdater = (state: LocalState, layoutType: LayoutType): LocalState => ({
  ...state,
  layoutType
})


export const makeSettingsScreen = (params: Params) => {

  const SettingsScreen = () => {
    const atom = params.provideLocalAtom<LocalState>()
    const [state, setState] = useState(atom.deref())

    useEffect(() => {
      const listener = (next: LocalState) => {
        setState(next)
      }

      atom.addListener(listener)
      return () => {
        atom.removeListener(listener)
      }
    }, [])

    return (
      <View style={styles.container}>
          <Text>Settings{'\n'}</Text>
          <Text>Select card layout:</Text>
          <View style={[styles.row, styles.bordered]}>
            <Text>Vertical</Text>
            <Switch
              value={state.layoutType === LayoutType.vertical}
              onValueChange={(value) => value && atom.swap(layoutTypeUpdater, LayoutType.vertical)}
            />
            
          </View>
          <View style={styles.row}>
            <Text>Horizontal</Text>
            <Switch
              value={state.layoutType === LayoutType.horizontal}
              onValueChange={(value) => value && atom.swap(layoutTypeUpdater, LayoutType.horizontal)}
            />
          </View>
        </View>
      )
  }

  return SettingsScreen
}

const styles = StyleSheet.create({
  bordered: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  }

})

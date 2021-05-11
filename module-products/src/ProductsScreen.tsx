import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image
} from 'react-native'
import {Params, State} from './types'
import {LayoutType} from 'module-settings/src/types'

const Card = (props: { name: string, image?: string, layoutType: LayoutType }) => {
  if (props.layoutType === LayoutType.horizontal) {
    return (
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: props.image }} />
        <Text>{props.name}</Text>
      </View>
    )
  }
  return (
    <View>
      <Image style={styles.image} source={{ uri: props.image }} />
      <Text>{props.name}</Text>
    </View>
  )
}

const PRODUCTS_URL = `https://sbermarket.ru/api/v2/products?sid=11&tid=41331`
type Product = {
  id: number,
  name: string,
  images?: [{small_url: string}]
}

export const makeProductScreen = (params: Params) => {
  const ProductsScreen = () => {
    const atom = params.provideAtom()
    const [state, setState] = useState(atom.deref())
    const [products, setProducts] = useState<Product[]>([])
  
    useEffect(() => {
      fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then(data => {
          setProducts(data.products)
        })
    }, [])
  
    useEffect(() => {
      const listener = (next: State) => {
        setState(next)
      }
      atom.addListener(listener)
      return () => {
        atom.removeListener(listener)
      }
    }, [])
  
    return (
      <View style={styles.container}>
        <Text>Products{'\n'}</Text>
        <ScrollView>
          {products.map((product) => <Card layoutType={state.settings.layoutType} key={product.id} image={getProductImage(product)} name={product.name} />)}
        </ScrollView>
      </View>
    )
  
  }

  return ProductsScreen
}

const getProductImage = (product: Product) => {
  if (!product.images) return undefined
  return product.images[0]?.small_url
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
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  image: {
    height: 100,
    width: 100
  }
})

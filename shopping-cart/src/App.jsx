import './App.css'
import {products as initialProducts} from './mocks/products.json'
import { Products } from './components/Products'
import { useState } from 'react'
import { Header } from './components/Header'
import {Cart} from './components/Cart'
import { useFilters } from './hooks/useFilters'
import { CartProvider } from './context/cart'



function App() {
  // TODO: fetch the data from the API and not from products.json
  const [products, setProducts] = useState(initialProducts)
  const { filters, filterProducts } = useFilters()
  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filterProducts(products)} />
    </CartProvider>
  )
}

export default App

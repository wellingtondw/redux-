import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import api from "../../services/api"
import { addProductToCart } from "../../store/modules/cart/actions"

export default function Catalog() {
  const dispatch = useDispatch()
  const [catalog, setCatalog] = useState([])
  
  useEffect(() => {
    api.get('products').then(response => {
      setCatalog(response.data)
    })
  }, [])

  const handleAddProductToCart = useCallback((product) => {
      dispatch(addProductToCart(product))
    }, [])

  return (
  <main>
    <h1>Catalog</h1>

    {catalog.map(product => (
      <article key={product.id}>
        <strong>{product.title}</strong>{' - '}
        <span>{product.price}</span>{' - '}

        <button type='button' onClick={() =>  handleAddProductToCart(product)}>Comprar</button>
      </article>
    ))}
  </main>
  )
}
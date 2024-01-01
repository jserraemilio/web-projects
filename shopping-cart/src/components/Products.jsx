import { useCart } from "../hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";
import './Products.css'
export function Products ({products}){
    const { addToCart, checkProductInCart, removeFromCart, cart } = useCart()
    console.log(cart)
    const handleClick = (product) => {
        const isProductInCart = checkProductInCart(product)
        if(isProductInCart){
            return removeFromCart(product)
        }

        addToCart(product)
    }
    return (
        <main className="products">
            <ul>
                {
                    products?.map((product) => {
                        const isProductInCart = checkProductInCart(product)
                      return ( <li key={product.id}>
                            <img src={product.thumbnail} alt={product.title}/>
                            <div>
                                <strong>{product.title}</strong> - {product.price}€
                            </div>
                            <div>
                                <button className={isProductInCart ? 'remove-product-button' : ''}  onClick={() => handleClick(product)}>
                                    {
                                        isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />
                                    }
                                </button>
                            </div>
                        </li> )
                    })
                }
            </ul>
        </main>
    )
}
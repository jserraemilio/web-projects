import './Cart.css'
import { useId } from 'react'
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from './Icons'
import {useCart} from '../hooks/useCart'

function CartItem({thumbnail, price, title, quantity, addToCart}){
    return (
        <li>
            <img src={thumbnail} alt={title}/>
            <div>
                <strong>{title}</strong> - {price}€
            </div>
            <footer>
                <small>
                    Qtty: {quantity}
                </small>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    )
}

export function Cart(){
    const { cart, clearCart, addToCart} = useCart()
    const cartCheckboxId = useId()
    return (
        <>
            <label className='cart-button' htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type='checkbox' hidden />
            <aside className='cart'>
                <ul>
                    {
                        cart?.map((item) => (
                            <CartItem key={item.id} {...item} addToCart={() => addToCart(item)}/>
                        ))
                    }
                </ul>
                <button onClick={clearCart}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}
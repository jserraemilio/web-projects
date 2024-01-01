import { createContext, useState } from "react";

export const CartContext = createContext()

export function CartProvider({children}) {
    const [cart, setCart] = useState([])
    const addToCart = (product) => {
        const checkProductIndexInCart = cart.findIndex((cartProduct) => { return cartProduct.id === product.id})
        console.log(checkProductIndexInCart)
        if(checkProductIndexInCart !== -1){
            const newCart = structuredClone(cart)
            newCart[checkProductIndexInCart].quantity += 1
            return setCart(newCart)
        }

        setCart(prevState => (
            [
                ...prevState, // Añadir estado anterior
                { // Y añadimos un nuevo objeto que contiene el producto y la qtty
                    ...product,
                    quantity: 1
                }
            ]
        ))
    }
    const clearCart = () => {
        setCart([])
    }
    const removeFromCart = (product) => {
        setCart(prevState => prevState.filter(productCart => (productCart.id !== product.id)))
    }
    const checkProductInCart = (product) => {
        return cart.some(productCart => productCart.id === product.id)
    }
    return (
    <CartContext.Provider value={{
        cart, addToCart, clearCart, checkProductInCart, removeFromCart
    }}> 
        {children}
    </CartContext.Provider>
    )
}
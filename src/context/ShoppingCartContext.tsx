import { useState, ReactNode, createContext, useContext } from "react";
import { ShoppingCart } from "../components/ShoppingCart.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.ts"

type ShoppingCartProviderProps = {
    children: ReactNode
}
type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id:number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}
type CartItem = {
    id: number
    quantity:number
}


const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }:ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])
    const [isOpen, setIsOpen] = useState(false)

    //get the total number of a certain item function
    function getItemQuantity(id: number){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    //increase the total quantity of a specific item
    function increaseCartQuantity( id:number){
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)== null){
                return [...currItems, { id, quantity: 1 }]
            } else{
                return currItems.map(item =>{
                    if(item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else{
                        return item
                    }
                })

            }
        })
    }

    //decrease the total quantity of a specific item
    function decreaseCartQuantity( id:number){
            setCartItems(currItems => {
                if(currItems.find(item => item.id === id)!== null){
                    return currItems.filter(item => item.id !== id);
                } else{
                    return currItems.map(item =>{
                        if(item.id === id) {
                            return {...item, quantity: item.quantity - 1}
                        } else{
                            return item
                        }
                    })
    
                }
            })
    }

    //remove all of an item from cart
    function removeFromCart( id:number){
            setCartItems(currItems => {
                return currItems.filter(item => item.id !== id);
            })
    }

    //total quantity of cart items
    const cartQuantity= cartItems.reduce((quantity, item)=> item.quantity + quantity,0)

    // shopping cart menu open or closed
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    
    return(
<ShoppingCartContext.Provider value={{
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartItems,
    cartQuantity,
    openCart,
    closeCart
    }}>

{children}
<ShoppingCart isOpen={isOpen}/>
</ShoppingCartContext.Provider>
)}
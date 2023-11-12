import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { CartItem } from './CartItem.tsx'
import { formatCurrency } from '../utilities/formatCurrency.tsx'
import storeItems from "../data/items.json"


type ShoppingCartProps = {
    isOpen: boolean
    user: string
}
export function ShoppingCart({isOpen, user}: ShoppingCartProps){
    const {closeCart, cartItems} = useShoppingCart()
    return (
    <Offcanvas show={isOpen} onHide= {closeCart} placement ="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>
                {user ? user.charAt(0).toUpperCase() + user.slice(1).toLowerCase() : 'User'}'s Cart
            </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item =>
                        <CartItem key={item.id} {...item} />)}
                    <div className="ms-auto fw-bold fs-5">
                        Total {" "} {formatCurrency(cartItems.reduce((total, cartItem)=>{
                            const foundItem = storeItems.find(item => item.id === cartItem.id)
                            return total + (foundItem?.price || 0) * cartItem.quantity
                        },0)
                    )}
                    </div>
                </Stack>
            </Offcanvas.Body>
    </Offcanvas>
)}
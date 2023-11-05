import storeItems from "../data/items.json"
import { useShoppingCart } from "../context/ShoppingCartContext.tsx"
import {  Stack, Button } from 'react-bootstrap'
import { formatCurrency } from "../utilities/formatCurrency.tsx"

type CartItemProps = {
    id:number
    quantity:number
}

export function CartItem({id, quantity}: CartItemProps){
    const {removeFromCart} = useShoppingCart()
    const foundItem = storeItems.find(item=>item.id === id)
    if(foundItem == null) return null

    return (
        <Stack direction = "horizontal" gap={2} className="d-flex align-items-center">
            <img src={foundItem.imgUrl} style={{width:"125px", height:"75px", objectFit:"cover"}}/>
            <div className="me-auto">
                <div>
                    {foundItem.name}{" "}{quantity > 1 && (
                        <span className="text-muted" style={{fontSize:".90rem"}}>
                              x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize:".90rem"}}>
                    {formatCurrency(foundItem.price)}
                </div>
            </div>
            <div>{formatCurrency(foundItem.price * quantity)}</div>
            <Button variant="outline-danger" size="sm" onClick={()=>removeFromCart(foundItem.id)}>&times;</Button>
        </Stack>
    )
}
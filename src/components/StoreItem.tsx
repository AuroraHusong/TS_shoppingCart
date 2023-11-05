import { Card, Button } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/ShoppingCartContext"

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps){
    const { 
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart
     } = useShoppingCart()
    const quantity = getItemQuantity(id)
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={imgUrl} style={{height:"200px", objectFit:"cover"}}/>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span> 
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                          <Button
                          variant="secondary" 
                          className="w-100 shadow"
                          onClick={() => increaseCartQuantity(id)}
                        >
                            Add to cart
                        </Button>
                    ):<div className="d-flex align-items-center flex-column" style={{ gap: ".5rem"}}>
                        <div className="d-flex align-items-center justify-content-center"style={{ gap: ".5rem"}}>
                        <Button variant="light" className="border-secondary rounded-circle" onClick={() => decreaseCartQuantity(id)}><img
                         style={{ width: '30px', height: '30px' }}
                         src="./imgs/minus-small.png" width="20rem" height="20rem" /></Button>
                        <div>
                        <span className="fs-3">{quantity}</span> in cart
                        </div>
                        <Button variant="light" className="border-secondary rounded-circle" onClick={()=> increaseCartQuantity(id)}>
                            <img style={{ width: '30px', height: '30px' }} src="./imgs/plus-small.png" width="20rem" height="20rem" /></Button>
                        </div>
                            <Button onClick={()=>removeFromCart(id)} variant="danger" size="sm">Remove</Button>
                        </div>
                
                    }</div>
            </Card.Body>
        </Card>
        )
}
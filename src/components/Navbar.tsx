import { Container, Nav, Button, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink, useLocation } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"
export function Navbar({user}: {user: string}) {
    const location = useLocation();
    const { openCart, cartQuantity } = useShoppingCart()
return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container className="me-auto">
            <Nav>
                <Nav.Link to="/store" as={NavLink}>
                    Store
                </Nav.Link>
                <Nav.Link to="/about" as={NavLink}>
                    About
                </Nav.Link>
            </Nav>
            {location.pathname === '/Store' && (
          <h2 className="ms-auto me-3 fs-md-4 fs-5">Welcome {user ? user.charAt(0).toUpperCase() + user.slice(1).toLowerCase() : 'User'}!</h2>
        )}
            <Button onClick={openCart}
             variant="outline-secondary"
             className="rounded-circle"
             style={{width: "3rem", height: "3rem", position:"relative"}}
             >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 16 16"
            >
                <image href="./shoppingCart.png" width="16" height="16" />
            </svg>
                <div 
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{ color: 'white', width: "1.2rem", height:"1.2rem", position:"absolute", bottom: 0, right: 0, transform: "translate(25%, 25%)"}}
                >{cartQuantity}</div>
            </Button>
        </Container>
    </NavbarBs>
)
}
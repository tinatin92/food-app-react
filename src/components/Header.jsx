import logo from '../assets/logo.jpg'
import Button from './UI/Button'
import { useContext } from 'react'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

export default function Header () {
const cartcctx = useContext(CartContext)
const totalCartItems = cartcctx.items.reduce((totalNumber, item) => {
    return totalNumber + item.quantity
}, 0)


const userProgressCtx = useContext(UserProgressContext)

function handleShowCart() {
    userProgressCtx.showCart()
}

    return <>
    <header id="main-header">
        <div id="title">
            <img src={logo} alt='main logo' />
            <h1>React Food</h1>
        </div>
     <nav>
        <Button onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
     </nav>
    </header>
    
    
    
    </>
}
import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      const onClickRemoveAll = () => {
        removeAllCartItems()
      }
      const totalCount = () =>
        cartList.reduce((acc, item) => acc + item.price * item.quantity, 0)

      const itemsCount = () => cartList.reduce((acc, item) => acc + 1, 0)

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  data-testid="remove"
                  type="button"
                  onClick={onClickRemoveAll}
                >
                  Remove All
                </button>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <div>
                  <h1>Order Total: Rs {totalCount()}</h1>
                  <p>{itemsCount()} items in cart</p>
                  <button type="button">Checkout</button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart

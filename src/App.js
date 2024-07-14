import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productCartItem = cartList.filter(eachItem => eachItem.id === id)
    const newProduct = {
      availability: productCartItem[0].availability,
      brand: productCartItem[0].brand,
      description: productCartItem[0].description,
      imageUrl: productCartItem[0].imageUrl,
      price: productCartItem[0].price,
      rating: productCartItem[0].rating,
      title: productCartItem[0].title,
      totalReviews: productCartItem[0].totalReviews,
      id: productCartItem[0].id,
      quantity: productCartItem[0].quantity - 1,
    }
    if (newProduct.quantity < 1) {
      this.removeCartItem(id)
    } else {
      this.setState(prevState => ({
        cartList: [
          ...prevState.cartList.filter(eachItem => eachItem.id !== id),
          newProduct,
        ],
      }))
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productCartItem = cartList.filter(eachItem => eachItem.id === id)
    const newProduct = {
      availability: productCartItem[0].availability,
      brand: productCartItem[0].brand,
      description: productCartItem[0].description,
      imageUrl: productCartItem[0].imageUrl,
      price: productCartItem[0].price,
      rating: productCartItem[0].rating,
      title: productCartItem[0].title,
      totalReviews: productCartItem[0].totalReviews,
      id: productCartItem[0].id,
      quantity: productCartItem[0].quantity + 1,
    }
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.filter(eachItem => eachItem.id !== id),
        newProduct,
      ],
    }))
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: [...prevState.cartList.filter(eachItem => eachItem.id !== id)],
    }))
  }

  addCartItem = product => {
    console.log(product)
    const {cartList} = this.state
    const productCartItem = cartList.filter(
      eachItem => eachItem.title === product.title,
    )
    if (productCartItem.length >= 1) {
      const newProduct = {
        availability: productCartItem[0].availability,
        brand: productCartItem[0].brand,
        description: productCartItem[0].description,
        imageUrl: productCartItem[0].imageUrl,
        price: productCartItem[0].price,
        rating: productCartItem[0].rating,
        title: productCartItem[0].title,
        totalReviews: productCartItem[0].totalReviews,
        id: productCartItem[0].id,
        quantity: productCartItem[0].quantity + product.quantity,
      }
      this.setState(prevState => ({
        cartList: [
          ...prevState.cartList.filter(
            eachItem => eachItem.title !== product.title,
          ),
          newProduct,
        ],
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

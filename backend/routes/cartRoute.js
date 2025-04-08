import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

const cartRouter = express.Router()

// Get user's cart items
cartRouter.post('/get',authUser, getUserCart)

// Add a product to the user's cart
cartRouter.post('/add',authUser, addToCart)

// Update quantity of a product in the cart
cartRouter.post('/update',authUser, updateCart)

export default cartRouter
import express from 'express';
import {
    placeOrder,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe,
} from '../controllers/orderController.js';

import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin: get all orders
orderRouter.post('/list', adminAuth, allOrders);

// Admin: update order status
orderRouter.post('/status', adminAuth, updateStatus);

// User: place order with E-transfer or COD
orderRouter.post('/placeEtransfer', authUser, placeOrder);
orderRouter.post('/place', authUser, placeOrder);

// User: place order using Stripe
orderRouter.post('/stripe', authUser, placeOrderStripe);

// User: get their own orders
orderRouter.post('/userorders', authUser, userOrders);

// User: verify payment from Stripe
orderRouter.post('/verifyStripe', authUser, verifyStripe);


export default orderRouter;

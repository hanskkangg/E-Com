import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; 
import Title from './Title';

const CartTotal = () => {
    // Get values from ShopContext (global state)
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

    return (
        <div className='w-full'>
            {/* Section title */}
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            {/* Display cart totals */}
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                {/* Display subtotal (total price of items in the cart) */}
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {getCartAmount()}.00</p>
                </div>
                <hr />

                {/* Display shipping fee */}
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}.00</p>
                </div>
                <hr />

                {/* Display total amount (subtotal + shipping fee) */}
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>
                        {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
                    </b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;

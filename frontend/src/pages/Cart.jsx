import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Create display list from cartItems and products
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Handle item removal and show Undo option
  const handleRemoveItem = (productId, size) => {
    const removedItem = {
      _id: productId,
      size: size,
      quantity: cartItems[productId][size],
    };

    // Remove the item from the cart
    updateQuantity(productId, size, 0);

    // Show toast with Undo button
    const toastId = toast.error(
      <div className="text-center text-black">
        ❌ Item has been removed from your cart!
        <br />
        <button
          onClick={() => {
            updateQuantity(productId, size, removedItem.quantity);
            toast.dismiss(toastId);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded text-xs mt-2"
        >
          UNDO
        </button>
      </div>,
      { position: "top-right", autoClose: 5000 }
    );
  };

  return (
    <div className="border-t pt-14 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Title */}
      <div className=" text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              {/* Product Image & Info */}
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20 rounded-md dark:border dark:border-gray-600"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium dark:text-gray-100">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              {/* Delete Button */}
              <img
                onClick={() => handleRemoveItem(item._id, item.size)}
                className="w-4 mr-4 sm:w-5 cursor-pointer dark:invert"
                src={assets.bin_icon}
                alt="Delete"
              />
            </div>
          );
        })}
      </div>

      {/* Checkout Section */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3 dark:bg-gray-800 dark:hover:bg-gray-600 transition-all"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

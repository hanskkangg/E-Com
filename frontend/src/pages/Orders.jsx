import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [trackingOrder, setTrackingOrder] = useState(null);

  // Load all orders for current user
  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        
        // Flatten each order’s items with status and extra info
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["specialNote"] = order.address.specialNote; 
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Load orders after token is available
  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Show tracking info for selected order
  const trackOrder = (order) => {
    setTrackingOrder(order);
  };

  return (
    <div className="border-t pt-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300">
      {/* Section Title */}
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {/* Order List */}
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b border-gray-300 dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Product Info */}
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 sm:w-20 rounded-lg"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700 dark:text-gray-300">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">
                  <strong>Date:</strong>{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  <strong>Payment:</strong>{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    {item.paymentMethod}
                  </span>
                </p>

                {/* Show special note if user added it */}
                {item.specialNote && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-200 italic">
                    <strong>Special Note:</strong> {item.specialNote}
                  </p>
                )}
              </div>
            </div>

            {/* Status & Track Button */}
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p
                  className={`min-w-2 h-2 rounded-full ${
                    item.status === "Delivered"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>

              {/* Track Order Button */}
              <button
                onClick={() => trackOrder(item)}
                className="border border-gray-400 dark:border-gray-600 px-4 py-2 text-sm font-medium rounded-sm bg-gray-100 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Tracking Modal */}
      {trackingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Tracking Order
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Order: {trackingOrder.name}
            </p>

            {/* Order Tracking Progress */}
            <div className="mt-4">
              <ul className="space-y-2">
                {[
                  "Order Placed",
                  "Packing",
                  "Shipped",
                  "Out for delivery",
                  "Delivered",
                ].map((step, index) => (
                  <li
                    key={index}
                    className={`p-2 border-l-4 ${
                      step === trackingOrder.status
                        ? "border-blue-500 font-bold"
                        : "border-gray-300 dark:border-gray-500"
                    } text-gray-700 dark:text-gray-300`}
                  >
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setTrackingOrder(null)}
              className="mt-4 w-full bg-blue-500 dark:bg-blue-700 text-white py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

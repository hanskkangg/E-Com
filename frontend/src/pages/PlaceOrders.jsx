import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrders = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [showETransferPopup, setShowETransferPopup] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    specialNote: "",
  });

  
  // Show E-Transfer instructions popup only when selected
  const handlePaymentSelection = (paymentMethod) => {
    setMethod(paymentMethod);

    // Open modal only when E-Transfer is selected
    if (paymentMethod === "etransfer") {
      setShowETransferPopup(true);
    }
  };
  
  // Update form input values
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  
  // Handle form submit and place order
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      // Loop through cart items and build order data
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      // Create order object to send
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
        status: method === "etransfer" ? "pending" : "paid",
      };

      
      // Send order based on selected payment method
      switch (method) {
        /*case "paypal":
                    const responsePaypal = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
                    if (responsePaypal.data.success) {
                        window.location.replace(responsePaypal.data.session_url);
                    } else {
                        toast.error(responsePaypal.data.message);
                    }
                    break;*/

        case "etransfer":
          const responseEtransfer = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (responseEtransfer.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(responseEtransfer.data.message);
          }
          break;

        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            window.location.replace(responseStripe.data.session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          toast.error("Invalid payment method selected.");
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ------------- Left Side ---------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        
        {/* All delivery input fields */}
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Phone Number"
        />

        {/* Optional message box */}
        <textarea
          name="specialNote"
          value={formData.specialNote}
          onChange={onChangeHandler}
          maxLength={150}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded py-2 px-3.5 w-full resize-none"
          placeholder="(OPTIONAL) Special note - max 150 characters"
          rows={3}
        ></textarea>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
          {150 - formData.specialNote.length} characters remaining
        </p>
      </div>

      {/* ------------- Right Side ------------------ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* Payment Method Selection */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Select a Payment Method
            </h3>

            {/* PayPal
  <div 
        onClick={() => setMethod('paypal')} 
        className={`flex items-center gap-3 border p-4 cursor-pointer rounded-lg transition transform hover:scale-105 ${
            method === 'paypal' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-300'
        }`}
    >
        <p className={`w-5 h-5 border rounded-full ${method === 'paypal' ? 'bg-green-400' : ''}`}></p>
        <img className="w-10" src={assets.paypal_logo1} alt="PayPal" />
        <p className="font-medium">PayPal</p>
    </div>
     */}

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-4 cursor-pointer rounded-lg transition transform hover:scale-105 ${
                method === "cod"
                  ? "border-green-500 bg-green-50 shadow-md"
                  : "border-gray-300"
              }`}
            >
              <p
                className={`w-5 h-5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="font-medium">Cash on Delivery</p>
            </div>

            {/* E-Transfer */}
            <div
              onClick={() => handlePaymentSelection("etransfer")}
              className={`flex items-center gap-3 border p-4 cursor-pointer rounded-lg transition transform hover:scale-105 ${
                method === "etransfer"
                  ? "border-green-500 bg-green-50 shadow-md"
                  : "border-gray-300"
              }`}
            >
              <p
                className={`w-5 h-5 border rounded-full ${
                  method === "etransfer" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="font-medium">E-Transfer</p>
            </div>

            {/* Credit / Debit Card */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-4 cursor-pointer rounded-lg transition transform hover:scale-105 ${
                method === "stripe"
                  ? "border-green-500 bg-green-50 shadow-md"
                  : "border-gray-300"
              }`}
            >
              <p
                className={`w-5 h-5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                className="w-12"
                src={assets.visa_logo}
                alt="Visa / MasterCard"
              />
              <p className="font-medium">MasterCard / Visa</p>
            </div>
          </div>

          {/* Show modal popup when E-Transfer is selected */}
          {showETransferPopup && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-60 backdrop-blur-sm">
              <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg text-center animate-fadeIn">
                {/* Close Button */}
                <button
                  onClick={() => setShowETransferPopup(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  ✕
                </button>
                <h2 className="text-2xl font-bold text-gray-900">
                  📢 Payment Instructions
                </h2>
                <p className="text-md text-gray-700 mt-3">
                  To complete your order, please send a payment of{" "}
                  <strong className="text-green-600">
                    ${getCartAmount() + delivery_fee}
                  </strong>{" "}
                  to the following email address:
                </p>
                <p className="text-lg font-bold text-blue-600 mt-2">
                  hans.kkang@gmail.com
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Ensure that you include your order number in the payment notes
                  for faster processing.
                </p>

                {/* Payment Confirmation Button */}
                <button
                  onClick={() => setShowETransferPopup(false)}
                  className="mt-6 bg-green-500 text-white px-6 py-3 rounded-md text-lg hover:bg-green-600 transition"
                >
                  I Have Completed the Payment
                </button>
              </div>
            </div>
          )}

          {/* Submit order */}
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm dark:bg-gray-700 dark:hover:bg-gray-600 transition-all rounded-md"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrders;

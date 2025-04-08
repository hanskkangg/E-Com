import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");


  // This function sends payment verification info to the server
  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );

      // If payment was successful, clear cart and go to orders page
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        // If failed, go back to cart
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Run verifyPayment after token is available
  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};

export default Verify;

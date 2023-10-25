// Importing necessary dependencies from external files
import React, { useState } from 'react';
import axios from 'axios'; // Importing Axios for making HTTP requests
import Spinner from './Spinner'; // Importing Spinner component for showing loading animation
import { Product } from '../types/types'; // Importing types for better type safety

// Interface representing the structure of the PayButtonProps prop
interface PayButtonProps {
  products: Product[]; // Array of products in the cart
  totalAmount: number; // Total amount to be paid
}

// Email address to be used for payment (example email)
const email = 'example@gmail.com';

// Functional component representing the payment button
const PayButton: React.FC<PayButtonProps> = ({ products, totalAmount }) => {
  // State to manage loading state during payment initialization
  const [loading, setLoading] = useState(false);

  // Function to initialize payment using Paystack API
  const initializePayment = async () => {
    setLoading(true); // Set loading state to true during payment initialization
    try {
      // Sending a POST request to the server to create a checkout session with Paystack
      const response = await axios.post(
        '/api/paystack/create-checkout-session',
        {
          products: products, // Sending products array to the server
          amount: totalAmount, // Sending total amount to be paid to the server
          email: email, // Sending customer's email address to the server
        }
      );

      // Extracting authorization URL from the response data
      const { authorizationUrl } = response.data;

      // Opening Paystack payment page in a new tab
      const paymentWindow = window.open(authorizationUrl);

      // Checking if the payment window is closed
      if (paymentWindow) {
        // Polling to check if the payment window is closed
        const interval = setInterval(() => {
          if (paymentWindow.closed) {
            // Redirecting to checkout success page when payment is completed
            window.location.href = '/checkout-success';
            clearInterval(interval); // Clearing the interval after redirecting
          }
        }, 1000); // Polling every second
      } else {
        console.error('Failed to open payment window.'); // Logging an error if payment window fails to open
      }
    } catch (error) {
      console.error('Error initializing payment:', error); // Handling errors during payment initialization
      // Handle the error, e.g., show a user-friendly error message to the user.
    } finally {
      setLoading(false); // Setting loading state to false after payment initialization (success or failure)
    }
  };

  // Rendering the payment button with appropriate text based on loading state
  return (
    <button className="cta" onClick={initializePayment}>
      {loading ? <Spinner /> : 'pay with paystack'}{' '}
      {/* Displaying loading spinner or payment text based on loading state */}
    </button>
  );
};

export default PayButton;

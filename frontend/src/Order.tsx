import { useState, useEffect } from 'react';
import axios from 'axios';

// Interface representing the structure of a Product in an order
interface Product {
  name: string;
  price: string;
  quantity: string;
  image: string;
  _id: string;
}

// Interface representing the structure of an order item
interface OrderItem {
  _id: string;
  reference: string;
  total: number;
  payment_status: string;
  delivery_status: string;
  product: Product[];
  createdAt: string;
}

// Functional component representing the list of orders
const Order = () => {
  // State to store the fetched orders
  const [orders, setOrders] = useState<OrderItem[]>([]);

  // useEffect hook to fetch orders from the server when the component mounts
  useEffect(() => {
    axios
      .get('/api/paystack/orders/')
      .then((response) => {
        setOrders(response.data); // Updating the orders state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching orders:', error); // Handling errors during fetching orders
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  // Rendering the list of orders
  return (
    <div className="orders">
      <h2>Orders</h2>
      <ul>
        {/* Mapping through the fetched orders and displaying order details */}
        {orders.map((order) => (
          <div className="order" key={order._id}>
            {/* Displaying order details such as reference, payment status, and delivery status */}
            <p className="id">Order reference: {order.reference}</p>
            <p className="payment-status">
              Status: <span className="status">{order.payment_status}</span>
            </p>
            <p className="delivery-status">
              Delivery: <span className="status">{order.delivery_status}</span>
            </p>
            {/* Displaying order creation date and time */}
            <p className="createdAt">
              Date:{' '}
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'long',
                day: 'numeric',
              })}{' '}
              {new Date(order.createdAt).toLocaleTimeString('en-US', {
                timeStyle: 'short',
              })}
            </p>

            {/* Displaying products in the order */}
            <div className="order-flex">
              {order.product.map((item) => (
                <div key={item._id} className="item">
                  <img src={item.image} alt="" />
                  <div className="items-details">
                    <h4 className="name">{item.name}</h4>
                    <h4 className="price">₦{item.price}</h4>
                    <span className="quantity">Quantity: {item.quantity} </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Displaying the total amount of the order */}
            <p className="total">Total: ₦{order.total / 100}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Order;

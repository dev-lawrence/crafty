import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="checkout-success">
      <h2>Your order has been placed 🚀</h2>

      <Link to="/order" className="btn-filled">
        Check your order
      </Link>
    </div>
  );
};

export default CheckoutSuccess;

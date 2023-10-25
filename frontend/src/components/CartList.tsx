import { useContext } from 'react';
import { CartContextProps } from '../types/types';
import CartContext from '../CartContext';
import CartItem from './CartItem';
import PayButton from './PayButton';

// Interface representing the structure of the CartListProps prop
interface CartListProps {
  cartClick: boolean; // Boolean to determine whether the cart is visible or not
  handleCartClick: () => void; // Function to handle cart visibility toggling
}

// Functional component representing the cart and its contents
const CartList: React.FC<CartListProps> = ({ cartClick, handleCartClick }) => {
  // Accessing products from CartContext using useContext hook
  const { products } = useContext(CartContext) as CartContextProps;

  // Boolean to check if the cart is not empty
  const cartNotEmpty = Array.isArray(products) && products.length !== 0;

  // Function to calculate the subtotal of the products in the cart
  const calculateSubTotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      subtotal += product.quantity! * product.price;
    });

    return subtotal;
  };

  // Rendering the cart UI
  return (
    <>
      <div className={`cart-container ${cartClick ? 'showCart' : ''}`}>
        <div className="cart">
          {/* Button to close the cart and go back to the store */}
          <button className="close" onClick={handleCartClick}>
            <span>Back to store 🛒</span>
          </button>
          <div className="content">
            <div className="cart-products">
              {/* Mapping through products and displaying individual cart items */}
              {cartNotEmpty ? (
                products.map((product) => (
                  <div key={product.id}>
                    <CartItem product={product} />
                  </div>
                ))
              ) : (
                <p>Empty Cart</p>
              )}
            </div>
          </div>

          {/* Displaying subtotal and PayButton component for payment */}
          {cartNotEmpty && (
            <div className="subtotal-container">
              <div className="subtotal">
                <span>Subtotal: ₦{calculateSubTotal().toLocaleString()}</span>
              </div>
              {/* Passing products and total amount to PayButton component */}
              <PayButton
                products={products}
                totalAmount={calculateSubTotal()}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartList; // Exporting the CartList component for use in other parts of the application

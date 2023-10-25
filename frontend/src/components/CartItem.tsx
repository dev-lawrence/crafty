// Importing necessary dependencies and types from external files
import { useState, useContext, useEffect } from 'react';
import CartContext from '../CartContext'; // Importing CartContext for managing the shopping cart state
import { Product, CartContextProps } from '../types/types'; // Importing types for better type safety

// Interface representing the structure of the ProductItemProps prop
interface ProductItemProps {
  product: Product;
}

// Functional component representing a cart item
const CartItem: React.FC<ProductItemProps> = ({
  product: { id, name, price, image }, // Destructuring product object from props
}) => {
  // Accessing state and functions from CartContext using useContext hook
  const { products, addToCart, reduceCartQuantity, removeFromCart } =
    useContext(CartContext) as CartContextProps;
  const [quantity, setQuantity] = useState(1); // State to manage quantity of the product in the cart

  // useEffect hook to update quantity state when products in the cart change
  useEffect(() => {
    const cartProduct = products.find((product) => product.id === id);
    if (cartProduct) {
      setQuantity(cartProduct.quantity!);
    }
  }, [products, id]);

  // Function to Increase Quantity and add the product to the cart
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    addToCart(id, name, price, image);
  };

  // Function to Reduce Quantity and update the cart state accordingly
  const reduceQuantity = () => {
    if (quantity > 1) {
      reduceCartQuantity(id);
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  // Function to calculate the total price based on quantity and product price
  const calculatePrice = (quantity: number, price: number) => {
    return quantity * price;
  };

  // Rendering the cart item UI
  return (
    <>
      <div className="cart-products-product">
        <img src={image} alt={name} /> {/* Displaying product image */}
        <div className="cart-products-details">
          <div className="flex">
            <h5 className="name">{name}</h5> {/* Displaying product name */}
          </div>

          <h4 className="price">
            ₦{calculatePrice(quantity, price).toLocaleString()}{' '}
            {/* Displaying calculated total price */}
          </h4>

          {/* Buttons to decrease and increase product quantity */}
          <div className="buttons">
            <button onClick={() => reduceQuantity()}>-</button>{' '}
            {/* Decrease quantity button */}
            <span>{quantity}</span> {/* Displaying product quantity */}
            <button onClick={increaseQuantity}>+</button>{' '}
            {/* Increase quantity button */}
          </div>

          {/* Button to remove the product from the cart */}
          <div onClick={() => removeFromCart(id)} className="delete">
            <i className="fa-solid fa-trash"></i>{' '}
            {/* Trash icon for delete functionality */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem; // Exporting the CartItem component for use in other parts of the application

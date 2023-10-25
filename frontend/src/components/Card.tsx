// Importing necessary dependencies and types from external files
import { useContext } from 'react';
import CartContext from '../CartContext'; // Importing CartContext for managing the shopping cart state
import { CartContextProps, Product } from '../types/types'; // Importing types for better type safety

// Interface representing the structure of the ProductList prop
interface ProductList {
  product: Product;
}

// Functional component representing a product card
const Card: React.FC<ProductList> = ({
  product: { id, image, name, price }, // Destructuring product object from props
}) => {
  // Accessing addToCart function from CartContext using useContext hook
  const { addToCart } = useContext(CartContext) as CartContextProps;

  // Rendering the product card UI
  return (
    <div>
      <img src={image} alt={name} /> {/* Displaying product image */}
      {/* Displaying product name and price */}
      <div className="d-flex">
        <div className="title">
          <h3>{name}</h3>
          <p>₦{price.toLocaleString()}</p>
        </div>

        {/* Button to add the product to the cart */}
        <div onClick={() => addToCart(id, name, price, image)} className="bag">
          <i className="fa-solid fa-bag-shopping"></i> {/* Shopping bag icon */}
        </div>
      </div>
    </div>
  );
};

export default Card; // Exporting the Card component for use in other parts of the application

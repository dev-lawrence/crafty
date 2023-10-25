// Importing necessary dependencies from React
import { useState, createContext, ReactNode } from 'react';
import { Product, CartContextProps } from './types/types'; // Importing types for better type safety

// Interface for the CartProviderProps prop
interface CartProviderProps {
  children: ReactNode; // ReactNode type to allow rendering any type of children components
}

// Creating a context for managing the shopping cart state
const CartContext = createContext<CartContextProps | undefined>(undefined);

// CartProvider component responsible for managing the cart state and providing it to the components
export function CartProvider({ children }: CartProviderProps) {
  // State to store the products in the cart
  const [products, setProducts] = useState<Product[]>([]);

  // Function to add a product to the cart or update its quantity if it already exists
  const addToCart = (
    id: number,
    name: string,
    price: number,
    image: string
  ) => {
    const existingProduct = products.find((product) => product.id === id);
    if (existingProduct) {
      const updatedProducts = products.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity! + 1 };
        }
        return product;
      });
      setProducts(updatedProducts);
    } else {
      // Adding a new product to the cart if it doesn't already exist
      setProducts((prevProducts) => [
        ...prevProducts,
        { id, name, price, image, quantity: 1 },
      ]);
    }
  };

  // Function to reduce the quantity of a product in the cart
  const reduceCartQuantity = (id: number) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        const updatedQuantity = product.quantity! - 1;
        if (updatedQuantity < 1) {
          removeFromCart(id);
        }
        return { ...product, quantity: updatedQuantity };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  // Function to remove a product from the cart
  const removeFromCart = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  // Providing the cart state and related functions to the components through context
  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        reduceCartQuantity,
        removeFromCart,
      }}
    >
      {/* Rendering the children components wrapped in the context provider */}
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;

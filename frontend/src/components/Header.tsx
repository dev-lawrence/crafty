import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import CartList from './CartList';
import CartContext from '../CartContext';
import { CartContextProps } from '../types/types';

const Header = () => {
  const [cartClick, setCartClick] = useState<boolean>(false);
  const { products } = useContext(CartContext) as CartContextProps;

  // Function to open the cart list
  const handleCartClick = () => {
    setCartClick(!cartClick);
  };

  return (
    <>
      <header id="header-section">
        <div className="container">
          <div className="content d-flex">
            {/* Logo */}
            <Link to="/" className="logo">
              Crafty
            </Link>

            {/* Cart button */}
            <button className="toggle-cart icon-btn" onClick={handleCartClick}>
              <i className="fa-solid fa-bag-shopping"></i>
              <span>{products.length}</span>
            </button>
          </div>

          {/* Cart list */}
          <CartList cartClick={cartClick} handleCartClick={handleCartClick} />
        </div>
      </header>
    </>
  );
};

export default Header;

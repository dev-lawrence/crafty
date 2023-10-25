import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// layouts
import RootLayout from './RootLayout';

// pages
import Home from './Home';
import { CartProvider } from './CartContext';
import CheckoutSuccess from './Checkout-success';
import Order from './Order';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="checkout-success" element={<CheckoutSuccess />} />
      <Route path="order" element={<Order />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  );
};

export default App;

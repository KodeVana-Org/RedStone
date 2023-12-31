import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/Product.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import { Payment } from "./pages/Payment.jsx"
import Cart from './pages/Cart.jsx';
import { CartProvider } from './components/cart/cardContext.jsx';
import Account from './pages/Account.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <CartProvider>
        <div>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={token ? <Cart /> : <Navigate to="/" />} />
            <Route path="/account" element={<Account />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  )
}

export default App

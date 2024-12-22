import Home from './pages/Home';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router'
import ProductDetails from './components/ProductDetails';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './components/Cart'
const App =()=>{
  const [cartItem , setCartItem] = useState([]);

  return (
  
    <div className="App">

      <BrowserRouter>

        <div>
          <ToastContainer theme='dark' position='top-center' />
          
          <Header cartItem={cartItem} />
          <Routes>
            <Route path='/' element={<Home  />} />
            <Route path='/search' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails cartItem={cartItem} setCartItem={setCartItem} />} />
            <Route path='/cart' element={<Cart cartItem={cartItem} setCartItem={setCartItem} />} />
            
          </Routes>
      <Footer />

        </div>

      </BrowserRouter>

    </div>
  );
}




export default App;

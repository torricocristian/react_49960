import React from 'react';
import './assets/styles/base.scss';
import './assets/styles/fonts/riode.scss';
import Header from './layouts/header/Header';
import Footer from './layouts/footer/footer';
import Home from './layouts/home/Home';
import ShoppingCart from './layouts/cart/ShoppingCart';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import PageListProduct from './layouts/product/PageListProduct';
import PageDetailProduct from './layouts/product/PageDetailProduct';

import CartContextProvider from './context/CartContext';


function App() {
  
  return (


    <CartContextProvider>
      <BrowserRouter>
        <Header />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/nosotros"  element={<h2>Nosotros</h2>}/>  
            <Route exact path="/cart"  element={<ShoppingCart/>}/>  
            <Route exact path="/productos"  element={<PageListProduct/>}/>  
            <Route exact path="/productos/:slugProduct"  element={<PageDetailProduct />}/>      
        </Routes>

        <Footer />
        
      </BrowserRouter>
    </CartContextProvider>

    
      
  );
}

export default App;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Product } from './components/Product/Product';
import { Cart } from './components/Cart/Cart';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getData } from './api/api';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PRODUCTS, GET_CURRENCIES_LIST } from './store/storeReducer';

function App() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);

  useEffect(() => {
    getData()
    .then(result => {
      setCategories(result);
      dispatch({ type: GET_CURRENCIES_LIST, payload: result[0].products[0].prices });
      dispatch({ type: SET_PRODUCTS, payload: result[0].products });
    })
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
      <Header categories={categories} />
      <Routes>
            <Route 
              path='all'
              element={
                <Main products={products}/>}> 
            </Route>
            <Route 
              path='tech'
              element={
                <Main products={products}/>}> 
            </Route>
            <Route 
              path='clothes'
              element={
                <Main products={products}/>}> 
            </Route>

            <Route 
              path='/' 
              element={<Navigate replace to='/all'/>}>
            </Route>

            <Route 
              path='cart' 
              element={
              <Cart 
              />}>
            </Route>
          </Routes>
      <Routes>
          {products.map((product: any) => (
              <Route 
                path={`/${product.id}`}
                key={product.id}
                element={
                <Product 
                product={product}
                />}>
              </Route>
            ))}
          </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
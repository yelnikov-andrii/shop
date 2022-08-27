/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Product } from './components/Product/Product';
import { Cart } from './components/Cart/Cart';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getData } from './api/api';
import { useDispatch } from 'react-redux';
import { GET_CURRENCIES_LIST } from './store/storeReducer';
import { Category } from './types/type';

const  App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);
  const [techProducts, setTechProducts] = useState([]);
  const [clothProducts, setClothProducts] = useState([]);

  useEffect(() => {
    getData()
    .then(result => {
      setCategories(result);
      dispatch({ type: GET_CURRENCIES_LIST, payload: result[0].products[0].prices });
      setAllProducts(result[0].products);
      setClothProducts(result[1].products);
      setTechProducts(result[2].products);

    })
  }, []);

  return (
    <HashRouter>
      <div className="App">
      <Header categories={categories} />
      <Routes>
            <Route 
              path='/'
              element={
                <Main products={allProducts}/>}> 
            </Route>
            <Route 
              path='tech'
              element={
                <Main products={techProducts}/>}> 
            </Route>
            <Route 
              path='clothes'
              element={
                <Main products={clothProducts}/>}> 
            </Route>

            <Route 
              path='/all' 
              element={<Navigate replace to='/'/>}>
            </Route>

            <Route 
              path='cart' 
              element={
              <Cart 
              />}>
            </Route>
          </Routes>
      <Routes>
          {allProducts.map((product: any) => (
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
    </HashRouter>
  );
}

export default App;

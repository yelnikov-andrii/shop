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
import { Order } from './components/Order/Order';
import { Oval } from 'react-loader-spinner';

const  App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);
  const [techProducts, setTechProducts] = useState([]);
  const [clothProducts, setClothProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData()
    .then(result => {
      try {
      setIsLoading(true);
      setCategories(result);
      dispatch({ type: GET_CURRENCIES_LIST, payload: result[0].products[0].prices });
      setAllProducts(result[0].products);
      setClothProducts(result[1].products);
      setTechProducts(result[2].products);
      setIsLoading(false);
      } catch {
        setIsError(true);
      }
      
    })
  }, []);

  if (isError) {
    return (
      <div className='main__title'>
        Error! Can not load data!!!
      </div>
    )
  }

  return (
    <HashRouter>
      <div className="App">
      <Header categories={categories} />
      {isLoading ? (
        <div className='container'>
          <div className='main__title'>
          Loading...
        <Oval
          height={40}
          width={40}
          color="#5ECE7B"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        </div>
        </div>
      ) : (
<>
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

            <Route 
              path='/order' 
              element={
              <Order/>}>
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
</>
      )}
    </div>
    </HashRouter>
  );
}

export default App;

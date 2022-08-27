/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INCREASE_QUANTITY, GET_QUANTITY_OF_PRODUCTS, DECREASE_QUANTITY, GET_TOTAL_PRICE, SET_TRANSLATE_TO_PRIDUCT } from '../../store/storeReducer';

export const Cart = () => {
  const selectedProducts = useSelector((state: any) => state.selectedProducts);
  const selectedCurrency = useSelector((state: any) => state.selectedCurrency);
  const quantityOfProducts = useSelector((state: any) => state.quantityOfProducts);
  const total = useSelector((state: any) => state.totalPrice) || 0;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: GET_TOTAL_PRICE});
  }, [])
  

  return (
    <section className='cart'>
      <div className='container'>
        <h2 className='cart__title'>Cart</h2>
        {selectedProducts.length === 0 ? (
          <div className='product-description__brand'> 
            No products selected
          </div>

        ) : (
          <div className='cart__block'>
        {selectedProducts.map((product: any) => (
          <React.Fragment key={product.id}>
              <div className='cart__block-item'>
                <div className='cart__block-description product-description'>
                <h1 className='product-description__brand'>
                  {product.brand}
                </h1>
                <p className='product-description__name'>
                  {product.name}
                </p>
                <p className='product-description__price-title'>
                  Price:
                </p>
                <p className='product-description__price-value'>
                  {`${selectedCurrency}` + product.prices.find((x: any) => x.currency.symbol === selectedCurrency).amount}
                </p>
                {product.attributes.map((attribute: any) => (
                  <React.Fragment key={attribute.id}>
                  <span className='product-description-list-title'>
                    {attribute.id}:
                  </span>
                  <ul className='product-description__list'>
                    {attribute.items.map((item: any) => {
                      if (attribute.id === 'Color') {
                        return (
                          <li
                            className={product.selAttr !== undefined && product.selAttr.find((atr: any) => atr[attribute.id] === item.id) ? 
                              'product-description__list-item--color product-description__list-item product-description__list-item--color-selected' 
                              : 'product-description__list-item--color product-description__list-item'}
                            style={{backgroundColor: `${item.value}`}}
                            key={item.id}
                            >
                          </li>
                        )
                      } else {
                        return (
                          <li 
                          className={product.selAttr !== undefined && product.selAttr.find((atr: any) => atr[attribute.id] === item.id) 
                            ? 'product-description__list-item product-description__list-item--selected' 
                            : 'product-description__list-item'}
                            key={item.id}
                            >
                              {item.displayValue}
                          </li>
                        )
                      }
                    })}
                  </ul>
                  </React.Fragment>
                ))}
                </div>
                <div className='cart__block-quantity'>
                  <div className='cart__block-quantity_selectors'>
                    <button 
                      className='cart__block-quantity_selectors-btn'
                      onClick={() => {
                        dispatch({type: INCREASE_QUANTITY, payload: product.id});
                        dispatch({type: GET_QUANTITY_OF_PRODUCTS});
                        dispatch({type: GET_TOTAL_PRICE});
                      }}
                    >
                      +
                    </button>
                    <span className='cart__block-quantity_selectors-value'>
                      {product.qty}
                    </span>
                    <button 
                      className='cart__block-quantity_selectors-btn'
                      onClick={() => {
                        dispatch({type: DECREASE_QUANTITY, payload: product.id});
                        dispatch({type: GET_QUANTITY_OF_PRODUCTS});
                        dispatch({type: GET_TOTAL_PRICE});
                      }}
                    >
                      -
                    </button>
                  </div>
                  <div className='cart__block-slider-wrapper'>
                  <button 
                    className='cart__block-slider-btn cart__block-slider-btn--left'
                      onClick={() => {
                        if (product.translate === 0) {
                          return
                        } else {
                          dispatch({type: SET_TRANSLATE_TO_PRIDUCT, payload: {id: product.id, value: 210, }});
                          console.log(selectedProducts)
                        }
                      }}
                  >
                    &#10094;
                  </button>
                  <button 
                    className='cart__block-slider-btn'
                    onClick={() => {
                      if (product.translate <= 210 * -1 * (product.gallery.length - 1)) {
                        return
                      } else {
                        dispatch({type: SET_TRANSLATE_TO_PRIDUCT, payload: {id: product.id, value: -210, }});
                        console.log(selectedProducts)
                      }
                    }}
                  >
                    &#10095;
                  </button>
                  <div 
                    className='cart__block-quantity_images'
                    style={{transform: `translateX(${product.translate}px)`}}
                  >
                    {product.gallery.map((image: any) => (
                      <img 
                      src={image} 
                      alt='' 
                      className='cart__block-quantity_images-img'
                      key={image.id}
                      />
                    ))}
                  </div>
                  </div>
                </div>
              </div>
          </React.Fragment>
        ))}
        <div className='cart__block-bottom'>
          <ul className='cart__block-bottom-list'>
            <li className='cart__block-bottom-list_item'>
              Tax 21%: <span className='cart__block-bottom-list_item-value'>
                {`${selectedCurrency}`+ (total * 0.21).toFixed(2)}
              </span>
            </li>

            <li className='cart__block-bottom-list_item'>
              Quantity: <span className='cart__block-bottom-list_item-value'>
                {quantityOfProducts}
              </span>
            </li>

            <li className='cart__block-bottom-list_item'>
              Total: <span className='cart__block-bottom-list_item-value'>
                  {`${selectedCurrency}${total}`}
                </span>
            </li>
          </ul>
          <button className='cart__block-bottom-button'>
            Order
          </button>
        </div>
        </div>
        )}
      </div>
    </section>
  )
};
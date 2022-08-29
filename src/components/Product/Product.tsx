/* eslint-disable @typescript-eslint/no-redeclare */
import classNames from 'classnames';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PRODUCT_TO_CART, GET_QUANTITY_OF_PRODUCTS } from '../../store/storeReducer';
import { State, SelectedProduct, ProductType, Price, Attribute, Item } from '../../types/type';

type Props = {
  product: ProductType,
}

export const Product: React.FC <Props> = ({product}) => {
  const images = product.gallery;
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const[selectedProduct, setSelectedProduct] = useState<SelectedProduct>();
  const [messageAboutAdding, setMessageAboutAdding] = useState('');
  const [messageIsActive, setMessageIsActive] = useState(false);
  const [colorOfMessage, setColorOfMessage] = useState('');
  const selectedCurrency = useSelector((state: State) => state.selectedCurrency);
  const dispatch = useDispatch();

  const price = product.prices.find((item: Price) => item.currency.symbol === selectedCurrency);

  const getDescription = (value: string) => {
    if (value) {
      const elem = document.getElementById('desc');
      if (elem) {
        elem.innerHTML = value;
      }
    }
  }

  const addMessageAboutAdding = (value: string, color: string) => {
    setMessageAboutAdding(value);
    setMessageIsActive(true);
    setColorOfMessage(color);

    setTimeout(() => {
      setMessageAboutAdding('');
      setMessageIsActive(false);
    }, 2000)
  }

  useEffect(() => {
    getDescription(product.description);
    const prod = {...product};
    prod.translate = 0;
    prod.selAttr = [];
    prod.qty = 0;
    setSelectedProduct(prod);

  }, [product]);

  return (
    <div className='container'>
      <article className='product'>
      <div className='product__block-images'>
        <div className='product__block-images_aside'>
          {images.map((image: string) => (
            <img 
              src={image} 
              alt=''
              className='product__block-images_aside--small'
              key={image}
              onClick={() => {
                setSelectedImage(image);
              }}/>
          ))}
        </div>
          <div className='product__block-images_main'>
            <img 
              src={selectedImage}
              alt=''
              className='product__block-images_main--large'
            />
          </div>
        </div>
        <div className='product__block-description product-description'>
          <h1 className='product-description__brand'>
            {product.brand}
          </h1>
          <p className='product-description__name'>
            {product.name}
          </p>
          {product.attributes.map((attribute: Attribute) => (
            <React.Fragment key={attribute.id}>
            <span className='product-description-list-title'>
              {attribute.id}:
            </span>
            <ul className='product-description__list'>
              {attribute.items.map((item: Item) => {
                if (attribute.id === 'Color') {
                  return (
                    <li
                      className={selectedProduct?.selAttr !== undefined && selectedProduct.selAttr.find((atr: any) => atr[attribute.id] === item.id) 
                        ? 'product-description__list-item--color product-description__list-item product-description__list-item--color-selected' 
                        : 'product-description__list-item--color product-description__list-item'}
                      key={item.id}
                      style={{backgroundColor: `${item.value}`}}
                      onClick={() => {
                        const value = item.id;
                        const newAttr = {
                          [attribute.id]: value,
                        };
                        if (selectedProduct) {
                          if (selectedProduct.selAttr !== undefined) {
                            if (selectedProduct.selAttr.find((atr: any) => atr.hasOwnProperty([attribute.id]))) {
                              setSelectedProduct({...selectedProduct, selAttr: [...selectedProduct.selAttr.filter((atr: any) => !atr.hasOwnProperty([attribute.id])), newAttr]});
                            } else {
                              setSelectedProduct({...selectedProduct, selAttr: [...selectedProduct.selAttr, newAttr]});
                            }
                            
                          } else {
                            setSelectedProduct({...selectedProduct, selAttr: [newAttr]});
                          }
                        }
                        }}
                    >
                  </li>
                  )
                } else {
                  return (
                    <li 
                      className={selectedProduct?.selAttr !== undefined && selectedProduct.selAttr.find((atr: any) => atr[attribute.id] === item.id)  
                        ? 'product-description__list-item product-description__list-item--selected' 
                        : 'product-description__list-item'}
                      key={item.id}
                      onClick={() => {
                        const value = item.id;
                        const newAttr = {
                          [attribute.id]: value,
                        };
                        if (selectedProduct) {
                          if (selectedProduct.selAttr !== undefined) {
                            if (selectedProduct.selAttr.find((atr: any) => atr.hasOwnProperty([attribute.id]))) {
                              setSelectedProduct({...selectedProduct, selAttr: [...selectedProduct.selAttr.filter((atr: any) => !atr.hasOwnProperty([attribute.id])), newAttr]});
                            } else {
                              setSelectedProduct({...selectedProduct, selAttr: [...selectedProduct.selAttr, newAttr]});
                            }
                            
                          } else {
                            setSelectedProduct({...selectedProduct, selAttr: [newAttr]});
                          }
                        }
                      }}
                    >
                      {item.displayValue}
                    </li>
                  )
                }
              })}
            </ul>
            </React.Fragment>
          ))}
          <p className='product-description__price-title'>
            Price:
          </p>
          <p className='product-description__price-value'>
            {`${price?.currency.symbol} ${price?.amount}`}
          </p>

          {product.inStock ? (
            <div className='product-description__buttons-block'>
            <button 
              className='product-description__button'
              onClick={() => {
                if (selectedProduct?.selAttr.length !== 0 && selectedProduct?.selAttr.length === product.attributes.length) {
                  const productToAdd = {...selectedProduct}
                productToAdd.qty = 1;
                productToAdd.translate = 0;
                dispatch({type: ADD_PRODUCT_TO_CART, payload: productToAdd});
                dispatch({type: GET_QUANTITY_OF_PRODUCTS});
                addMessageAboutAdding('Good has been added', 'green');
                } else {
                  addMessageAboutAdding('You have to choose an attributes!!!', 'red')
                }
              }}>
              Add to cart
            </button>
            <div className={classNames('product-description__message', {
              'product-description__message--active': messageIsActive,
              'product-description__message--red': colorOfMessage === 'red',
            })}>{messageAboutAdding}</div>
            </div>
          ) : (
            <button className='product-description__button product-description__button--outOfStock'>
              Add to cart
            </button>
          )}
          <div 
            id='desc' 
            className='product-description__description'
          >
          </div>
        </div>
        </article>
      </div>

  )
};
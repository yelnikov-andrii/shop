import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import classNames from "classnames";
import { Price, ProductType, State } from '../../types/type';

type Props = {
  products: ProductType[],
}

export const Main: React.FC <Props> = ({products}) => {
  const selectedCategory = useSelector((state: State) => state.selectedCategory);
  const selectedCurrency = useSelector((state: State) => state.selectedCurrency);

  return (
    <main
    className='main'
  >
    <div
      className='container'
    >
      <h2 className='main__title'>
        {selectedCategory[0].toUpperCase() + selectedCategory.slice(1)}
      </h2>
    <div
      className='main__block'
    >
      {products.length !== 0 && (products.map((product: ProductType) => (
        <NavLink 
          className={classNames('main__block-item product-card', {
            'main__block-item product-card  product-card--outstock': !product.inStock,
          })}
          to={`/${product.id}`}
          key={product.id}
        >
          <img src={product.gallery[0]} alt='' className='product-card__image'/>
          <p className='product-card__name'>
          {product.name}
          </p>
          <p className='product-card__price'>
            {selectedCurrency}
            {product.prices.find((price: Price) => price.currency.symbol === selectedCurrency)?.amount}
          </p>
        </NavLink>
      )))}
    </div>
    </div>
  </main>
  )
}
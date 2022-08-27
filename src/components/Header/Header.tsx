/* eslint-disable react-hooks/exhaustive-deps */
import Brand_icon from '../../images/Brand_icon.svg';
import Empty_Cart from '../../images/Empty_Cart.svg';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_CATEGORY, SET_PRODUCTS } from '../../store/storeReducer';
import { Select } from '../Select/Select';

type Props = {
  categories: any;
}

export const Header: React.FC <Props> = ({ categories }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: any) => state.selectedCategory);
  const quantityOfProducts = useSelector((state: any) => state.quantityOfProducts);

  return (
    <header
    className='header'
  >
    <div className='container'>
    <nav
      className='header__nav'
    >
      <ul
        className='header__list'
      >
        {categories.map((category: any) => (
            <Link
              to={`/${category.name}`}
              key={category.name}
              onClick={() => {
                dispatch({ type: SELECT_CATEGORY, payload: category.name });
                dispatch({type: SET_PRODUCTS, payload: category.products});
            }}
            className={classNames('header__list-item', {
          'header__list-item--active': selectedCategory === category.name})}
            >
              {category.name}
            </Link>

        ))}
      </ul>
      <Link to='/all' onClick={() => {
        dispatch({ type: SELECT_CATEGORY, payload: 'all' });
        dispatch({type: SET_PRODUCTS, payload: categories[0].products});
      }}>
        <img 
          src={Brand_icon} 
          alt='brand icon' 
          className='header__logo'
        />
      </Link>
      <ul className='header__list-shopping'>
        <li className='header__list-shopping_item'>
          <Select />
        </li>
        <li className='header__list-shopping_item'>
          <NavLink 
            className='header__btn'
            to='cart'
          >
            <img src={Empty_Cart} alt='empty cart'/>
            {quantityOfProducts !== 0 && (
              <span className='header__amount-of-products'>{quantityOfProducts}</span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
    </div>
  </header>
  )
}
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENCY } from "../../store/storeReducer";

export const Select = () => {
  const [open, setOpen] = useState(false);
  const currencies = useSelector((state: any) => state.currenciesList);
  const selectedCurrency = useSelector((state: any) => state.selectedCurrency);
  const dispatch = useDispatch();

  return (
    <ul className='select'>
      <div 
        className={open ? 'select__button select__button--open' : 'select__button'}
        onClick={() => {
          setOpen(!open)
        }}
        >
            {selectedCurrency}
          </div>
          <div className={open ? 'select__content select__content--open' : 'select__content'}>
            {currencies.map((currency: any) => (
              <div 
                className="select__content-item"
                key={currency.currency.symbol}
                onClick={() => {
                  dispatch({type: SET_CURRENCY, payload: currency.currency.symbol})
                  setOpen(false)
                }}>
                <span className="select__content-item_symbol">
                  {currency.currency.symbol}
                </span>
                <span>
                  {currency.currency.label}
                </span>
              </div>
            ))}
          </div>
    </ul>
  )
}
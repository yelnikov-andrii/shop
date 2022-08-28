
export const SELECT_CATEGORY = 'select_category';
export const SET_PRODUCTS = 'set_products';
export const GET_QUANTITY_OF_PRODUCTS = 'set_quantity_of_products';
export const GET_CURRENCIES_LIST = 'get_curr_list';
export const SET_CURRENCY = 'set_currency';
export const ADD_PRODUCT_TO_CART = 'set_selected_products';
export const INCREASE_QUANTITY = 'increase_qty';
export const DECREASE_QUANTITY = 'decrease_qty';
export const GET_TOTAL_PRICE = 'get_total_price';
export const SET_TRANSLATE_TO_PRIDUCT = 'set_translate';
export const CLEAR_SELECTED_PRODUCTS = 'clear_products';

const defaultState = {
  selectedCategory: 'all',
  products: [],
  quantityOfProducts: 0,
  currenciesList: [],
  selectedCurrency: '$',
  selectedProducts: [],
  totalPrice: 0,
};

export const storeReducer = (
  state: any = defaultState, action: any,
) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return { ...state, selectedCategory: action.payload }

    case SET_PRODUCTS:
      return { ...state, products: action.payload }

    case GET_QUANTITY_OF_PRODUCTS:
      return { ...state, quantityOfProducts: state.selectedProducts.reduce((a: any, b: any) => a + b.qty, 0) || 0 }

    case GET_CURRENCIES_LIST:
      return { ...state, currenciesList: action.payload }

    case SET_CURRENCY:
      return { ...state, selectedCurrency: action.payload }

    case ADD_PRODUCT_TO_CART:
      if (state.selectedProducts.find((el: any) => el.name === action.payload.name)) {
        const foundEl = state.selectedProducts.find((el: any) => el.name === action.payload.name);
        foundEl.qty++;
        return {...state, selectedProducts: [...state.selectedProducts]}
      }
        return { ...state, selectedProducts: [...state.selectedProducts, action.payload
        ] }

    case INCREASE_QUANTITY:
      const elem = state.selectedProducts.find((el: any) => el.id === action.payload);
      elem.qty++;
      return {...state, selectedProducts: [...state.selectedProducts]}

    case DECREASE_QUANTITY:
      const foundEl = state.selectedProducts.find((el: any) => el.id === action.payload);
      foundEl.qty--;
      if (foundEl.qty === 0) {
        return {...state, selectedProducts: state.selectedProducts.filter(((el: any) => el.id !== action.payload))}
      }
      return {...state, selectedProducts: [...state.selectedProducts]}

      case GET_TOTAL_PRICE:
      return {...state, totalPrice: state.selectedProducts.reduce((a: any, b: any) => a + b.qty * (b.prices.find((el: any) => el.currency.symbol === state.selectedCurrency).amount), 0)}

      case SET_TRANSLATE_TO_PRIDUCT:
        const theel = state.selectedProducts.find((pro: any) => pro.id === action.payload.id);
        theel.translate = theel.translate + action.payload.value;
      return {...state, selectedProducts: [...state.selectedProducts]}

      case CLEAR_SELECTED_PRODUCTS:
      return {...state, selectedProducts: []};

    default:
      return state;
  }
};

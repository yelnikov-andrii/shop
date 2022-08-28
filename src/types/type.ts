
export type Item = {
  value: string,
  id: string,
  displayValue: string,
}

export type Attribute = {
  id: string,
  name: string,
  type: string,
  items: Item[],
}

type Symbol = '$' | '£' | 'A$' | '¥' | '₴';

export type Currency = {
  symbol: Symbol,
}

export type Price = {
  amount: number,
  currency: Currency,
}

export type ProductType = {
  name: string,
  id: string,
  brand: string,
  description: string,
  inStock: boolean,
  gallery: string[],
  prices: Price[],
  attributes: Attribute[],
  translate: number,
  qty: number,
  selAttr: any[],
}

export type Category = {
  name: string,
  products: ProductType[],
}


export type SelectedProduct = ProductType & {
  qty?: number,
  selAttr?: any[],
  translate: number,
}

export type State = {
  selectedCategory: string,
  products: ProductType[],
  quantityOfProducts: number,
  currenciesList: Price[],
  selectedCurrency: Symbol,
  selectedProducts: SelectedProduct[],
  totalPrice: number
}
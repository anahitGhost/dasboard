import _ from 'lodash';
import {
  GET_PRODUCTS,
} from '../actions/products';

const initialState = {
  products: [],
  productsStatus: '',
  productsTotalPages: 1,
  productsTotal: 1,
  nextOffset: 0,
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PRODUCTS.REQUEST: {
      return {
        ...state,
        productsStatus: 'request',
      };
    }
    case GET_PRODUCTS.SUCCESS: {
      const { data: { total, nextOffset, products }, cache } = action.payload;
      let finalProducts = products;
      if (cache) {
        finalProducts = [...state.products, ...products];
      }
      return {
        ...state,
        products: finalProducts,
        productsStatus: 'ok',
        productsTotalPages: Math.ceil(total / 20),
        nextOffset,
        productsTotal: total,
      };
    }
    case GET_PRODUCTS.FAIL: {
      return {
        ...state,
        products: [],
        productsStatus: 'fail',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

import _ from 'lodash';
import { GET_ORDERS, USERS_AUTOCOMPLETE } from '../actions/orders';

const initialState = {
  orders: [],
  ordersStatus: '',
  ordersTotalPages: 1,
  usersAutocomplete: [],
  usersAutocompleteStatus: '',

};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ORDERS.REQUEST: {
      return {
        ...state,
        ordersStatus: 'request',
      };
    }
    case GET_ORDERS.SUCCESS: {
      const { orders, totalPages } = action.payload.data;
      let finalOrders = orders;
      if (action.payload.cache) {
        finalOrders = _.uniqBy([...state.orders, ...orders], 'id');
      }
      return {
        ...state,
        orders: finalOrders,
        ordersStatus: 'ok',
        ordersTotalPages: totalPages,
      };
    }
    case GET_ORDERS.FAIL: {
      return {
        ...state,
        ordersStatus: 'fail',
      };
    }
    case USERS_AUTOCOMPLETE.REQUEST: {
      return {
        ...state,
        usersAutocompleteStatus: 'request',
      };
    }
    case USERS_AUTOCOMPLETE.SUCCESS: {
      const { list } = action.payload.data;
      return {
        ...state,
        usersAutocompleteStatus: 'ok',
        usersAutocomplete: list,
      };
    }
    case USERS_AUTOCOMPLETE.FAIL: {
      return {
        ...state,
        usersAutocompleteStatus: 'fail',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

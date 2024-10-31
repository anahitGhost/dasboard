import { define } from '../redux-request';
import Api from '../../Api';

export const GET_ORDERS = define('GET_ORDERS');

export function getOrdersRequest(data, cache = true) {
  return GET_ORDERS.request(() => Api.getOrders({
    ...data, order: 'desc', orderBy: 'createdAt',
  })).onSuccess((p) => {
    p.cache = cache;
    return p;
  });
}

export const USERS_AUTOCOMPLETE = define('USERS_AUTOCOMPLETE');

export function usersAutocompleteRequest(sName) {
  return USERS_AUTOCOMPLETE.request(() => Api.usersAutocomplete(sName));
}

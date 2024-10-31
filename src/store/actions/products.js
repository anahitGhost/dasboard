import { define } from '../redux-request';
import Api from '../../Api';

export const GET_PRODUCTS = define('GET_PRODUCTS');

export function getProductsRequest(data, cache = true) {
  return GET_PRODUCTS.request(() => Api.getProducts({
    order: 'desc', orderBy: 'createdAt', nextOffset: 0, ...data,
  })).onSuccess((p) => {
    p.cache = cache;
    return p;
  });
}

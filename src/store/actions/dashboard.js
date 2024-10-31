import { define } from '../redux-request';
import Api from '../../Api';

export const GET_ORDERS_CATEGORIES = define('GET_ORDERS_CATEGORIES');

export function getOrdersCategoriesRequest(data) {
  return GET_ORDERS_CATEGORIES.request(() => Api.getOrdersCategories(data));
}

export const GET_ORDERS_SALES = define('GET_ORDERS_SALES');

export function getOrdersSalesRequest(data) {
  return GET_ORDERS_SALES.request(() => Api.getOrdersSales(data));
}

export const GET_ORDERS_MEMBERS = define('GET_ORDERS_MEMBERS');

export function getOrdersMembersRequest(data) {
  return GET_ORDERS_MEMBERS.request(() => Api.getOrdersMembers(data));
}

export const GET_ORDERS_PRODUCTS_HEALTH_PLAN = define('GET_ORDERS_PRODUCTS_HEALTH_PLAN');

export function getOrdersProductsHealthPlanRequest(data) {
  return GET_ORDERS_PRODUCTS_HEALTH_PLAN.request(() => Api.getOrdersProductsHealthPlan(data));
}

export const GET_USERS_STATISTIC_PATIENT = define('GET_USERS_STATISTIC_PATIENT');

export function getUsersStatisticPatientsRequest(data) {
  return GET_USERS_STATISTIC_PATIENT.request(() => Api.getUsersStatisticPatients(data));
}

export const GET_ORDERS_STATISTIC_SALES = define('GET_ORDERS_STATISTIC_SALES');

export function getOrdersStatisticSalesRequest(data) {
  return GET_ORDERS_STATISTIC_SALES.request(() => Api.getOrdersStatisticSales(data));
}

export const GET_PAYMENT_ALLOCATED_FUNDS = define('GET_PAYMENT_ALLOCATED_FUNDS');

export function getOPaymentsStatisticFundsRequest() {
  return GET_PAYMENT_ALLOCATED_FUNDS.request(() => Api.getPaymentsAllocatedFunds());
}

export const GET_PAYMENT_FUNDS_USED = define('GET_PAYMENT_FUNDS_USED');

export function getOPaymentsStatisticFundsUsedRequest(data) {
  return GET_PAYMENT_FUNDS_USED.request(() => Api.getOrdersUsedFunds(data));
}

export const GET_ORDERS_REGISTERED = define('GET_ORDERS_REGISTERED');

export function getOrdersRegisteredRequest(data) {
  return GET_ORDERS_REGISTERED.request(() => Api.getOrdersRegistered(data));
}

export const GET_BENEFIT_SALES = define('GET_BENEFIT_SALES');

export function getBenefitIdsRequest(data) {
  return GET_BENEFIT_SALES.request(() => Api.getBenefitSales(data)).onSuccess((p) => {
    p.balanceTypeId = data.balanceTypeId;
    return p;
  });
}

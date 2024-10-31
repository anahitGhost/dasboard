import axios from 'axios';
import moment from 'moment';
import fileDownload from 'js-file-download';
import { serialize } from 'object-to-formdata';
import Account from './helpers/Account';

const { REACT_APP_API_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_API_URL,
  'content-type': 'application/json',
});

api.interceptors.request.use((config) => {
  const token = Account.getToken('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((res) => res, (error) => {
    // if (error?.response?.status === 401) {
    //   Account.delete();
    //   window.location.href = '/';
    // }
  return Promise.reject(error);
});

const apiTokens = {};

function toFormData(data, indices = false) {
  return serialize({ ...data }, { indices });
}

class Api {
  static cancel(methodName) {
    if (apiTokens[methodName]) {
      apiTokens[methodName]();
    }
  }

  static cancelToken(methodName) {
    return new axios.CancelToken((token) => {
      apiTokens[methodName] = token;
    });
  }

  static login(medicalId, password) {
    return api.post('/users/login/health-plan/admins', { medicalId, password });
  }

  static forgotPassword(data) {
    return api.post('/users/forgot/health-plan/password', data);
  }

  static restorePassword(data) {
    return api.post('/users/update/health-plan/password', data);
  }

  static getHealthplans(params) {
    return api.get('/health-plans', { params });
  }

  static getPatientInfo(id) {
    return api.get('/users/profile', { params: { id } });
  }

  static getPatients(params) {
    this.cancel('getPatients');
    return api.get('/users/patients', { params, cancelToken: this.cancelToken('getPatients') });
  }

  static getProfile() {
    return api.get('/users/profile');
  }

  static getProducts(data) {
    return api.post('/products/get/list', data);
  }

  static getNotifications(params) {
    return api.get('/notifications', { params });
  }

  static getUnreadNotificationsCount() {
    return api.get('/notifications/unread/count');
  }

  static markNotificationsAsRead() {
    return api.post('/notifications/mark/read');
  }

  static getOrdersCategories(data) {
    return api.get('/orders/categories/top', { params: data });
  }

  static getOrdersSales(data) {
    return api.get('/orders/sales/top', { params: data });
  }

  static getOrdersMembers(data) {
    return api.get('/orders/top/members', { params: data });
  }

  static getOrdersProductsHealthPlan(data) {
    return api.get('/orders/top/products/health-plan-based', { params: data });
  }

  static getUsersStatisticPatients(data) {
    return api.get('/users/statistic/patients', { params: data });
  }

  static getOrdersStatisticSales(data) {
    return api.get('/orders/statistic/sales', { params: data });
  }

  static getPaymentsAllocatedFunds() {
    return api.post('/payments/akimbo/allocated/funds');
  }

  static getBenefitSales(data) {
    return api.get('/orders/benefit/sales', { params: data });
  }

  static getOrdersUsedFunds(data) {
    return api.get('/orders/statistic/used/funds', { params: data });
  }

  static getOrdersRegistered(data) {
    return api.get('/users/get/count', { params: data });
  }

  static getOrders(params) {
    return api.get('/orders', { params });
  }

  static usersAutocomplete(sName) {
    return api.get('/users/autocomplete', { params: { sName } });
  }

  static getScopes() {
    return api.get('/roles/scope/groups');
  }

  static getRoles() {
    return api.get('/roles/plan');
  }

  static createRole(data) {
    return api.post('/roles/create', data);
  }

  static updateRole(data) {
    return api.put('/roles/update', data);
  }

  static deleteRole(id) {
    return api.delete('/roles/delete', { data: { id } });
  }

  static async downloadPatientsReport(_data) {
    const { data } = await api.post('/orders/member/info/download', _data, {
      responseType: 'arraybuffer',
    });
    const date = moment().format('M-D-YYYY');
    fileDownload(data, `reports-${date}.xlsx`);
  }

  static downloadPatientsReportAll(data) {
    return api.post('/orders/member/info/download/all', data);
  }

  static addMember(data) {
    return api.post('/members/add', toFormData(data));
  }

  static removeMembers(ids) {
    return api.delete('/members/delete', { data: { ids } });
  }

  static getMembersList() {
    return api.get('/members/list');
  }

  static updateMember(data) {
    return api.put('/members/update', toFormData(data));
  }

  static getSingleMember(id) {
    return api.get(`/members/single/${id}`);
  }
}

export default Api;

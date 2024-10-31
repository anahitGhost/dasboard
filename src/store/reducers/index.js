import { combineReducers } from 'redux';
import account from './account';
import patients from './patients';
import products from './products';
import notifications from './notifications';
import dashboard from './dashboard';
import orders from './orders';
import roles from './roles';
import members from './members';

export default combineReducers({
  account,
  patients,
  products,
  notifications,
  dashboard,
  orders,
  roles,
  members,
});

import Account from '../helpers/Account';

export default function Logout() {
  Account.delete();
  window.location.href = '/login';
  return null;
}

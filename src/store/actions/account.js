import { define } from '../redux-request';
import Api from '../../Api';

export const LOGIN = define('LOGIN');

export function loginRequest(medicalId, password, remember) {
  return LOGIN.request(() => Api.login(medicalId, password)).onSuccess((p) => {
    p.remember = remember;
    return p;
  });
}

export const GET_PROFILE = define('GET_PROFILE');

export function getProfileRequest() {
  return GET_PROFILE.request(() => Api.getProfile());
}

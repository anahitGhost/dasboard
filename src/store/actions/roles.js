import Api from '../../Api';
import { define } from '../redux-request';

export const GET_SCOPES = define('GET_SCOPES');

export function getScopesRequest() {
  return GET_SCOPES.request(() => Api.getScopes());
}

export const GET_ROLES = define('GET_ROLES');

export function getRolesRequest() {
  return GET_ROLES.request(() => Api.getRoles());
}

export const CREATE_ROLE = define('CREATE_ROLE');

export function createRoleRequest(data) {
  return CREATE_ROLE.request(() => Api.createRole(data));
}

export const UPDATE_ROLE = define('UPDATE_ROLE');

export function updateRoleRequest(data) {
  return UPDATE_ROLE.request(() => Api.updateRole(data));
}

export const DELETE_ROLE = define('DELETE_ROLE');

export function deleteRoleRequest(id) {
  return DELETE_ROLE.request(() => Api.deleteRole(id));
}

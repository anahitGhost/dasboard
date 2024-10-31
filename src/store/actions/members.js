import { define } from '../redux-request';
import Api from '../../Api';

export const GET_MEMBERS = define('GET_MEMBERS');

export function getMembersListRequest() {
  return GET_MEMBERS.request(() => Api.getMembersList());
}

export const ADD_MEMBER = define('ADD_MEMBER');

export function addMemberRequest(data) {
  return ADD_MEMBER.request(() => Api.addMember(data));
}

export const REMOVE_MEMBERS = define('REMOVE_MEMBERS');

export function removeMembersRequest(ids = []) {
  return REMOVE_MEMBERS.request(() => Api.removeMembers(ids));
}

export const UPDATE_MEMBER = define('UPDATE_MEMBER');

export function updateMemberRequest(data) {
  return UPDATE_MEMBER.request(() => Api.updateMember(data));
}

export const GET_SINGLE_MEMBER = define('GET_SINGLE_MEMBER');

export function getSingleMemberRequest(id) {
  return GET_SINGLE_MEMBER.request(() => Api.getSingleMember(id));
}

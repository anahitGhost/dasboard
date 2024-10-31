import { define } from '../redux-request';
import Api from '../../Api';

export const GET_NOTIFICATIONS = define('GET_NOTIFICATIONS');

export function getNotificationsRequest(params, cache = false) {
  return GET_NOTIFICATIONS.request(() => Api.getNotifications(params)).onSuccess((p) => {
    p.cache = cache;
    return p;
  });
}

export const GET_UNREAD_NOTIFICATIONS_COUNT = define('GET_UNREAD_NOTIFICATIONS_COUNT');

export function getUnreadNotificationsCountRequest() {
  return GET_UNREAD_NOTIFICATIONS_COUNT.request(() => Api.getUnreadNotificationsCount());
}

export const MARK_NOTIFICATIONS_AS_RAED = define('MARK_NOTIFICATIONS_AS_RAED');

export function markNotificationsAsReadRequest() {
  return MARK_NOTIFICATIONS_AS_RAED.request(() => Api.markNotificationsAsRead());
}

export const SET_NOTIFICATIONS_COUNT = 'SET_NOTIFICATIONS_COUNT';

export function setNotificationsCount(count) {
  return {
    type: SET_NOTIFICATIONS_COUNT,
    payload: { count },
  };
}

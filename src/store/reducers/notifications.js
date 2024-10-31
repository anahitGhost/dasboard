import {
  GET_NOTIFICATIONS,
  GET_UNREAD_NOTIFICATIONS_COUNT,
  MARK_NOTIFICATIONS_AS_RAED,
  SET_NOTIFICATIONS_COUNT,
} from '../actions/notifications';
import { GET_NOTIFICATION } from '../actions/socket';

const initialState = {
  notifications: [],
  notificationsTotalPages: 0,
  notificationsStatus: '',
  notificationsCount: 0,
  notificationsCountStatus: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_NOTIFICATIONS.REQUEST: {
      return {
        ...state,
        notificationsStatus: 'request',
      };
    }
    case GET_NOTIFICATIONS.SUCCESS: {
      const { notifications, totalPages } = action.payload.data;
      console.log(action.payload.cache)
      return {
        ...state,
        notificationsStatus: 'ok',
        notifications: action.payload.cache ? [...state.notifications, ...notifications] : notifications,
        notificationsTotalPages: totalPages,
      };
    }
    case GET_NOTIFICATIONS.FAIL: {
      return {
        ...state,
        notificationsStatus: 'fail',
        notifications: [],
      };
    }
    case GET_UNREAD_NOTIFICATIONS_COUNT.REQUEST: {
      return {
        ...state,
        notificationsCountStatus: 'request',
      };
    }
    case GET_UNREAD_NOTIFICATIONS_COUNT.SUCCESS: {
      const { count } = action.payload.data;
      return {
        ...state,
        notificationsCountStatus: 'ok',
        notificationsCount: count,
      };
    }
    case GET_UNREAD_NOTIFICATIONS_COUNT.FAIL: {
      return {
        ...state,
        notificationsCountStatus: 'fail',
        notifications: [],
      };
    }
    case MARK_NOTIFICATIONS_AS_RAED.SUCCESS: {
      return {
        ...state,
        notificationsCount: 0,
      };
    }
    case GET_NOTIFICATION: {
      return {
        ...state,
        notificationsCount: state.notifications + 1,
      };
    }
    case SET_NOTIFICATIONS_COUNT: {
      return {
        ...state,
        notificationsCount: action.payload.count,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

import { io } from 'socket.io-client';
import Account from '../../helpers/Account';
import { getNotificationsRequest } from './notifications';

const { REACT_APP_API_URL } = process.env;

export const GET_NOTIFICATION = 'GET_NOTIFICATION';

let socket;

export function init() {
  return (dispatch) => {
    if (socket) {
      return;
    }
    const token = Account.getToken();

    socket = io.connect(REACT_APP_API_URL, {
      transports: ['websocket'],
      query: {
        token: `Bearer ${token}`,
      },
    });
    socket.on('newOrder', (data) => {
      console.log(data)
      dispatch({
        type: GET_NOTIFICATION,
        payload: data,
      });
      dispatch(getNotificationsRequest());
    });
  };
}

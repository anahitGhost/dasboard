import Account from '../../helpers/Account';
import { LOGIN, GET_PROFILE } from '../actions/account';

const initialState = {
  token: Account.getToken(),
  profile: Account.get(),
  planLogo: '',
  chatBarStatus: 'closed',
  scopes: Account.getScopes(),
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN.SUCCESS: {
      const { data: { token }, remember } = action.payload;
      Account.setToken(token, remember);
      return {
        ...state,
        token,
      };
    }
    case GET_PROFILE.SUCCESS: {
      const { profile, planLogo, scopes } = action.payload.data;
      Account.set(profile);
      Account.setScopes(scopes);
      return {
        ...state,
        profile,
        planLogo,
        scopes,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

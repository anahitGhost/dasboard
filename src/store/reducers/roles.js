import { GET_ROLES, GET_SCOPES } from '../actions/roles';

const initialState = {
  scopes: [],
  scopesStatus: '',
  roles: [],
  rolesStatus: '',

};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_SCOPES.REQUEST: {
      return {
        ...state,
        scopesStatus: 'request',
      };
    }
    case GET_SCOPES.SUCCESS: {
      return {
        ...state,
        scopesStatus: 'ok',
        scopes: action.payload.data.scopeGroups,
      };
    }
    case GET_SCOPES.FAIL: {
      return {
        ...state,
        scopesStatus: 'fail',
      };
    }
    case GET_ROLES.REQUEST: {
      return {
        ...state,
        rolesStatus: 'request',
      };
    }
    case GET_ROLES.SUCCESS: {
      const { roles } = action.payload.data;
      return {
        ...state,
        rolesStatus: 'ok',
        roles,
      };
    }
    case GET_ROLES.FAIL: {
      return {
        ...state,
        rolesStatus: 'fail',
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
}

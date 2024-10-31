import { GET_MEMBERS } from '../actions/members';

const initialState = {
  teamMembers: [],
  teamMembersStatus: '',

};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_MEMBERS.REQUEST: {
      return {
        ...state,
        teamMembersStatus: 'request',
      };
    }
    case GET_MEMBERS.SUCCESS: {
      return {
        ...state,
        teamMembersStatus: 'ok',
        teamMembers: action.payload.data.members,
      };
    }
    case GET_MEMBERS.FAIL: {
      return {
        ...state,
        teamMembersStatus: 'fail',
        teamMembers: [],
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
}

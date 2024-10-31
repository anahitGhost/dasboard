import _ from 'lodash';
import { GET_PATIENTS } from '../actions/patients';

const initialState = {
  patients: [],
  patientsStatus: '',
  totalPages: null,
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PATIENTS.REQUEST: {
      return {
        ...state,
        patientsStatus: 'request',
      };
    }
    case GET_PATIENTS.SUCCESS: {
      const { data: { totalPages, patients }, cache } = action.payload;
      let finalPatients = patients;
      if (cache) {
        finalPatients = [...state.patients, ...patients];
      }
      return {
        ...state,
        patients: finalPatients,
        patientsStatus: 'ok',
        totalPages,
      };
    }
    case GET_PATIENTS.FAIL: {
      return {
        ...state,
        patientsStatus: 'fail',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

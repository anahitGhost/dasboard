import { define } from '../redux-request';
import Api from '../../Api';

export const GET_PATIENTS = define('GET_PATIENTS');

export function getPatientsRequest(params) {
  return GET_PATIENTS.request(() => Api.getPatients({
    ...params, page: 1, order: 'desc', orderBy: 'createdAt',
  }));
}
export const GET_PATIENT_INFO = define('GET_PATIENT_INFO');

export function getPatientInfoRequest(id) {
  return GET_PATIENT_INFO.request(() => Api.getPatientInfo(id));
}

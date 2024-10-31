import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { getPatientsRequest } from '../store/actions/patients';
import Loader from './Loader';
import Checkbox from './form/Checkbox';
import { ReactComponent as DownloadSvg } from '../assets/icons/download.svg';
import SelectReportPeriodModal from './SelectReportPeriodModal';
import HasPermission from './HasPermission';

const patients =[
  {id:1,fName:'Jack', lName:'Jonas',  medicalId:'1234t', phone:'1234567u', address1:'47 W 13th St, New York, NY 10011, USA'},
  {id:2,fName:'Jack', lName:'Jonas',  medicalId:'ewer32432', phone:'1234567u', address1:'47 W 13th St, New York, NY 10011, USA'},
  {id:3,fName:'Jack', lName:'Jonas',  medicalId:'423432432', phone:'1234567u', address1:'47 W 13th St, New York, NY 10011, USA'},
  {id:4,fName:'Jack', lName:'Jonas',  medicalId:'1432432234t', phone:'1234567u', address1:'47 W 13th St, New York, NY 10011, USA'},
  {id:5,fName:'Jack', lName:'Jonas',  medicalId:'123434324t', phone:'1234567u', address1:'47 W 13th St, New York, NY 10011, USA'},
  {id:6,fName:'Jack', lName:'Jonas',  medicalId:'42343243', phone:'1234567u', address1:'47 W 13th St, New York, NY 10011, USA'},
]

function PatientsTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [checkedPatients, setCheckedPatients] = useState([]);
  const [patientIdForDownloadReport, setPatientIdForDownloadReport] = useState('');
  const [selectPeriodModal, setSelectPeriodModal] = useState(false);
  const profile = useSelector((state) => state.account.profile);
  const company = profile.userType;

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getPatientsRequest());
      setLoading(false);
    })();
  }, []);

  const handlePatientsCheck = useCallback((id) => {
    if (id === 'all') {
      if (checkedPatients.length === patients.length) {
        setCheckedPatients([]);
      } else {
        setCheckedPatients(patients.map((p) => p.id));
      }
      return;
    }
    if (checkedPatients.includes(id)) {
      setCheckedPatients(checkedPatients.filter((p) => p !== id));
    } else {
      setCheckedPatients([...checkedPatients, id]);
    }
  }, [checkedPatients, patients]);

  return (
    <div className="patientsTable">
      <div className="actions">
        <div className="actionButton">
          <HasPermission edit="MEMBER_INFO_DOWNLOAD">
            {!_.isEmpty(checkedPatients) ? (
              <button
                onClick={() => setSelectPeriodModal(true)}
                type="button"
                className="downloadReport"
              >
                <DownloadSvg />
                Download report
              </button>
            ) : null}
          </HasPermission>
        </div>
      </div>
      {loading ? <Loader /> : null}
      {!loading && _.isEmpty(patients) ? <div className="noData">No data</div> : null}
      {!loading && !_.isEmpty(patients) ? (
        <div className="table">

          <div className="head">
            <div className="checkbox">
              <Checkbox
                checked={checkedPatients.length === patients.length}
                onChange={() => handlePatientsCheck('all')}
              />
            </div>
            <div className="name">Name</div>
            <div className="medicalId">Member Id</div>
            <div className="date">Date of Birth</div>
            <div className="phone">Phone Number</div>
            <div className="address">Address</div>
            <div className="actions" />
          </div>
          <div className="body">
            {patients.map((patient) => (
              <div className="row" key={patient.id}>
                <div className="checkbox">
                  <Checkbox
                    checked={checkedPatients.includes(patient.id)}
                    onChange={() => handlePatientsCheck(patient.id)}
                  />
                </div>
                <div className="name" onClick={() => navigate(`/patients/${patient.id}`)}>
                  {`${patient.fName} ${patient.lName}`}
                </div>
                <div className="medicalId" onClick={() => navigate(`/patients/${patient.id}`)}>
                  {patient.medicalId}
                </div>
                <div className="date" onClick={() => navigate(`/patients/${patient.id}`)}>
                  {patient.dob ? moment(patient.dob).format('MM-DD-YYYY') : '-'}
                </div>
                <div className="phone" onClick={() => navigate(`/patients/${patient.id}`)}>
                  {patient.phone}
                </div>
                <div className="address" onClick={() => navigate(`/patients/${patient.id}`)}>
                  {patient.address1}
                </div>
                <div className="actions">

                  {+company !== 2 ? (
                    <HasPermission edit="MEMBER_INFO_DOWNLOAD">
                      <div
                        onClick={() => {
                          setPatientIdForDownloadReport(patient.id);
                          setSelectPeriodModal(true);
                        }}
                        role="button"
                        tabIndex={-1}
                      >
                        <DownloadSvg className="downloadSvg" />
                      </div>
                    </HasPermission>
                  ) : null}

                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <SelectReportPeriodModal
        isOpen={selectPeriodModal}
        patients={patientIdForDownloadReport ? [patientIdForDownloadReport] : checkedPatients}
        onClose={() => {
          setSelectPeriodModal(false);
          setPatientIdForDownloadReport('');
        }}
      />
    </div>
  );
}

export default PatientsTable;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import Wrapper from '../components/Wrapper';
import Input from '../components/form/Input';
import Datepicker from '../components/form/Datepicker';
import Radio from '../components/form/Radio';
import { ReactComponent as ColorPickerSvg } from '../assets/icons/color-picker.svg';
import { getPatientInfoRequest } from '../store/actions/patients';
import Loader from '../components/Loader';

function PatientSingle() {
  const { patientId } = useParams();

  const [formData, setFormData] = useState({
    balances: [{ _id: _.uniqueId('balance'), color: '#15274B' }],
    rollOver: false,
    monthlyAllowance: false,
    quarterlyAllowance: false,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (patientId) {
      (async () => {
        setLoading(true);
        const { payload: { data } } = await dispatch(getPatientInfoRequest(patientId));
        if (data.profile) {
          data.profile.phone = data.profile.phone.replace('+', '');
          data.profile.balances.forEach((b) => {
            b._id = _.uniqueId('balance');
            b.color = b.color ? b.color : '#15274B';
            return b;
          });
          setFormData(data.profile);
        }
        setLoading(false);
      })();
    }
  }, [patientId]);

  return (
    <Wrapper>
      <div id="patientSingle">
        {!loading ? (
          <>
            <p className="h2">
              <span>{`${formData.fName} ${formData.lName}`}</span>
            </p>
            <div>
              <div className="main">
                <div className="col left">
                  <Input
                    label="First Name *"
                    value={formData.fName}
                    readOnly
                  />
                  <Input
                    label="Last Name *"
                    value={formData.lName}
                    readOnly
                  />
                  <Input
                    label="Email Address"
                    value={formData.email}
                    readOnly
                  />
                  <Input
                    label="Phone Number *"
                    value={formData.phone}
                    type="numeric"
                    dataPrepend="+1"
                    maxLength="10"
                    readOnly
                  />
                  <div className="addressDetails">
                    <p>Address Details</p>
                    <Input
                      label="Address 1 *"
                      value={formData.address1}
                      readOnly
                    />
                    <Input
                      label="Address 2 *"
                      value={formData.address2}
                      readOnly
                    />
                    <div className="shortInputs">
                      <Input
                        label="City *"
                        value={formData.city}
                        readOnly
                      />
                      <Input
                        label="State *"
                        value={formData.state}
                        readOnly
                      />
                    </div>
                    <Input
                      label="Zip Code *"
                      value={formData.zip}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col">
                  <Input
                    label="Medical Id"
                    value={formData.medicalId}
                    readOnly
                  />
                  <Input
                    label="Benefit Plan"
                    value={formData.benefitPlan}
                    readOnly
                  />
                  <Datepicker
                    label="Date of Birth"
                    value={formData.dob ? moment(formData.dob, 'YYYY-MM-DD').toDate() : undefined}
                    readOnly
                  />
                  <div className="radioContainer">
                    <span>Roll over</span>
                    <div>
                      <Radio
                        label="Yes"
                        checked={formData.rollOver}
                        readOnly
                      />
                      <Radio
                        label="No"
                        checked={!formData.rollOver}
                        readOnly
                      />
                    </div>
                  </div>
                  <Input
                    label="Roll Over Capitation"
                    value={formData.rollOverCapitation}
                    type="number"
                    readOnly
                  />
                  <div className="radioContainer">
                    <span>Quarterly Allowance</span>
                    <div>
                      <Radio
                        label="Yes"
                        checked={formData.quarterlyAllowance}
                        readOnly
                      />
                      <Radio
                        label="No"
                        checked={!formData.quarterlyAllowance}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="radioContainer">
                    <span>Monthly Allowance</span>
                    <div>
                      <Radio
                        label="Yes"
                        checked={formData.monthlyAllowance}
                        readOnly
                      />
                      <Radio
                        label="No"
                        checked={!formData.monthlyAllowance}
                        readOnly
                      />
                    </div>
                  </div>
                  {!_.isEmpty(formData.balances) ? (
                    <div className="balances">
                      <p>Balances</p>
                      {formData.balances.map((balance, i) => (
                        <div className="balance" key={balance._id}>
                          <Input
                            placeholder="Name"
                            className="name"
                            value={formData.balances[i].name}
                            readOnly
                          />
                          <Input
                            placeholder="Amount"
                            className="amount"
                            type="number"
                            value={formData.balances[i].amount}
                            readOnly
                          />
                          <div className="add">
                            <ColorPickerSvg className="colorPickerSvg" fill={balance.color || '#15274B'} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        ) : <Loader />}
      </div>
    </Wrapper>
  );
}

export default PatientSingle;

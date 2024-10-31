import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Input from '../components/form/Input';
import Button from '../components/form/Button';
import { ReactComponent as EyeIconSvg } from '../assets/icons/eye-vector.svg';
import { ReactComponent as LockIconSvg } from '../assets/icons/lock.svg';
import Checkbox from '../components/form/Checkbox';
import { getProfileRequest, loginRequest } from '../store/actions/account';
import backgroundWrapper from '../assets/images/Mask group-1.png';
import backgroundMask from '../assets/images/Maskgroup.png';
import device from '../assets/images/Device.png';

function Login() {
  const [medicalId, setMedicalId] = useState('');
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = 'fefffr'

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    const { payload: { data } } = await dispatch(loginRequest(medicalId.trim(), password.trim(), remember));
    setLoading(false);
    if (data.status === 'error') {
      if (_.isEmpty(data.errors)) {
        toast.error(_.upperFirst(data.message));
      } else {
        setErrors(data.errors);
      }
    } else {
      dispatch(getProfileRequest());
    }
  };

  if (token) {
    return null;
  }
  console.log(token)

  return (
    <div className="wrapperLogin">
      <div className="layoutLogOut loginWrap">
        <div className="imageWrapBlock">
          <img src={backgroundWrapper} alt="" className="imageWrap" />
          <img src={device} alt="" className="deviceImage" />
        </div>

        <div className="log-in login">
          <div>
            <div className="title-block">
              <h2>Log In</h2>
            </div>
            <form className="form-input-container" onSubmit={handleSubmit}>
              <div className="input-block">
                <div className="input-container inputs">
                  <span>Email or Username*</span>
                  <Input
                    value={medicalId}
                    onChange={(ev) => {
                      setMedicalId(ev.target.value);
                      setErrors({});
                    }}
                    error={errors.medicalId ? 'Please enter a medical id.' : ''}
                  />
                </div>
                <div className="input-container inputs">
                  <div className="password-text">
                    <span>Password*</span>
                  </div>
                  <Input
                    className="password"
                    leftIcon={<LockIconSvg className="icon left" />}
                    rightIcon={(
                      <EyeIconSvg
                        className={`icon right ${passwordType === 'password' ? 'password' : ''}`}
                        onClick={() => {
                          if (passwordType === 'text') {
                            setPasswordType('password');
                          } else {
                            setPasswordType('text');
                          }
                        }}
                      />
                    )}
                    type={passwordType}
                    value={password}
                    onChange={(ev) => {
                      setPassword(ev.target.value);
                    }}
                  />
                  <div className="input-checkbox-block">
                    <Checkbox
                      label="Remember me"
                      onChange={() => {
                        setRemember(!remember);
                      }}
                      checked={remember}
                    />

                    <NavLink to="/forgot-password" className="forgot_password">
                      Forgot Password?
                    </NavLink>
                  </div>
                  <Button title="LOG IN" className="btn-teal-big btn-log-in" loading={loading} type="submit" />
                </div>
              </div>
            </form>

          </div>
          <img src={backgroundMask} alt="" className="backgroundMask" />
        </div>
      </div>
    </div>
  );
}

export default Login;

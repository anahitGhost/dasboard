import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import _ from 'lodash';
import useQuery from '../helpers/UseQuery';
import Input from '../components/form/Input';
import Button from '../components/form/Button';
import { ReactComponent as EyeIconSvg } from '../assets/icons/eye-vector.svg';
import { ReactComponent as LockIconSvg } from '../assets/icons/lock.svg';
import Api from '../Api';

const RestorePassword = () => {
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.account.token);
  const { query } = useQuery();

  const [restoreData, setRestoreData] = useState({
    password: '',
    confirmPassword: '',
  });

  const { password, confirmPassword } = restoreData;

  const [errors, setErrors] = useState({});

  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');

  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized]);

  const changeData = useCallback((path, value) => {
    setRestoreData((prev) => ({ ...prev, [path]: value }));

    setErrors((prev) => {
      if (path === 'password' && prev?.confirmPassword?.includes('match')) {
        delete prev.confirmPassword;
      }

      delete prev[path];

      return prev;
    });
  }, []);
  const restorePassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      _.forEach(restoreData, (val, key) => {
        if (!val) setErrors((prev) => ({ ...prev, [key]: `Please fill ${_.startCase(key)}` }));
      });
    } else if (password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Does not match the password' }));
    } else {
      setLoading(true);

      try {
        await Api.restorePassword({ newPassword: password, token: query.token });

        toast.success('Password successfully changed');
        navigate('/login', { replace: true });
      } catch (err) {
        console.warn(err.response);
        toast.error(err.response?.data?.message);
      }

      setLoading(false);
    }
  };

  return (
    <div className="layoutLogOut">
      <Helmet>
        <body className="logout" />
      </Helmet>
      <div className="log-in">
        <div className="login-form">
          <div className="title-block">
            <h2>Restore Password</h2>
          </div>

          <form className="form-input-container" onSubmit={restorePassword}>
            <div className="input-block">
              <div className="input-container">
                <div className="password-text">
                  <span>Password*</span>
                </div>

                <Input
                  className="password"
                  leftIcon={<LockIconSvg className="icon left" />}
                  rightIcon={(
                    <EyeIconSvg
                      className={`icon right ${passwordType}`}
                      onClick={() => setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'))}
                    />
                  )}
                  type={passwordType}
                  value={password}
                  autocomplete="current-password"
                  onChange={(e) => changeData('password', e.target.value)}
                  error={errors.password}
                />
              </div>

              <div className="input-container">
                <div className="password-text">
                  <span>Confirm Password*</span>
                </div>

                <Input
                  className="password"
                  leftIcon={<LockIconSvg className="icon left" />}
                  rightIcon={(
                    <EyeIconSvg
                      className={`icon right ${confirmPasswordType}`}
                      onClick={() => setConfirmPasswordType((prev) => (prev === 'password' ? 'text' : 'password'))}
                    />
                  )}
                  type={confirmPasswordType}
                  autocomplete="current-password"
                  value={confirmPassword}
                  onChange={(e) => changeData('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                />
              </div>

              <div className="forgot_password_btns_wrapper">
                <Button
                  title="Confirm"
                  className="btn-teal-big btn-log-in"
                  loading={loading}
                  type="submit"
                />

                <Button
                  title="Cancel"
                  className="btn-teal-big btn-log-in cancel_btn"
                  onClick={() => navigate('/')}
                  type="button"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestorePassword;

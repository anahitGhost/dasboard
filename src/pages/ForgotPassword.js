import React, { useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Input from '../components/form/Input';
import Button from '../components/form/Button';
import Api from '../Api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successScreen, successScreenToggle] = useState(false);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.account);

  useLayoutEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please fill Email or Username');
    } else {
      setLoading(true);

      try {
        await Api.forgotPassword({ email, callbackUrl: `${window.location.origin}/restore-password` });

        successScreenToggle(true);
      } catch (err) {
        console.warn(err.response);
        toast.error(err.response?.data?.message);
      }

      setLoading(false);
    }
  };

  return (
    <div className="layoutLogOut forgot_password_wrapper">
      <Helmet>
        <body className="logout" />
      </Helmet>

      <div
        className="log-in"
      >
        <div
          style={successScreen ? { height: 'auto' } : null}
          className="login-form"
        >
          <div className="title-block">
            <h2>Forgot password</h2>
          </div>

          <p className="forgot_password_text">
            {successScreen
              ? `The confirmation link was sent to ${email}.  Please, check your mailbox to confirm your account.`

              : 'The link to reset your password will be sent to the email address you fill in input below.'}
          </p>

          {!successScreen && (
            <form className="form-input-container" onSubmit={sendEmail}>
              <div className="input-block">
                <div className="input-container">
                  <span>Email or Username*</span>
                  <Input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    error={error}
                  />
                </div>

                <div className="forgot_password_btns_wrapper">
                  <Button
                    title="Send Email"
                    className="btn-teal-big btn-log-in"
                    loading={loading}
                    type="submit"
                  />
                </div>
              </div>
            </form>
          )}

          <Button
            title="Go Back"
            onClick={() => navigate(-1)}
            className="btn-teal-big btn-log-in cancel_btn"
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from './form/Button';

function SettingsTabs() {
  const params = useParams();
  const navigate = useNavigate();

  const handleTabChange = (path) => {
    navigate(path);
  };

  return (
    <div className="settingsTabs">
      <Button
        title="Account"
        className={params.tab !== 'account' ? 'white' : ''}
        onClick={() => handleTabChange('/settings/account')}
      />
      <Button
        title="Reset Password"
        className={`second ${params.tab !== 'reset-password' ? 'white' : ''}`}
        onClick={() => handleTabChange('/settings/reset-password')}
      />
    </div>
  );
}

export default SettingsTabs;

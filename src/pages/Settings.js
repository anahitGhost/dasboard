import React from 'react';
import Wrapper from '../components/Wrapper';
import SettingsTabs from '../components/SettingsTabs';

function Settings(props) {
  return (
    <Wrapper>
      <div id="settings">
        <SettingsTabs />
      </div>
    </Wrapper>
  );
}

export default Settings;

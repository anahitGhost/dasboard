import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as NotificationSvg } from '../assets/icons/notification.svg';
import IconButton from './form/IconButton';
import SettingsDropdown from './SettingsDropdown';
import Switcher from './form/Switcher';
import Notifications from './Notifications';
import {
  getUnreadNotificationsCountRequest,
  setNotificationsCount,
} from '../store/actions/notifications';
import logo from '../assets/images/logo.svg';

function NavBar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);

  const notificationsCount = useSelector((state) => state.notifications.notificationsCount);
  const planLogo = useSelector((state) => state.account.planLogo);

  useEffect(() => {
    dispatch(getUnreadNotificationsCountRequest());
  }, []);

  return (
    <div id="navBar">
      {/* {pathname === '/dashboard' ? <Switcher label="FSA" /> : null} */}
      <div className="logoContainer">
        <img
          src={planLogo || logo}
          alt=""
          onClick={() => {
            if (pathname !== '/dashboard') {
              navigate('/');
            }
          }}
        />
<p className="companyName">Dashboard</p>
      </div>
      <div className="settings">
        <IconButton
          icon={<NotificationSvg />}
          onClick={() => {
            setShowNotifications(!showNotifications);
            if (+notificationsCount > 0) {
              dispatch(setNotificationsCount(0));
            }
          }}
          count={+notificationsCount}
        />
        {showNotifications ? <Notifications onClose={() => setShowNotifications(false)} /> : null}
        <SettingsDropdown />
      </div>
    </div>
  );
}

export default NavBar;

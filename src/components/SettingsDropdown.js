import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userImg from '../assets/images/user.svg';
import { ReactComponent as ArrowDownSvg } from '../assets/icons/arrow-down.svg';
import useEventCallback from './useEventCallback';

function SettingsDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { profile } = useSelector((state) => state.account);

  const handleClickOutside = useEventCallback((event) => {
    if (dropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  });

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <div id="settingsDropdown" ref={dropdownRef}>
      <div className="user">
        <img src={ userImg} alt="user" />
        <div>
          <p className="name">Anahit Muradyan</p>
          <div className="setting" onClick={toggleDropdown} role="button" tabIndex={-1}>
            <span>My account</span>
            <ArrowDownSvg />
          </div>
        </div>

      </div>
      {dropdown ? (
        <ul className="dropdown">
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      ) : null}
    </div>
  );
}

export default SettingsDropdown;

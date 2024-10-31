import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import menus from '../menus';

function Menu(props) {
  const scopes = useSelector((state) => state.account.scopes);

  if (!props.isShowing) {
    return null;
  }

  return (
    <div id="menu">
      {menus.map((menu) => (
        <NavLink to={menu.path} className="menuItem" key={menu.menu}>
          {menu.icon}
          <p>{menu.menu}</p>
        </NavLink>
      ))}
    </div>
  );
}

Menu.propTypes = {
  isShowing: PropTypes.bool.isRequired,
};

export default Menu;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from './Menu';
import NavBar from './NavBar';
import Loader from './Loader';
import { init } from "../store/actions/socket";
import { getProfileRequest } from "../store/actions/account";

function Wrapper(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.account.token) || '24567890';
  const profile = useSelector((state) => state.account.profile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(init())
      dispatch(getProfileRequest());
    }
  }, [token]);

  if (!token) {
    return null;
  }

  // if (_.isEmpty(profile)) {
  //   return <Loader />;
  // }


  return (
    <div id="wrapper">
      <NavBar />
      <div className="mainContainer">
        <Menu isShowing />
        <div className="container">
          <div className="mainContent">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;

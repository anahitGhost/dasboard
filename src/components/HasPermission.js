import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Navigate } from 'react-router-dom';
import store from '../store';

document.addEventListener('click', (ev) => {
  if (ev.target.closest('span.readOnly')) {
    ev.preventDefault();
    ev.stopPropagation();
  }
}, true);

document.addEventListener('focus', (ev) => {
  if (ev.target?.closest('span.readOnly')) {
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.blur();
  }
}, true);

class HasPermission extends Component {
  static propTypes = {
    edit: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    read: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    children: PropTypes.any,
    exact: PropTypes.bool,
    else: PropTypes.any,
  };

  static defaultProps = {
    exact: false,
    redirect: false,
    children: null,
    edit: null,
    read: null,
    else: null,
  };

  static check = (permission, exact = false) => {
    if (!permission) {
      return false;
    }
    const scopes = _.get(store.getState(), 'account.scopes', []);
    const permissionList = _.isArray(permission) ? permission : [permission];
    const permissionScopes = _.intersection(permissionList, scopes);
    return (!exact && !!permissionScopes.length) || (permissionScopes.length === permissionList.length);
  };

  render() {
    const {
      edit, read, children, exact, redirect,
    } = this.props;
    if (this.constructor.check(edit, exact)) {
      return children;
    }
    if (this.constructor.check(read, exact)) {
      return (
        <span className="readOnly">{children}</span>
      );
    }
    if (redirect) {
      return <Navigate to={_.isString(redirect) ? redirect : '/'} />;
    }
    return this.props.else;
  }
}

export default HasPermission;

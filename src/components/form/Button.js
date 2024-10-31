import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';

function Button(props) {
  const {
    title, icon, type, className, loading, disabled, ...restProps
  } = props;

  return (
    <button type={type} {...restProps} className={`btn ${className}`} disabled={disabled || loading}>
      {icon || null}
      {loading ? <Loader /> : title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.element,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};
Button.defaultProps = {
  icon: undefined,
  type: 'button',
  className: '',
  disabled: false,
  loading: false,
};
export default Button;

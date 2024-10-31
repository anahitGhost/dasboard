import React from 'react';
import PropTypes from 'prop-types';

function IconButton(props) {
  const {
    radius, icon, className, count, ...restProps
  } = props;
  return (
    <div className={`iconButton ${className}`} style={{ borderRadius: radius }} {...restProps}>
      {icon}
      {+count ? <span className="count">{count}</span> : null}
    </div>
  );
}

IconButton.propTypes = {
  icon: PropTypes.element,
  radius: PropTypes.number,
  className: PropTypes.string,
  count: PropTypes.any,
};

IconButton.defaultProps = {
  radius: 40,
  className: '',
  icon: undefined,
  count: 0,
};
export default IconButton;

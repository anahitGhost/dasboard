import React from 'react';
import PropTypes from 'prop-types';

function TriangleSvg(props) {
  return (
    <svg width="17" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon1">
      <path
        d="M7.40192 1.5C8.55663 -0.500001 11.4434 -0.5 12.5981 1.5L18.6603 12C19.815 14 18.3716 16.5 16.0622 16.5H3.93782C1.62842 16.5 0.185045 14 1.33975 12L7.40192 1.5Z"
        fill={props.fill}
      />
    </svg>

  );
}

TriangleSvg.propTypes = {
  fill: PropTypes.string.isRequired,
};
export default TriangleSvg;

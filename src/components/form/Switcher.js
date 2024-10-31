import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

function Switcher(props) {
  const [id] = useState(_.uniqueId('switcher'));
  const { label, ...restProps } = props;

  return (
    <div className="otcSwitcher">
      <span className="label">{label}</span>
      <label className="switch" htmlFor={id}>
        <input type="checkbox" id={id} {...restProps} />
        <span className="slider" />
      </label>
    </div>
  );
}

Switcher.propTypes = {
  label: PropTypes.string,
};

Switcher.defaultProps = {
  label: '',
};
export default Switcher;

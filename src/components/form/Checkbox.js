import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function Checkbox(props) {
  const [id] = useState(_.uniqueId('checkbox'));
  const {
    label, onChange, className, ...restProps
  } = props;
  return (
    <div className={`otcCheckbox ${className}`}>
      <input type="checkbox" id={id} onChange={onChange} {...restProps} />
      <label htmlFor={id}>
        {label || null}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  label: PropTypes.any,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
Checkbox.defaultProps = {
  className: '',
  label: undefined,
  onChange: () => {
  },
};

export default Checkbox;

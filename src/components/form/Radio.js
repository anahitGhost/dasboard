import React, { useState } from 'react';
import _ from 'lodash';

function Radio(props) {
  const [id] = useState(_.uniqueId('radio'));
  const { label, ...restProps } = props;
  return (
    <div className="otcRadio">
      <input
        id={id}
        type="radio"
        className="radio"
        {...restProps}
      />
      <label
        htmlFor={id}
        className="label"
      >
        <span className="check" />
        <span className="text">{label}</span>
      </label>
    </div>
  );
}

export default Radio;

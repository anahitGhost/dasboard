import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ReactComponent as Reset } from '../../assets/icons/reset.svg';

function Input(props) {
  const [id] = useState(_.uniqueId('input'));

  const {
    type, label, rightIcon, leftIcon, className, error, dataAppend, dataPrepend, onKeyPress, clearValue,
    ...restProps
  } = props;

  const handleKeyPress = useCallback((ev) => {
    if (type === 'numeric' && _.isNaN(parseInt(ev.key))) {
      ev.preventDefault();
    }
    if (onKeyPress) {
      onKeyPress(ev);
    }
  }, [type]);

  return (
    <div
      className={`otcInput ${className || ''} ${error ? 'hasError' : ''}`}

    >
      {label ? (
        <label
          htmlFor={id}
          data-append={dataAppend}
          data-prepend={dataPrepend}
        >
          {label}
        </label>
      ) : null}
      {leftIcon || null}
      <input
        id={id}
        type={type === 'numeric' ? 'text' : type}
        onKeyPress={handleKeyPress}
        {...restProps}
      />
      {rightIcon || null}
      {error ? <span className="error">{error}</span> : null}

      {clearValue && props.value && <div className="resetData" onClick={clearValue}><Reset /></div>}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  rightIcon: PropTypes.element,
  leftIcon: PropTypes.element,
  className: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  dataAppend: PropTypes.string,
  dataPrepend: PropTypes.string,
  onKeyPress: PropTypes.func,
  clearValue: PropTypes.func,
};
Input.defaultProps = {
  type: 'text',
  label: '',
  rightIcon: undefined,
  leftIcon: undefined,
  className: '',
  error: '',
  value: undefined,
  dataAppend: undefined,
  dataPrepend: undefined,
  onKeyPress: () => {
  },
  clearValue: null,
};

export default Input;

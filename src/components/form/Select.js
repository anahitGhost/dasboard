import React, { useCallback } from 'react';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';

import PropTypes from 'prop-types';
import { isClass } from 'eslint-plugin-react/lib/util/ast';
import { ReactComponent as ArrowDownSvg } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as Reset } from '../../assets/icons/reset.svg';
import Checkbox from './Checkbox';

function Select(props) {
  const {
    label,
    isMulti,
    options,
    menuPlacement,
    checkable,
    error,
    value,
    onChange,
    isAsync,
    className,
    forwardRef,
    isCreatable,
    ...restProps
  } = props;

  const renderDropdownIndicator = useCallback(() => <ArrowDownSvg className="arrowIcon" />, []);
  const renderClearIndicator = useCallback((p) => (
    <div
      onClick={() => p.clearValue()}
      className="resetData"
    >
      <Reset />
    </div>
  ), []);

  const renderOption = useCallback((p) => (
    <div
      {...p.innerProps}
      style={p.data.level ? { paddingLeft: p.data.level * 20 } : undefined}
      data-level={p.data.level}
      className={!p.isSelected && value.find((v) => v.parentId === p.data.id) ? 'partlySelected' : ''}
    >
      <Checkbox
        label={p.label}
        checked={value.find((v) => v.id === p.value)}
      />
    </div>
  ), [value]);

  const components = { DropdownIndicator: renderDropdownIndicator, ClearIndicator: renderClearIndicator };

  if (isMulti && checkable) {
    components.Option = renderOption;
  }
  return (
    <div className={`otcSelect ${className} ${isMulti && checkable ? 'isMulti' : ''}`}>
      <p className="label">{label || ''}</p>
      {isAsync
        ? (
          <AsyncSelect
            value={value}
            onChange={onChange}
            isMulti={isMulti}
            menuPlacement={menuPlacement}
            components={components}
            classNamePrefix="otc"
            closeMenuOnSelect={!isMulti}
            hideSelectedOptions={false}
            ref={forwardRef}
            isClearable
            {...restProps}
          />
        ) : null}

      {isCreatable ? (
        <CreatableSelect
          value={value}
          options={options}
          menuPlacement={menuPlacement}
          components={components}
          classNamePrefix="otc"
          onChange={onChange}
          hideSelectedOptions={false}
          ref={forwardRef}
          isClearable
          {...restProps}
        />
      ) : null}

      {!isAsync && !isCreatable ? (
        <ReactSelect
          options={options}
          isMulti={isMulti}
          menuPlacement={menuPlacement}
          components={components}
          classNamePrefix="otc"
          closeMenuOnSelect={!isMulti}
          hideSelectedOptions={false}
          value={value}
          onChange={onChange}
          ref={forwardRef}
          isClearable
          {...restProps}
        />
      ) : null}

      {error ? <span className="error">{error}</span> : null}
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  isMulti: PropTypes.bool,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  menuPlacement: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isAsync: PropTypes.bool,
  checkable: PropTypes.bool,
  className: PropTypes.string,
  isCreatable: PropTypes.bool,
};
Select.defaultProps = {
  label: '',
  isMulti: false,
  value: [],
  error: '',
  menuPlacement: 'auto',
  isAsync: false,
  checkable: false,
  options: [],
  className: '',
  isCreatable: false,
};
export default React.forwardRef((props, ref) => (<Select forwardRef={ref} {...props} />));

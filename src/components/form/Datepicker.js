import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import Input from './Input';
import { ReactComponent as CalendarSvg } from '../../assets/icons/calendar.svg';
import { ReactComponent as RemoveSvg } from '../../assets/icons/remove.svg';

function Datepicker(props) {
  const {
    label, style, resetDate, value: date, element, error, ...restProps
  } = props;

  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    CustomInput.propTypes = {
      value: PropTypes.any.isRequired,
      onClick: PropTypes.func.isRequired,
    };

    if (element) {
      return (
        <div className="custom_input_datePicker_wrapper">
          <input
            className="custom_input_datePicker"
            onClick={onClick}
            style={style}
            ref={ref}
            value={element}
            readOnly
          />
          {
            element !== 'select date'
              ? (
                <RemoveSvg
                  className="remove"
                  onClick={resetDate}
                />
              ) : null
          }
        </div>
      );
    }

    return (
      <Input
        rightIcon={<CalendarSvg />}
        value={value}
        onClick={onClick}
        ref={ref}
        label={label}
        placeholder="mm.dd.yyyy"
        readOnly
      />
    );
  });

  return (
    <div className="datepicker">
      <DatePicker
        customInput={<CustomInput />}
        dateFormat="MM.dd.yyyy"
        showPopperArrow={false}
        selected={date}
        {...restProps}
      />
      {error ? <span className="error">{error}</span> : null}
    </div>
  );
}

Datepicker.propTypes = {
  label: PropTypes.string.isRequired,
  element: PropTypes.any,
  style: PropTypes.any,
  error: PropTypes.string,
  resetDate: PropTypes.func,
  value: PropTypes.any,
};
Datepicker.defaultProps = {
  value: '',
  error: '',
  element: null,
  style: {},
  resetDate: () => {},
};

export default Datepicker;

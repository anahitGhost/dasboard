import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import { ReactComponent as ArrowDownSvg } from '../../assets/icons/arrow-down.svg';
import useEventCallback from '../useEventCallback';
import Datepicker from '../form/Datepicker';

function ChartTableHeader({
  title, changeValue, balanceTypeId,
}) {
  const [dropdown, setDropdown] = useState(false);
  const [requestCustomDate, setRequestCustomDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [activeMenu, setActiveMenu] = useState('This Month');
  const dropdownRef = useRef(null);

  const handleClickOutside = useEventCallback((event) => {
    if (dropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  });

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleChange = (selectedMenu) => {
    setActiveMenu(selectedMenu);
    let startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().format('YYYY-MM-DD');

    if (selectedMenu === 'Last Month') {
      startDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
      endDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
    }

    if (selectedMenu === 'Last Week') {
      startDate = moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD');
      endDate = moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD');
    }

    if (selectedMenu === 'Last Year') {
      startDate = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
      endDate = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');
    }

    if (selectedMenu === 'Last Day') {
      startDate = moment().add(-1, 'day').format('YYYY-MM-DD');
      endDate = moment().format('YYYY-MM-DD');
    }

    if (selectedMenu === 'Today') {
      startDate = moment().format('YYYY-MM-DD');
      endDate = moment().format('YYYY-MM-DD');
    }

    if (selectedMenu === 'This Month') {
      startDate = moment().subtract(0, 'month').startOf('month').format('YYYY-MM-DD');
      endDate = moment().subtract(0, 'month').endOf('month').format('YYYY-MM-DD');
    }

    if (selectedMenu !== 'custom') {
      changeValue({
        startDate,
        endDate,
        balanceTypeId,
      });
    }

    toggleDropdown();
  };

  const changeDatePicker = (date) => {
    setRequestCustomDate({
      startDate: date[0] || null,
      endDate: date[1] || null,
      balanceTypeId,
    });
    if (date[0] && date[1]) {
      changeValue({
        startDate: moment(date[0]).format('YYYY-MM-DD') || null,
        endDate: moment(date[1]).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD'),
        balanceTypeId,
      });
    }
  };

  const resetDate = () => {
    setActiveMenu('Last Month');
    setRequestCustomDate({
      startDate: '',
      endDate: '',
      balanceTypeId: '',
    });
    changeValue({
      startDate: moment().add(-1, 'month').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      balanceTypeId,
    });
  };

  return (
    <div id="chart_dropdown" ref={dropdownRef} className="chartTableHeader">
      <p>{title}</p>
      {
        activeMenu === 'custom' ? (
          <Datepicker
            resetDate={resetDate}
            style={!requestCustomDate.startDate ? { width: 75 } : {}}
            onChange={changeDatePicker}
            element={requestCustomDate.startDate
              // eslint-disable-next-line max-len
              ? `${moment(requestCustomDate.startDate).format('YYYY-MM-DD')} / ${requestCustomDate.endDate ? moment(requestCustomDate.endDate).format('YYYY-MM-DD') : ''}`
              : 'select date'}
            label="Search By Date"
            monthsShown={2}
            selectsRange
            selected={requestCustomDate.startDate}
            startDate={requestCustomDate.startDate}
            endDate={requestCustomDate.endDate}
          />
        ) : (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div onClick={toggleDropdown} className="select">
            <div><span>{activeMenu}</span></div>
            <ArrowDownSvg />
          </div>
        )
      }

      {dropdown ? (
        <ul className="dropdown_two">
          <li onClick={() => handleChange('Last Year')}>Last Year</li>
          <li onClick={() => handleChange('Last Month')}>Last Month</li>
          <li onClick={() => handleChange('Last Week')}>Last Week</li>
          <li onClick={() => handleChange('Today')}>Today</li>
          <li onClick={() => handleChange('This Month')}>This Month</li>
          <li onClick={() => handleChange('custom')}>Custom</li>
        </ul>
      ) : null}

    </div>
  );
}

ChartTableHeader.propTypes = {
  title: PropTypes.any,
  changeValue: PropTypes.func,
  balanceTypeId: PropTypes.string,
};

ChartTableHeader.defaultProps = {
  balanceTypeId: null,
  changeValue: () => {
  },
  title: '',
};
export default ChartTableHeader;

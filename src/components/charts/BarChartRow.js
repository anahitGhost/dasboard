import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function BarChartRow(props) {
  const { percentage, title } = props;
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(percentage);
  }, [percentage]);
  return (
    <div className="barChartRow">
      <p className="title titleUi">{title}</p>
      <div className="progressContainer">
        <div className="progress" />
        <div className="progressFill" style={{ width: `${width}%` }} />
      </div>
      <p className="percentage">{`${percentage}%`}</p>
    </div>
  );
}

BarChartRow.propTypes = {
  percentage: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};

export default BarChartRow;

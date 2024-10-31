import React from 'react';
import Chart from 'react-apexcharts';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ChartTableHeader from './ChartTableHeader';
import Loader from '../Loader';
import Tooltip from '../ToolTip';

function RadialBarChart({
  count, percentage, name, chartLoading, sortData, height,
}) {
  const options = {
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.15,
        gradientToColors: [name !== 'Member' && name !== 'Sales' && name !== 'Registered'
          ? '#2877EE' : '#FF8338'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, -100],
      },
    },
    stroke: {
      dashArray: 4,
      color: name !== 'Member' && name !== 'Sales' && name !== 'Registered' ? '#2877EE' : '#FF8338',
    },
    plotOptions: {
      radialBar: {
        inverseOrder: false,
        offsetX: 0,
        offsetY: name !== 'Member' && name !== 'Sales' && name !== 'Registered' ? -28 : -8,
        startAngle: -120,
        endAngle: 120,
        hollow: {
          margin: 5,
          size: '50%',
          background: 'transparent',
          image: undefined,
          imageWidth: 150,
          imageHeight: 150,
          imageOffsetX: 0,
          imageOffsetY: 0,
          imageClipped: true,
          position: 'front',
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5,
          },
        },
        track: {
          show: true,
          startAngle: undefined,
          endAngle: undefined,
          background: '#f2f2f2',
          strokeWidth: '97%',
          opacity: 1,
          margin: 5,
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5,
          },
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: '16px',
            fontFamily: undefined,
            fontWeight: 600,
            color: undefined,
            offsetY: 55,
          },
          value: {
            show: true,
            fontSize: name !== 'Member' && name !== 'Sales' && name !== 'Registered' ? '24px' : '16px',
            fontFamily: undefined,
            fontWeight: 400,
            color: name !== 'Member' && name !== 'Sales' && name !== 'Registered' ? '#2877EE' : '#FF8338',
            offsetY: name !== 'Member' && name !== 'Sales' && name !== 'Registered' ? 10 : -10,
            formatter(val) {
              return `${val}%`;
            },
          },
          total: {
            show: true,
            label: '',
            color: name !== 'Member' && name !== 'Sales' && name !== 'Registered' ? '#2877EE' : '#FF8338',
            fontSize: '15px',
            fontWeight: 600,
            formatter() {
              return `${name !== 'Member' && name !== 'Registered' ? '$' : ''} ${count}`;
            },
          },
        },
      },
    },
  };

  return (
    <>
      <div className="tableHeader">
        {name !== 'Allocated Funds' ? (
          <ChartTableHeader changeValue={sortData} />
        ) : null}
      </div>
      <Tooltip
        width="50px"
        text={(
          <span>
            {percentage}
            %
            {/* {name !== 'Member' ? '%' : null} */}
          </span>
      )}
      >
        <div className={name === 'Member' || name === 'Sales' || name === 'Registered'
          ? 'chartRoundMini' : 'chartRound'}
        >
          {!chartLoading
            ? (
              <>
                <Chart
                  type="radialBar"
                  key={count}
                  series={[percentage]}
                  options={{ ...options }}
                  height={height}
                />
                <span className={`chartRoundName ${_.camelCase(name)}`}>{name}</span>
              </>
            )
            : (
              <div>
                <Loader style={{ height: 200 }} />
              </div>
            )}
        </div>
      </Tooltip>

    </>
  );
}

RadialBarChart.propTypes = {
  count: PropTypes.any,
  percentage: PropTypes.any,
  name: PropTypes.string,
  chartLoading: PropTypes.bool,
  sortData: PropTypes.func,
};

RadialBarChart.defaultProps = {
  count: '',
  percentage: '',
  name: '',
  chartLoading: false,
  sortData: () => {
  },
};

export default RadialBarChart;

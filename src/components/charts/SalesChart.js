import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import ChartTableHeader from './ChartTableHeader';
import { getOrdersSalesRequest } from '../../store/actions/dashboard';
import Loader from '../Loader';

const chartConfig = {
  series: [
    {
      name: 'Sales',
      data: [],
    },
    {
      name: 'Quantity',
      data: [],
    },
  ],
  options: {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '16px',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    colors: ['#0001ff', '#FF5F00'],
    markers: { size: 4, colors: '#15274B', strokeColor: '#15274B' },
    stroke: { width: 1 },
    xaxis: { labels: {} },
    yaxis: { labels: { style: { colors: ['#15274B'], fontSize: '14px', fontWeight: 600 } }, tickAmount: 10 },
  },
};

function SalesChart() {
  const dispatch = useDispatch();
  const ordersSales = useSelector((state) => state.dashboard.ordersSales);
  const startDate = ordersSales.map((d) => (moment(d?.startDate).format('DD-MM-YY')));
  chartConfig.series[0].data = [1, 23, 324, 44, 55];
  chartConfig.series[1].data = [12, 3, 5, 5, 56];
  chartConfig.options.xaxis.categories = startDate;



  return (
    <div className="salesChart">
      <div className="header">
        <ChartTableHeader title="Sales" />
      </div>
      {<Chart
        options={chartConfig.options}
        series={chartConfig.series}
        width="100%"
        height="400"
      />
     }
    </div>
  );
}

export default SalesChart;

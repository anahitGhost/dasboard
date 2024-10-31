import React, { useRef, useState } from 'react';
import Chart from 'react-apexcharts';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import moment from 'moment/moment';
import ChartTableHeader from './ChartTableHeader';
import { getBenefitIdsRequest } from '../../store/actions/dashboard';
import TriangleSvg from '../icons/TriangleSvg';
import Loader from '../Loader';

const options = {
  series: [{
    name: 'Amount',
    data: [],
  }],
  chart: {
    height: 350,
    type: 'bar',
    toolbar: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    legend: {
      show: false,
    },

  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  xaxis: { labels: { show: false } },
  yaxis: { labels: { show: false } },
};

function ColumnChart(props) {
  const dispatch = useDispatch();
  const chartOptions = useRef(_.cloneDeep(options)).current;
  const { index, data: chartData } = props;
  const [loading, setLoading] = useState(false);

  const startDate = chartData.data.map((d) => (moment(d?.startDate).format('DD-MM-YYYY')));

  chartOptions.xaxis.categories = startDate;

  const sortData = async (reqData) => {
    setLoading(true);
    await dispatch(getBenefitIdsRequest(reqData));
    setLoading(false);
  };

  const noEmptyData = chartData.data.find((d) => !d.empty);

  return (
    <div className={`columnChart columnChart-${index}`}>
      <ChartTableHeader
        title={(
          <p style={{ color: chartData.color }} className="pink">
            <TriangleSvg fill={chartData.color} />
            <span>
              {chartData.name?.toUpperCase()}
            </span>
          </p>
      )}
        changeValue={sortData}
        balanceTypeId={chartData.id}
      />
      {noEmptyData ? (
        <>
          {!loading ? (
            <Chart
              type="bar"
              series={chartOptions.series}
              options={{ ...chartOptions, colors: [chartData.color] }}
              width="100%"
              height="350"
            />
          ) : <Loader style={{ height: 200 }} />}
        </>
      ) : <div className="noData">No Data</div>}

    </div>
  );
}

export default ColumnChart;

import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import RadialBarChart from './RadialBarChart';
import {
  getOPaymentsStatisticFundsRequest, getOPaymentsStatisticFundsUsedRequest, getOrdersRegisteredRequest,
  getOrdersStatisticSalesRequest,
  getUsersStatisticPatientsRequest,
} from '../../store/actions/dashboard';

function RadialBarChartContainer() {
  const dispatch = useDispatch();
  const statisticPatients = useSelector((state) => state.dashboard.statisticPatients);
  const statisticSales = useSelector((state) => state.dashboard.statisticSales);
  const statisticPaymentAllocated = useSelector((state) => state.dashboard.statisticPaymentAllocated);
  const statisticPaymentUsed = useSelector((state) => state.dashboard.statisticPaymentUsed);
  const statisticRegistered = useSelector((state) => state.dashboard.statisticRegistered);
  const [chartLoading, setChartsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setChartsLoading(true);
      await dispatch(getUsersStatisticPatientsRequest({
        startDate: moment().add(-1, 'month').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
      }));

      await dispatch(getOrdersStatisticSalesRequest({
        startDate: moment().add(-1, 'month').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
      }));

      await dispatch(getOPaymentsStatisticFundsRequest());

      await dispatch(getOPaymentsStatisticFundsUsedRequest({
        startDate: moment().add(-1, 'month').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
      }));

      await dispatch(getOrdersRegisteredRequest({
        startDate: moment().add(-1, 'month').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
      }));
      setChartsLoading(false);
    })();
  }, []);

  const sortDataPatients = useCallback((reqData) => {
    dispatch(getUsersStatisticPatientsRequest(reqData));
  }, [statisticPatients]);

  const sortDataRegistered = useCallback((reqData) => {
    dispatch(getOrdersRegisteredRequest(reqData));
  }, [statisticRegistered]);

  const sortDataSales = useCallback((reqData) => {
    dispatch(getOrdersStatisticSalesRequest(reqData));
  }, [statisticSales]);

  const sortDataUsed = useCallback((reqData) => {
    dispatch(getOPaymentsStatisticFundsUsedRequest(reqData));
  }, [statisticPaymentUsed]);

  return (
    <div className="shortRound">
      <div className="shortRoundBlock">
        <RadialBarChart
          sortData={sortDataPatients}
          chartLoading={chartLoading}
          percentage={statisticPatients.percentage}
          count={statisticPatients.count}
          name="Member"
          height="190px"
        />

        <RadialBarChart
          sortData={sortDataRegistered}
          chartLoading={chartLoading}
          percentage={+statisticRegistered.count?.count === 0 ? 0 : 100}
          count={statisticRegistered.count?.count}
          name="Registered"
          height="190px"
        />

        <RadialBarChart
          sortData={sortDataSales}
          chartLoading={chartLoading}
          percentage={statisticSales.percentage}
          count={statisticSales.sales}
          name="Sales"
          height="190px"
        />

      </div>

      <div className="shortRoundBlock">
        <RadialBarChart
          // sortData={sortDataFunds}
          chartLoading={chartLoading}
          percentage={+statisticPaymentAllocated.amount === 0 ? 0 : 100}
          count={statisticPaymentAllocated.amount}
          name="Allocated Funds"
          height="240px"
        />

        <RadialBarChart
          sortData={sortDataUsed}
          chartLoading={chartLoading}
          percentage={statisticPaymentUsed.percentage}
          count={statisticPaymentUsed.amount}
          name="Used Funds"
          height="240px"
        />
      </div>
    </div>
  );
}

export default RadialBarChartContainer;

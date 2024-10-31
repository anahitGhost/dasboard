import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import TopSoldProducts from './TopSoldProducts';
import RadialBarChartContainer from './RadialBarChartContainer';
import ColumnChart from './ColumnChart';
import { getBenefitIdsRequest } from '../../store/actions/dashboard';

function BenefitCharts() {
  const dispatch = useDispatch();
  const benefitSales = useSelector((state) => state.dashboard.benefitSales);
  useEffect(() => {
    dispatch(getBenefitIdsRequest({
      startDate: moment().add(-1, 'month').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    }));
  }, []);
  return (
      <TopSoldProducts />
  );
}

export default BenefitCharts;

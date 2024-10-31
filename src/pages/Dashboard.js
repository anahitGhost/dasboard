import React from 'react';
import Wrapper from '../components/Wrapper';
import SalesChart from '../components/charts/SalesChart';
import TopCategories from '../components/charts/TopCategories';
import MembersBySales from '../components/charts/MembersBySales';
import BenefitCharts from '../components/charts/BenefitCharts';
import HasPermission from '../components/HasPermission';

function Dashboard() {
  return (
    <Wrapper>
        <div id="dashboard">
          <div className="row dashboardContainer">
            <div className="categoriesChartContainer">
              <TopCategories />
            </div>
            <div className="salesChartContainer">
              <SalesChart />
            </div>
            <MembersBySales />
            <BenefitCharts />
          </div>
        </div>
    </Wrapper>
  );
}

export default Dashboard;

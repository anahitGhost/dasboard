import _ from 'lodash';
import {
  GET_BENEFIT_SALES,
  GET_ORDERS_MEMBERS,
  GET_ORDERS_PRODUCTS_HEALTH_PLAN, GET_ORDERS_REGISTERED,
  GET_ORDERS_SALES,
  GET_ORDERS_STATISTIC_SALES,
  GET_PAYMENT_ALLOCATED_FUNDS,
  GET_PAYMENT_FUNDS_USED,
  GET_USERS_STATISTIC_PATIENT,
} from '../actions/dashboard';

const initialState = {
  ordersSales: [],
  ordersMembers: [],
  ordersHealthPlan: [],
  statisticPatients: [],
  statisticSales: [],
  statisticPaymentAllocated: [],
  statisticPaymentUsed: [],
  statisticRegistered: [],
  benefitSales: [],
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ORDERS_SALES.SUCCESS: {
      const { sales } = action.payload.data;
      return {
        ...state,
        ordersSales: sales,
      };
    }

    case GET_ORDERS_MEMBERS.SUCCESS: {
      const { members } = action.payload.data;
      return {
        ...state,
        ordersMembers: members,
      };
    }

    case GET_ORDERS_PRODUCTS_HEALTH_PLAN.SUCCESS: {
      const { products } = action.payload.data;
      return {
        ...state,
        ordersHealthPlan: products,
      };
    }

    case GET_USERS_STATISTIC_PATIENT.SUCCESS: {
      const { patientsInfo } = action.payload.data;
      return {
        ...state,
        statisticPatients: patientsInfo,
      };
    }

    case GET_ORDERS_STATISTIC_SALES.SUCCESS: {
      const { salesInfo } = action.payload.data;
      return {
        ...state,
        statisticSales: salesInfo,
      };
    }

    case GET_PAYMENT_ALLOCATED_FUNDS.SUCCESS: {
      const fundsHistory = action.payload.data;
      return {
        ...state,
        statisticPaymentAllocated: fundsHistory,
      };
    }

    case GET_PAYMENT_FUNDS_USED.SUCCESS: {
      const { fundsHistory } = action.payload.data;
      return {
        ...state,
        statisticPaymentUsed: fundsHistory,
      };
    }

    case GET_ORDERS_REGISTERED.SUCCESS: {
      return {
        ...state,
        statisticRegistered: action.payload.data,
      };
    }

    case GET_BENEFIT_SALES.SUCCESS: {
      const { data: { sales }, balanceTypeId } = action.payload;
      let { benefitSales } = state;
      if (!_.isEmpty(benefitSales) && balanceTypeId) {
        benefitSales = benefitSales.map((s) => {
          if (s.id === sales[0].id) {
            s.data = sales[0].data;
          }
          return s;
        });
      } else {
        benefitSales = sales;
      }
      return {
        ...state,
        benefitSales,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

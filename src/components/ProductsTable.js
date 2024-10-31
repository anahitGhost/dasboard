import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getProductsRequest } from '../store/actions/products';
import Loader from './Loader';
import useQuery from '../helpers/UseQuery';

const products = [
  {
    id: 1, name: 'iPhone', itemNumber: '123456', items: [{ qty: 2, price: 1000 }], categories: ['phone', 'smartphone'], status: 'ACTIVE',
  },
  {
    id: 2, name: 'iPhone', itemNumber: '123456', items: [{ qty: 2, price: 1000 }], categories: ['phone', 'smartphone'], status: 'ACTIVE',
  },
  {
    id: 3, name: 'iPhone', itemNumber: '123456', items: [{ qty: 2, price: 1000 }], categories: ['phone', 'smartphone'], status: 'ACTIVE',
  },
];

function ProductsTable() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { query } = useQuery();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getProductsRequest({
        // nextOffset: 0,
        startDate: query.startDate,
        endDate: query.endDate,
        orderBy: query.orderBy || 'createdAt',
      }, false));
      setLoading(false);
    })();
  }, []);

  if (!loading && _.isEmpty(products)) {
    return <div className="noData">No data</div>;
  }
  return (
    <div className="table productsTable">
      {!(loading && _.isEmpty(products)) ? (
        <div className="table">
          <div className="head">
            <div className="productName">Product Name</div>
            <div className="item">Item</div>
            <div className="qty">Quantity</div>
            <div className="price">Price</div>
            <div className="category">Category</div>
            <div className="status">Status</div>
          </div>
          <div className="body">
            {products.map((product) => (
              <div className="row" key={product.id}>
                <div className="productName">
                  {product.name}
                </div>
                <div className="item">
                  {`#${product.itemNumber}`}
                </div>
                <div className="qty">
                  {product.items[0].qty}
                </div>
                <div className="price">
                  {`$${(product.items[0].price || 0).toFixed(2)}`}
                </div>
                <div className="category">
                  {product.categories?.map((c) => c).join(', ')}
                </div>
                <div className="status" style={{ color: product.status === 'ACTIVE' ? '#0B8B00' : '#F40000' }}>
                  {_.upperFirst(_.lowerCase(product.status))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : <Loader />}
    </div>
  );
}

export default ProductsTable;

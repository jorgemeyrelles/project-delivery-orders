import React, { useEffect, useState } from 'react';
import {
  Table,
} from 'reactstrap';

// import { Container } from './styles';

function DetailOrder() {
  const [prod, setProd] = useState([]);
  const [tot, setTot] = useState('');
  const [client, setClient] = useState('customer');
  // const { products } = props;

  useEffect(() => {
    const { role } = JSON.parse(localStorage.getItem('user'));
    setClient(role);
    const value = JSON.parse(localStorage.getItem('detail'));
    // console.log(value);
    setProd(value.product);
    const total = value.product
      .reduce((acc, rec) => acc + (parseFloat(rec.price) * rec.SalesProduct.quantity), 0);
    setTot(total.toFixed(2).toString().replace('.', ','));
  }, []);

  const subTotal = (price, qty) => {
    const sub = parseFloat(price) * qty;
    return sub.toFixed(2).toString().replace('.', ',');
  };

  const testid41 = `${client}_order_details__element-order-table-item-number-`;
  const testid43 = `${client}_order_details__element-order-table-quantity-`;
  const testid44 = `${client}_order_details__element-order-table-sub-total-`;

  const card = () => (
    <div>
      <Table
        style={ { width: '100%', textAlign: 'center' } }
        borderless
        hover
        size="sm"
      >
        <thead>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit value</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { prod.map((e, i) => (
            <tr key={ i }>
              <th
                scope="row"
                data-testid={ `${testid41}${i}` }
              >
                { i + 1 }
              </th>
              <td
                data-testid={ `${client}_order_details__element-order-table-name-${i}` }
              >
                { e.name }
              </td>
              <td
                data-testid={ `${testid43}${i}` }
              >
                { e.SalesProduct.quantity }
              </td>
              <td
                data-testid={ `${testid44}${i}` }
              >
                { `$ ${e.price.replace('.', ',')}` }
              </td>
              <td
                data-testid={ `${client}_order_details__element-order-total-price-${i}` }
              >
                { `$ ${subTotal(e.price, e.SalesProduct.quantity)}` }
              </td>
            </tr>
          )) }
        </tbody>
      </Table>
      <div
        className="total-price-order"
      >
        <h2
          data-testid={ `${client}_order_details__element-order-total-price` }
          style={ { margin: '5px 5px' } }
        >
          {`Total: $ ${tot}`}
        </h2>
      </div>
    </div>
  );

  return card();
}

export default DetailOrder;

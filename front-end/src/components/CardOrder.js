// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
} from 'reactstrap';

// import { Container } from './styles';

function CardOrder(props) {
  const { sales } = props;

  const [client, setClient] = useState('customer');
  const [totalLocal, setTotalLocal] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const { role } = JSON.parse(localStorage.getItem('user'));
    setClient(role);
    const getDate = new Date(sales.saleDate);
    setDate(getDate.toLocaleDateString('pt-Br'));
    if (sales.product.length !== 0) {
      const total = sales.totalPrice;
      //   .reduce((a, rec) => a + (parseFloat(rec.price) * rec.SalesProduct.quantity), 0);
      setTotalLocal(total.replace('.', ','));
    } else if (sales.product.length === 0) {
      setTotalLocal('0,00');
    }
  }, []);

  const goTo = async () => {
    // const { role } = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('detail', JSON.stringify(sales));
    navigate(`/${client}/orders/${sales.id}`);
  };

  const numMagic = 4;

  const card = () => (
    <Button
      type="button"
      style={ { display: 'flex', width: '500px', justifyContent: 'space-around' } }
      className="btn-order"
      onClick={ () => goTo() }
    >
      <div style={ { display: 'block' } }>
        <div>Order</div>
        <div
          data-testid={ `${client}_orders__element-order-id-${sales.id}` }
        >
          { (sales.id).toString().padStart(numMagic, '0') }
        </div>
      </div>
      <div
        data-testid={ `${client}_orders__element-delivery-status-${sales.id}` }
      >
        { sales.status }
      </div>
      <div style={ { display: 'block' } }>
        <div
          data-testid={ `${client}_orders__element-order-date-${sales.id}` }
        >
          { date }
        </div>
        <div
          data-testid={ `${client}_orders__element-card-price-${sales.id}` }
        >
          { `$ ${totalLocal}` }
        </div>
      </div>
    </Button>
  );

  return card();
}

export default CardOrder;

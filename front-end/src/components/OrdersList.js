import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardOrder from './CardOrder';

// import { Container } from './styles';

function OrdersList() {
  const [sales, setSales] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const getSales = async () => {
      const { token, email, role } = JSON.parse(localStorage.getItem('user'));
      const user = await axios.get(`http://localhost:3001/user/${email}`);
      const { id } = user.data;
      const allSales = await axios.get(`http://localhost:3001/${role}/orders`, {
        headers: { authorization: token },
      });
      // console.log(allSales.data);
      if (role === 'customer') {
        const currentUser = allSales.data.filter((e) => e.users.email === email);
        // console.log(currentUser);
        setSales(currentUser);
        localStorage.setItem('sales', JSON.stringify(currentUser));
      } else if (role === 'seller') {
        const currentUser = allSales.data.filter((e) => e.sellerId === id);
        setSales(currentUser);
        localStorage.setItem('sales', JSON.stringify(currentUser));
      } else if (role === 'adm') {
        setSales(allSales);
        localStorage.setItem('sales', JSON.stringify(allSales.data));
      }
      setLoad(true);
      return sales;
    };

    getSales();
  }, []);

  const styleNo = {
    marginTop: '100px',
    textAlign: 'center',
  };

  return (
    <div
      className="order-list-main"
    >
      <div className="order-list">
        <h3>Your order list</h3>
        { (sales.length === 0) && <h2 style={ styleNo }>Nenhum Pedido ainda</h2> }
        { load
            && sales.map((e, i) => (
              <CardOrder sales={ { ...e, key: i } } key={ i } />
            )) }
      </div>
    </div>
  );
}

export default OrdersList;

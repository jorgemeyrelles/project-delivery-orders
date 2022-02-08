import React, { useEffect, useState } from 'react';
// import React, { useState } from 'react';
// import axios from 'axios';
import Card from './Card';

// import { Container } from './styles';

function CardList() {
  const [prodList, setProdList] = useState([]);
  // const [prodList] = useState([]);
  // console.log(prodList);
  const local = Object.values(JSON.parse(localStorage.getItem('products')));
  const MAX_PROD = 11;

  useEffect(() => {
    async function buildingList() {
      const list = await local;
      // console.log('card', user, local);
      setProdList(list);
    }
    buildingList();
  }, []);

  // useEffect(() => {
  //   axios.get('http://localhost:3001/customer/products')
  //     .then(({ data }) => setProdList(data))
  //     .catch(() => console.log('deu ruim'));
  // }, []);

  function renderList() {
    return (
      <div className="card-list">
        { prodList.slice(0, MAX_PROD).map((e, id) => (
          <Card
            product={ { ...e, key: id } }
            key={ id }
          />
        ))}
      </div>
    );
  }

  return renderList();
}

export default CardList;

import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// import { Container } from './styles';
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  // receive and deliver all products from API
  const [products, setProducts] = useState([]);
  // receive and deliver the costumer loged
  const [user, setUser] = useState(false);
  // receive and deliver selected product
  const [selected, setSelected] = useState([]);
  // total value
  const [total, setTotal] = useState(0);
  // status
  const [statuss, setStatuss] = useState(false);
  // sending values to components
  const value = {
    user,
    setUser,
    products,
    setProducts,
    selected,
    setSelected,
    total,
    setTotal,
    statuss,
    setStatuss,
  };

  return (
    <GlobalContext.Provider value={ value }>
      { children }
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

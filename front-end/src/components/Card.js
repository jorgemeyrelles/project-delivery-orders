import React, { useContext, useEffect, useState } from 'react';
import {
  Input,
  InputGroup,
  Button,
  CardImg,
  Card as ToCard,
  CardImgOverlay,
  CardText,
  CardTitle,
} from 'reactstrap';
import { GlobalContext } from '../context/GlobalState';

function Card(props) {
  const { product } = props;
  const { setSelected, setTotal } = useContext(GlobalContext);
  const [value, setValue] = useState(product.quantity);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem('chart'));
    if (arr.length === 0) {
      setTotal(0);
    } else {
      const calcTotal = arr.reduce((acc, e) => acc + (e.price * e.quantity), 0);
      setTotal(calcTotal);
    }
  }, [setTotal]);
  // mudei aqui

  const addToStore = (arr, valueAcc) => {
    arr.push({ ...product, quantity: valueAcc });
    localStorage.setItem('chart', JSON.stringify(arr));
    return setSelected(arr);
  };

  const removeFromStore = (arr, index) => {
    arr.splice(index, 1);
    localStorage.setItem('chart', JSON.stringify(arr));
    return setSelected(arr);
  };

  const updateStore = (arr, index, valueAcc) => {
    arr[index] = { ...product, quantity: valueAcc };
    localStorage.setItem('chart', JSON.stringify(arr));
    return setSelected(arr);
  };

  const sumTotal = () => {
    const calcTotal = JSON.parse(localStorage.getItem('chart'))
      .reduce((acc, e) => acc + (e.price * e.quantity), 0);
    return setTotal(calcTotal);
  };

  const updateProducts = (valueAcc) => {
    const prod = JSON.parse(localStorage.getItem('products'));
    const index = prod.findIndex((e) => e.name === product.name);
    const numMagic = -1;
    if (index !== numMagic) {
      prod[index].quantity = valueAcc;
      prod[index].total = parseFloat(prod[index].price) * valueAcc;
    }
    return localStorage.setItem('products', JSON.stringify(prod));
  };

  const sendTo = (valueAcc) => {
    // console.log('send 1', value, valueAcc);
    const arr = JSON.parse(localStorage.getItem('chart'));
    const index = arr.findIndex((e) => e.name === product.name);
    const numMagic = -1;
    // console.log('sendTo', valueAcc === 0, valueAcc);
    if (index !== numMagic && valueAcc === '0') {
      console.log('aqui', valueAcc);
      removeFromStore(arr, index);
      updateProducts(valueAcc);
    } else if (index !== numMagic && valueAcc !== '0') {
      updateStore(arr, index, valueAcc);
      updateProducts(valueAcc);
    } else {
      addToStore(arr, valueAcc);
      updateProducts(valueAcc);
    }
    sumTotal();
  };

  const submitMore = () => {
    // console.log('more 1', value);
    const valueMore = value + 1;
    setValue(valueMore);
    // console.log('more 2', value);
    return sendTo(valueMore);
  };

  const submitLess = () => {
    // console.log('less 1', value);
    const valueLess = value - 1;
    if (valueLess < 0) return setValue(0);
    setValue(valueLess);
    // console.log('less 2', value);
    return sendTo(valueLess);
  };

  const handleChange = ({ target }) => {
    // console.log(target);
    setValue(target.value);
    sendTo(target.value);
  };

  const card = () => (
    <div style={ { height: '350px', textAlign: '-webkit-center' } }>
      <ToCard
        inverse
        style={ {
          width: '350px', display: 'block', height: '300px', borderRadius: '.5rem',
        } }
      >
        <div style={ { width: '250px', height: '250px' } }>
          <CardImg
            data-testid={ `customer_products__img-card-bg-image-${product.id}` }
            src={ product.url_image }
            alt={ `about ${product.name}` }
            className="img-products"
            style={ { width: '50%' } }
          />
          <CardImgOverlay>
            <CardTitle
              tag="h4"
              className="price"
              style={ { width: '100px' } }
            >
              { `$ ${product.price.replace('.', ',')}` }
            </CardTitle>
            <CardText
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              { product.name }
            </CardText>
          </CardImgOverlay>
        </div>
        <div className="input-card">
          <InputGroup>
            <Button
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
              type="button"
              style={ { borderRadius: '5px 0 0 5px' } }
              onClick={ () => submitLess() }
            >
              -
            </Button>
          </InputGroup>
          <Input
            bsSize="sm"
            type="number"
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
            style={ { borderRadius: '0', textAlign: 'center', fontWeight: 'bold' } }
            onChange={ (e) => handleChange(e) }
            value={ value }
          />
          <InputGroup>
            <Button
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              style={ { borderRadius: '0 5px 5px 0' } }
              type="button"
              onClick={ () => submitMore() }
            >
              +
            </Button>
          </InputGroup>
        </div>
      </ToCard>
    </div>
  );

  return card();
}

export default Card;

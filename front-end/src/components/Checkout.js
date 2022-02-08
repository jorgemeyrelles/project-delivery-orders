import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import CardCheckout from './CardCheckout';

// import { Container } from './styles';

function Checkout() {
  // const { selected } = useContext(GlobalContext);
  const [address, setAddress] = useState({});
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);
  // const local = JSON.parse(localStorage.getItem('chart'));

  useEffect(() => {
    const getSeller = async () => {
      const allUsers = await axios.get('http://localhost:3001/user');
      const sel = allUsers.data.filter((e) => e.role === 'seller');
      setSellers(sel);
      // console.log(sel, sellers);
    };
    getSeller();
  }, []);

  function handleChange({ target: { value, name } }) {
    setAddress({
      ...address,
      [name]: value,
    });
  }

  async function submitBtn() {
    const { email, token, role } = JSON.parse(localStorage.getItem('user'));
    console.log('token', role);
    const user = await axios.get(`http://localhost:3001/user/${email}`);
    // console.log('aqui', user);
    const prods = JSON.parse(localStorage.getItem('chart'))
      .map((e) => ({ productId: e.id, quantity: e.quantity }));
    const res = {
      userId: user.data.id,
      sellerId: 2,
      totalPrice: JSON.parse(localStorage.getItem('chart'))
        .reduce((acc, { price, quantity }) => acc + (price * quantity), 0),
      deliveryAddress: address.address,
      deliveryNumber: address.number,
      status: 'Pendente',
      products: prods,
    };
    const ret = await axios.post('http://localhost:3001/customer/checkout',
      { ...res },
      { headers: { authorization: token } });
    const ret2 = await axios.get(`http://localhost:3001/${role}/orders/${ret.data}`,
      { headers: { authorization: token } });
    // console.log('post', ret2);
    localStorage.setItem('detail', JSON.stringify(ret2.data));
    navigate(`/${role}/orders/${ret.data}`);
  }

  const list = () => (
    <Input
      type="select"
      id="vend"
      name="vend"
      onChange={ handleChange }
      data-testid="customer_checkout__select-seller"
    >
      <option value="">Select one</option>
      { sellers && sellers.map((e, i) => (
        <option
          value={ e.name }
          key={ i }
        >
          { e.name }
        </option>
      )) }
    </Input>
  );

  const card = () => (
    <div className="detail-order">
      <div className="container-checkout">
        <h2>Finalizing order</h2>
        <div>
          <CardCheckout />
        </div>
      </div>
      <div style={ { margin: '90px 20px 20px 20px' } }>
        <h2>Details and Address to deliver</h2>
        <Form action="" style={ { display: 'flex', justifyContent: 'space-around' } }>
          <FormGroup style={ { display: 'block' } }>
            <Label for="vend">Seller resp</Label>
            { list() }
          </FormGroup>
          <FormGroup style={ { display: 'block' } }>
            <Label for="address">Address</Label>
            <Input
              data-testid="customer_checkout__input-address"
              style={ { width: '300px' } }
              type="text"
              id="address"
              name="address"
              placeholder="Address here - with no number"
              onChange={ handleChange }
            />
          </FormGroup>
          <FormGroup style={ { display: 'block' } }>
            <Label for="number">Number</Label>
            <Input
              data-testid="customer_checkout__input-addressNumber"
              style={ { width: '50px' } }
              id="number"
              type="number"
              name="number"
              onChange={ handleChange }
            />
          </FormGroup>
        </Form>
        <div style={ { textAlign: 'center', marginTop: '20px' } }>
          <Button
            color="primary"
            data-testid="customer_checkout__button-submit-order"
            type="button"
            onClick={ () => submitBtn() }
          >
            GET ORDER
          </Button>
        </div>
      </div>
    </div>
  );

  return card();
}

export default Checkout;

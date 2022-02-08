import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
} from 'reactstrap';
import { GlobalContext } from '../context/GlobalState';

function ToRegister() {
  const { setProducts } = useContext(GlobalContext);
  const [register, setRegister] = useState({ name: '', email: '', password: '' });

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  function handleChange({ target: { value, name } }) {
    setRegister({
      ...register,
      [name]: value,
    });
  }

  useEffect(() => {
    const { email, name, password } = register;
    const minName = 12;
    const emailValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const minPass = 6;
    const valid = emailValid.test(email)
      && name.length >= minName && password.length >= minPass;
    if (valid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [register]);

  async function submitBtn() {
    const { name, email, password } = register;
    // console.log(name, email, password);
    try {
      const tkn = await axios.post('http://localhost:3001/register', {
        name,
        email,
        password,
        role: 'customer',
      });
      const response = await axios.get(`http://localhost:3001/user/${email}`);
      console.log('user', register);
      localStorage.setItem('user', JSON.stringify({
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        token: tkn.data.token,
      }));
      const prod = await axios.get('http://localhost:3001/customer/products');
      prod.data.map((item) => {
        item.total = 0;
        item.quantity = 0;
        return item;
      });
      // console.log('nav', user, local)
      setProducts(prod);
      localStorage.setItem('products', JSON.stringify(prod.data));
      localStorage.setItem('chart', JSON.stringify([]));
      navigate('/customer/products');
    } catch (erro) {
      console.log(erro);
      console.log(erro.status);
      if (erro) {
        setError(true);
      }
    }
  }

  return (
    <main className="main-form">
      <h2>Register</h2>
      <Form inline style={ { textAlign: '-webkit-center' } }>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
          <Label
            className="me-sm-2"
            for="name"
          >
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Type your name here"
            name="name"
            onChange={ handleChange }
            data-testid="common_register__input-name"
          />
        </FormGroup>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
          <Label
            className="me-sm-2"
            for="email"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Type your e-mail here"
            name="email"
            onChange={ handleChange }
            data-testid="common_register__input-email"
          />
        </FormGroup>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
          <Label
            className="me-sm-2"
            for="password"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Type your password here"
            name="password"
            onChange={ handleChange }
            data-testid="common_register__input-password"
          />
        </FormGroup>
        <Button
          style={ { marginTop: '10px', width: '100px' } }
          color="primary"
          type="button"
          id="registerBtn"
          disabled={ disabled }
          onClick={ () => submitBtn() }
          data-testid="common_register__button-register"
        >
          Submit
        </Button>
        {error}
        <UncontrolledPopover
          placement="right"
          target="registerBtn"
          trigger="click"
        >
          <PopoverHeader>
            Invalid data
          </PopoverHeader>
          <PopoverBody>
            Email is already registered!
          </PopoverBody>
        </UncontrolledPopover>
      </Form>
    </main>
  );
}

export default ToRegister;

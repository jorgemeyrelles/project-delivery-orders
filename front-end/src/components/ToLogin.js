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

function ToLogin() {
  const { setUser, setProducts } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);

  function handleChange({ target: { value, name } }) {
    setLogin({
      ...login,
      [name]: value,
    });
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'customer') {
      navigate('/customer/products');
    }
    if (user && user.role === 'seller') {
      navigate('/seller/orders');
    }
    if (user && user.role === 'administrator') {
      navigate('/admin/manage');
    }
  }, []);

  useEffect(() => {
    const { email, password } = login;
    const minPass = 6;
    const emailValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (emailValid.test(email) && password.length >= minPass && password.length !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [login]);

  async function submitBtn() {
    const { email, password } = login;
    try {
      const userData = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      setUser(true);
      localStorage.setItem('user', JSON.stringify({
        name: userData.data.user.name,
        email: userData.data.user.email,
        role: userData.data.user.role,
        token: userData.data.user.token,
      }));
      const prod = await axios.get('http://localhost:3001/customer/products');
      prod.data.map((item) => {
        item.total = 0;
        item.quantity = 0;
        return item;
      });
      setProducts(prod);
      localStorage.setItem('products', JSON.stringify(prod.data));
      localStorage.setItem('chart', JSON.stringify([]));
      // if (email === 'zebirita@email.com' && password === '$#zebirita#$') {
      // }
      if (email.split('@')[0] === 'adm') {
        navigate('/admin/manage');
      } else if (userData.data.user.role === 'customer') {
        navigate('/customer/products');
      } else if (userData.data.user.role === 'seller') {
        navigate('/seller/orders');
      }
    } catch (erro) {
      if (erro) {
        setError(true);
      }
    }
  }

  function formInitBoot() {
    return (
      <Form inline style={ { textAlign: '-webkit-center' } }>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
          <Label
            className="me-sm-2"
            for="id-email"
          >
            Email
          </Label>
          <Input
            id="id-email"
            type="email"
            placeholder="Type your e-mail here"
            name="email"
            onChange={ handleChange }
            data-testid="common_login__input-email"
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
            data-testid="common_login__input-password"
          />
        </FormGroup>
        <Button
          style={ { marginTop: '10px', width: '100px' } }
          color="primary"
          id="loginBtn"
          type="button"
          disabled={ disabled }
          onClick={ () => submitBtn() }
          data-testid="common_login__button-login"
        >
          Submit
        </Button>
        {error}
        <UncontrolledPopover
          placement="right"
          target="loginBtn"
          trigger="click"
        >
          <PopoverHeader>
            Invalid data
          </PopoverHeader>
          <PopoverBody>
            Email/password incorret or Email is not registered yet!
          </PopoverBody>
        </UncontrolledPopover>
      </Form>
    );
  }

  return (
    <main className="main-form">
      <h2>Login</h2>
      {formInitBoot()}
      <div>
        <Button
          style={ { marginTop: '10px', width: '100px' } }
          color="primary"
          outline
          type="button"
          onClick={ () => navigate('/register') }
          data-testid="common_login__button-register"
        >
          Register
        </Button>
      </div>
    </main>
  );
}

export default ToLogin;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

function FormAdmin() {
  const [disabled, setDisabled] = useState(true);
  const [login, setLogin] = useState({ name: '', email: '', password: '', role: '' });
  const [error, setError] = useState(false);

  useEffect(() => {
    const { name, email, password, role } = login;
    const minName = 12;
    const minPass = 6;
    const emailRegex = /\S+@\S+\.\S+/;
    if (name.length >= minName
      && emailRegex.test(email)
      && password.length >= minPass
      && role !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [login]);

  function handleChange({ target: { value, name } }) {
    setLogin({
      ...login,
      [name]: value,
    });
  }

  const submitBtn = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, role } = login;
      const { token } = JSON.parse(localStorage.getItem('user'));
      await axios.post('http://localhost:3001/register', {
        name,
        email,
        password,
        role,
      },
      { headers: { authorization: token } });
      setLogin({ name: '', email: '', password: '', role: '' });
      window.location.reload(true);
    } catch (erro) {
      if (erro) {
        setError(true);
        setLogin({ name: '', email: '', password: '', role: '' });
      }
    }
  };

  const styleForm = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#ccc',
    borderRadius: '5px',
  };

  const styleErr = {
    border: '1px solid black',
    borderRadius: '5px',
    width: '200px',
    position: 'absolute',
    right: '10vh',
  };

  return (
    <form style={ { display: 'block', width: '100%' } }>
      <h3>Cadastrar novo usuário</h3>
      <div style={ styleForm }>
        <div style={ { height: '100px' } }>
          <h4>Nome</h4>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Nome e sobrenome"
            onChange={ handleChange }
            data-testid="admin_manage__input-name"
            value={ login.name }
          />
        </div>
        <div style={ { height: '100px' } }>
          <h4>Email</h4>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="seuemail@site.com.br"
            onChange={ handleChange }
            data-testid="admin_manage__input-email"
            value={ login.email }
          />
        </div>
        <div style={ { height: '100px' } }>
          <h4>Senha</h4>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="********"
            onChange={ handleChange }
            data-testid="admin_manage__input-password"
            value={ login.password }
          />
        </div>
        <div style={ { height: '100px' } }>
          <h4>Tipo</h4>
          <select
            name="role"
            id="select"
            data-testid="admin_manage__select-role"
            onChange={ handleChange }
          >
            <option value="" selected>Selecione</option>
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button
          style={ { height: '30px' } }
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ disabled }
          onClick={ (e) => submitBtn(e) }
        >
          Cadastrar
        </button>
      </div>
      { error ? (
        <h3
          style={ styleErr }
          data-testid="admin_manage__element-invalid-register"
        >
          Usuário já cadastrado!
        </h3>
      ) : null }
    </form>
  );
}

export default FormAdmin;

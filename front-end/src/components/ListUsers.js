import axios from 'axios';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function ListUsers() {
  const [allUsers, setAllUsers] = useState([]);

  const url = 'http://localhost:3001/user';

  useEffect(() => {
    const getAllUsers = async () => {
      const { email, token } = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(url, { headers: { authorization: token } });
      const users = response.data.filter((e) => e.email !== email);
      setAllUsers(users);
    };
    getAllUsers();
  }, []);

  const removeOne = async (idValue) => {
    console.log(idValue.id);
    const { email, token } = JSON.parse(localStorage.getItem('user'));
    await axios.delete('http://localhost:3001/admin/users',
      { data: { id: idValue.id } },
      { headers: { authorization: token } });
    const res = await axios.get(url);
    const users = res.data.filter((e) => e.email !== email);
    setAllUsers(users);
  };

  const changeRole = (role) => {
    if (role === 'seller') {
      return 'P. Vendedora';
    }
    if (role === 'customer') {
      return 'Cliente';
    }
    if (role === 'administrator') {
      return 'Administrador';
    }
  };

  const card = () => (
    <div>
      <h3>Lista de usuários</h3>
      <table style={ { width: '100%', justifyContent: 'space-around' } }>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          { allUsers.length !== 0 && allUsers.map((e, i) => (
            <tr key={ i }>
              <th
                data-testid={ `admin_manage__element-user-table-item-number-${i}` }
              >
                {i + 1}
              </th>
              <th
                data-testid={ `admin_manage__element-user-table-name-${i}` }
              >
                {e.name}
              </th>
              <th
                data-testid={ `admin_manage__element-user-table-email-${i}` }
              >
                {e.email}
              </th>
              <th
                data-testid={ `admin_manage__element-user-table-role-${i}` }
              >
                {changeRole(e.role)}
              </th>
              <th>
                <button
                  data-testid={ `admin_manage__element-user-table-remove-${i}` }
                  style={ { cursor: 'pointer' } }
                  type="button"
                  onClick={ () => removeOne(e) }
                >
                  Excluir
                </button>
              </th>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );

  return card();
}

export default ListUsers;

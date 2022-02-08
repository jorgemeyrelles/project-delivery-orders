import React from 'react';
import FormAdmin from '../../components/FormLogin';
import ListUsers from '../../components/ListUsers';
import NavbarCard from '../../components/NavbarCard';

function AdminForm() {
  return (
    <div>
      <NavbarCard />
      <FormAdmin />
      <ListUsers />
    </div>
  );
}

export default AdminForm;

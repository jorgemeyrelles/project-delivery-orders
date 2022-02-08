import React from 'react';
import { useNavigate } from 'react-router';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';

import './Navbar.css';

function NavbarCard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const currentUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    }
    return user;
  };

  return (
    <Navbar
      color="success"
      container="md"
      expand="md"
      fixed="top"
      full
      light
    >
      <NavbarBrand href="/">
        <i
          className="fab fa-untappd fa-2x"
          style={ { color: 'white' } }
        />
      </NavbarBrand>
      <Collapse navbar>
        <Nav
          className="me-auto"
          navbar
        >
          <NavItem>
            <NavLink
              href="/customer/products"
              data-testid="customer_products__element-navbar-link-products"
            >
              PRODUCTS
            </NavLink>
          </NavItem>
          <NavItem>
            <Button
              color="primary"
              type="button"
              onClick={ () => navigate(`/${currentUser().role}/orders`) }
              style={ { cursor: 'pointer', height: '100%', border: 'none' } }
              className="navbar-item"
              data-testid="customer_products__element-navbar-link-orders"
            >
              MY ORDERS
            </Button>
          </NavItem>
        </Nav>
      </Collapse>
      {/* <NavItem>
      </NavItem> */}
      <Button
        color="warning"
        type="button"
        className="navbar-logout"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => logout() }
      >
        EXIT
      </Button>
    </Navbar>
  );
}

export default NavbarCard;

import './App.css';

import React, { useState } from 'react';

import {
  Card, CardText, CardBody, CardTitle, CardDeck,
  Collapse,
  Navbar, NavbarToggler, NavbarBrand, Nav,
  NavItem, NavLink,
  Row
} from 'reactstrap';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="App">
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">UfakPark</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/signup/">Kayıt Ol</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login/">Giriş Yap</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Row className="d-flex justify-content-center align-items-center h-75 w-100">
        <CardDeck>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Ücretli Otopark</CardTitle>
              <CardText>Ücretli Otoparklar Hakkında Kısa Bir Bilgi</CardText>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Gümüş Paket</CardTitle>
              <CardText>Gümüş Paket Hakkında Kısa Bir Bilgi</CardText>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Altın Paket</CardTitle>
              <CardText>Altın Paket Hakkında Kısa Bir Bilgi</CardText>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Elmas Paket</CardTitle>
              <CardText>Elmas Paket Hakkında Kısa Bir Bilgi</CardText>
            </CardBody>
          </Card>
        </CardDeck>
      </Row>
    </div>
  );
}

export default App;

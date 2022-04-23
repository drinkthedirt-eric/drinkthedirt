import React from 'react';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">DRINK THE DIRT</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/coffees">Coffee</Nav.Link>
            <Nav.Link as={NavLink} to="/brewing">Brewing</Nav.Link>
            <Nav.Link as={NavLink} to="/tastings">Tastings & Classes</Nav.Link>
            <Nav.Link as={NavLink} to="/community">Discuss</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

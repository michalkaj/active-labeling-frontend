import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

export default function Topbar(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <Button onClick={props.onLoadImages}>Load</Button>
          </Nav.Item>
          <Nav.Item>
            <Button onClick={props.onSave}>Save</Button>
          </Nav.Item>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Item>
            <Button onClick={props.onSetup}>Setup</Button>
          </Nav.Item>
          <Nav.Item>
            <Button onClick={props.onLabeling}>Labeling</Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
 )
}

import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default class Topbar extends Component{
  render() {
    return (
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

      <Nav className="mr-auto">
        <Nav.Item>
          <Button onClick={this.props.onLoadImages}>Load</Button>
        </Nav.Item>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Item>
          <Button onClick={this.props.onPrev}>Prev</Button>
        </Nav.Item>
        <Nav.Item>
          <Button onClick={this.props.onNext}>Next</Button>
        </Nav.Item>
      </Nav>


    </Navbar.Collapse>
  </Navbar>
    )
  }
}
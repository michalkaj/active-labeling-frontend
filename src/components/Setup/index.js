import React, { Component } from 'react';
import {Col, Form, InputGroup} from 'react-bootstrap';
import './style.css'

export default class Setup extends Component {
  handleAddLabel = (event) => {
    const [lastItem] = this.state.inputLabels.slice(-1);
    const lastItemId = lastItem.props.id;
    if (event.target.id === lastItemId) {
      this.setState({
        inputLabels: [...this.state.inputLabels, this.createNewInput(lastItemId + 1)]
      })
    }
  }

  createNewInput = (id) => {
    return <Form.Control id={id + ''} type="text" placeholder="Label..." onFocus={this.handleAddLabel}/>
  }

  state = {
    inputLabels: [this.createNewInput(0)]
  }

  render() {
    return (
      <>
      <Col>
        <label for="active-url">Active learning URL</label>
        <Form.Control name="active-url" type="text" placeholder="Url..." onFocus={this.handleAddLabel}/>
      </Col>
      <Col>
      <Form>
        <div id="multiclass-radio">
          <Form.Text>Multiclass</Form.Text>
          <InputGroup classname="mb-3">
            <Form.Check inline label="Yes" type="radio" id={"multiclass-yes"} name="multiclass"/>
            <Form.Check inline label="No" type="radio" id={"multiclass-no"} name="multiclass"/>
          </InputGroup>
          <Form.Text>Labels</Form.Text>
        </div>
        <div id="labels-input-list">
          <Form.Group>
            {this.state.inputLabels}
          </Form.Group>
        </div>
      </Form>
    </Col>
    </>
    )
  }
}

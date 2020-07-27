import React, { Component } from 'react';
import {Col, Form, InputGroup, Button} from 'react-bootstrap';
import './style.css'

export default class Setup extends Component {
  handleAddLabel = (event) => {
    const [lastItem] = this.state.inputLabels.slice(-1);
    const lastItemId = lastItem.props.id;
    if (event.target.id === lastItemId) {
      this.setState({
        inputLabels: [...this.state.inputLabels, this.createNewInput(parseInt(lastItemId) + 1)]
      })
    }
  }

  handleFocusOut = (event) => {
    const [lastItem] = this.state.inputLabels.slice(-1);
    const value = event.target.value.trim() || "";
    if (value.length === 0 && event.target.id !== lastItem.props.id) { 
      // const inputLabels = this.state.inputLabels;
      // const id = parseInt(event.target.id);
      // console.log(id);
      // this.setState({
      //   inputLabels: [...inputLabels.slice(0, id), ...inputLabels.slice(id + 1)]
      // });
    } else {
      this.setState({
        labels: new Set([...this.state.labels, value])
      })
    }
  }

  createNewInput = (id) => {
    return <Form.Control id={id + ''} type="text" placeholder="Label..." 
      onFocus={this.handleAddLabel}
      onBlur={this.handleFocusOut}/>
  }

  state = {
    inputLabels: [this.createNewInput(0)],
    multiclass: false,
    activeUrl: undefined,
    labels: new Set()
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
            <Form.Check inline label="No" type="radio" id={"multiclass-no"} name="multiclass" checked/>
          </InputGroup>
          <Form.Text>Labels</Form.Text>
        </div>
        <div id="labels-input-list">
          <Form.Group>
            {this.state.inputLabels}
          </Form.Group>
        </div>
        <Button onClick={this.onSaveOptions}>Save</Button>
      </Form>
    </Col>
    </>
    )
  }

  onSaveOptions = () => {
    this.props.onSaveOptions({
      multiclass: this.state.multiclass,
      activeUrl: this.state.activeUrl,
      labels: Array.from(this.state.labels)
    })
  }
}

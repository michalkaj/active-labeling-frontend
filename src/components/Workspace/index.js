import React, { Component } from 'react';
import './style.css'
import Topbar from '../Topbar/index'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import promptSamples from '../../utils/sampleLoading'
import saveSamples from '../../utils/sampleSaving'
import Labeling from '../Labeling/index';
import Setup from '../Setup/index';


export default class Workspace extends Component {
   state = {
    samples: [],
    currentWindow: 'setup',
    options: {
      labels: ['test one', 'test two'],
      multiclass: false
    }
   }

  render() {
    return (
      <Container 
        className="mainContainer"
        style={{maxWidth:"100%", maxHeight: "100%"}}>
        <Row>
          <Col>
            <Topbar
              id="topbar" 
              onLoadImages={this.onLoadImages}
              onSetup={() => this.setState({currentWindow: 'setup'})}
              onLabeling={() => this.setState({currentWindow: 'labeling'})}
              onSave={this.onSave}/>
          </Col>
        </Row>
        <Row className="workspace">
          {this.renderWindow()}
        </Row>
      </Container>
    )
  }

  renderWindow = () => {
    switch (this.state.currentWindow) {
      case 'setup':
        return <Setup 
                  onSaveOptions={this.onSaveOptions}
                  options={this.state.options}
                />;
      case 'labeling':
        return <Labeling 
                  samples={this.state.samples}
                  options={this.state.options}
                />;
      default:
        break
    }
  }

  onLoadImages = () => {
    const electron = window.require('electron');
    promptSamples({ electron })
      .then(result => {
        const resultNotNull = Boolean(result) ? result : [];
        this.setState({
          samples: resultNotNull,
        })
      })
  }

  onSave = () => {
    const electron = window.require('electron');
    const samples = JSON.stringify(this.state.samples);
    saveSamples(samples, electron);
  }

  onSaveOptions = (options) => {
    this.setState({
      options: options
    })
  }
}
import React, { Component } from 'react';
import Topbar from '../Topbar/index'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import './style.css'
import promptSamples from '../../utils/sampleLoading'
import saveSamples from '../../utils/sampleSaving'
import Labeling from '../Labeling/index';
import Setup from '../Setup/index';


export default class Workspace extends Component {
   state = {
    samples: [],
    labels: ['One', 'Two'],
    currentWindow: 'setup'
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
        return <Setup/>;
      case 'labeling':
        return <Labeling 
                  samples={this.state.samples}
                  labels={this.state.labels}
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
}
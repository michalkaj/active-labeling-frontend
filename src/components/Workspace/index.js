import React, { Component } from 'react';
import Topbar from '../Topbar/index'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import './style.css'
import promptSamples from '../../utils/sampleLoading'
import saveSamples from '../../utils/sampleSaving'
import Labeling from '../Labeling/index';


export default class Workspace extends Component {
   state = {
    samples: [],
    selectedImageIndex: undefined,
    labels: ['One', 'Two']
   }

  render() {
    return (
      <Container 
        className="mainContainer"
        style={{maxWidth:"100%", maxHeight: "100%"}}>
        <Row>
          <Col>
            <Topbar 
              onLoadImages={this.onLoadImages}
              onNext={this.onNext}
              onPrev={this.onPrev}
              onSave={this.onSave}/>
          </Col>
        </Row>
        <Row className="workspace">
          <Labeling 
            samples={this.state.samples}
            labels={this.state.labels}
            currentSample={this.currentImage()}
            onLabelClick={this.onLabelClick}
          />
        </Row>
      </Container>
    )
  }

  onLoadImages = () => {
    const electron = window.require('electron');
    promptSamples({ electron })
      .then(result => {
        const resultNotNull = Boolean(result) ? result : [];
        this.setState({
          samples: resultNotNull,
          selectedImageIndex: resultNotNull.length ? 0 : undefined
        })
      })
  }

  currentImage = () => {
    if (this.state.selectedImageIndex !== undefined)
      return this.state.samples[this.state.selectedImageIndex];
    else
      return {src: 'https://react.rocks/images/converted/react-svg-pan-zoom.jpg'};
  }

  onNext = () => {
    const samples = this.state.samples;
    const index = this.state.selectedImageIndex;
    if (index < samples.length - 1)
      this.setState({
        selectedImageIndex: this.state.selectedImageIndex + 1,
      })
  }

  onPrev = () => {
    const index = this.state.selectedImageIndex;
    if (index > 0)
      this.setState({
        selectedImageIndex: this.state.selectedImageIndex - 1,
      })
  }

  onLabelClick = (label, nextImage=false) => {
    const image = this.currentImage();
    image.label = label; 
    if (nextImage)
      this.onNext();
  }

  onSave = () => {
    const electron = window.require('electron');
    const samples = JSON.stringify(this.state.samples);
    saveSamples(samples, electron);
  }
}
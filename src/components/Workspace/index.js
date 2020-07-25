import React, { Component } from 'react';
import Topbar from '../Topbar/index'
import Sidebar from '../Sidebar/index'
import ImageClassification from '../ImageClassification/index'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import './style.css'
import promptSamples from '../../utils/sampleLoading'
import saveSamples from '../../utils/sampleSaving'


export default class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImageIndex: undefined,
      labels: ['One', 'Two']
    }
  }

  render() {
    return (
      <Container bsStyle="default" style={{maxWidth:"95%"}}>
        <Row>
          <Col>
            <Topbar 
              onLoadImages={this.onLoadImages}
              onNext={this.onNext}
              onPrev={this.onPrev}
              onSave={this.onSave}/>
          </Col>
        </Row>
        <Row bsStyle="default" className="workspace">
          <Col xs={10} className="labelingWorkspace">
            <ImageClassification 
              imageSrc={this.currentImage().src}
              labels={this.state.labels}
              onLabelClick={this.onLabelClick}/>
          </Col>
          <Col>
            <Sidebar
              key={this.state.selectedImageIndex}
              labels={this.state.labels}
              selectedLabel={this.currentImage().label}
              onLabelClick={this.onLabelClick}
              samples={this.state.images}/>
          </Col>
        </Row>
      </Container>
    )
  }

  onLoadImages = () => {
    const electron = window.require('electron');
    promptSamples({ electron })
      .then(result => {
        this.setState({
          images: result,
          selectedImageIndex: (result.length > 0) ? 0 : undefined
        })
      })
  }

  currentImage = () => {
    if (this.state.selectedImageIndex !== undefined)
      return this.state.images[this.state.selectedImageIndex];
    else
      return {src: 'https://react.rocks/images/converted/react-svg-pan-zoom.jpg'};
  }

  onNext = () => {
    const images = this.state.images;
    const index = this.state.selectedImageIndex;
    if (index < images.length - 1)
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
    const samples = JSON.stringify(this.state.images);
    saveSamples(samples, electron);
  }
}
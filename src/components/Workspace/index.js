import React, { Component } from 'react';
import Topbar from '../Topbar/index'
import ImageClassification from '../ImageClassification/index'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import './style.css'
import promptSamples from '../../utils/sampleLoading'


export default class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImageIndex: undefined
    }
  }

  render() {
    return (
      <Container bsStyle="default" style={{maxWidth:"95%"}}>
        <Row>
          <Col>
            <Topbar onLoadImages={this.onLoadImages}
                    onNext={this.onNext}
                    onPrev={this.onPrev}/>
          </Col>
        </Row>
        <Row bsStyle="default" className="workspace">
          <Col xs={10} className="labelingWorkspace">
            <ImageClassification imageSrc={this.currentImage()}/>
          </Col>
          <Col>Sidebar</Col>
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
          selectedImageIndex: 0
        })
      })
  }

  currentImage = () => {
    if (this.state.images.length > 0) {
      return this.state.images[this.state.selectedImageIndex].src;
    }
    return 'https://react.rocks/images/converted/react-svg-pan-zoom.jpg'
  }

  onNext = () => {
    this.setState({
      selectedImageIndex: this.state.selectedImageIndex + 1
    })
  }

  onPrev = () => {
    this.setState({
      selectedImageIndex: this.state.selectedImageIndex - 1
    })
  }
}
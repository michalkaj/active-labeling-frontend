import React, { Component } from 'react';
import Sidebar from '../Sidebar/index'
import ImageClassification from '../ImageClassification/index'
import Col from 'react-bootstrap/Col';
import './style.css'

export default class Labeling extends Component {
  state = {
    selectedImageIndex: undefined,
   }

  componentDidUpdate(prevProps) {
    if (this.props.samples !== prevProps.samples) {
      this.setState({
        selectedImageIndex: 0
      })
    }
  }

  render() {
    return (
      <>
        <Col xs={10} className="labelingWorkspace">
        <ImageClassification 
            imageSrc={this.currentSample().src}
            labels={this.props.labels}
            onLabelClick={this.onLabelClick}/>
        </Col>
        <Col>
          <Sidebar
            key={this.currentSample().src}
            labels={this.props.labels}
            samples={this.props.samples}
            selectedLabel={this.currentSample().label}
            onLabelClick={this.onLabelClick}
            onPrev={this.onPrev}
            onNext={this.onNext}
            />
        </Col>
      </>
    )
  }

  currentSample = () => {
    if (this.state.selectedImageIndex !== undefined)
      return this.props.samples[this.state.selectedImageIndex];
    else
      return {src: 'https://react.rocks/images/converted/react-svg-pan-zoom.jpg'};
  }

  onNext = () => {
    const samples = this.props.samples;
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
    const image = this.currentSample();
    image.label = label; 
    if (nextImage)
      this.onNext();
  }
}

import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import './style.css'


export default class ImageClassification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: 'https://react.rocks/images/converted/react-svg-pan-zoom.jpg',
      labels: ['Valid', 'Invalid', 'Test', 'Test2']
    }
  }

  render() {
    return (
      <div id="labelingWindow">
        <div id="imageContainer">
          <img src={this.props.imageSrc}
              id="sample" 
              alt="Label this"/>
        </div>
        <div id="buttonContainer">
          <ul>
            {this.state.labels.map((label, i) => {
              return (<li><Button variant="primary">{`(${i + 1}) ${label}`}</Button></li>)
            })}
          </ul>
        </div>
      </div>
    )
  }

  changeImage = () => {
    const imageSrc = this.props.changeImage()
    if (imageSrc !== undefined) {
      this.setState({
        'imageUri': imageSrc
      })
    }
  }
}
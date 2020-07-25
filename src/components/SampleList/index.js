
import React, { Component } from 'react';
import ReactList from 'react-list';
import './style.css';

export default class SampleList extends Component {
  render() {
    return (
      <ReactList
        itemRenderer={this.renderSample}
        length={this.props.samples.length}
      />
    )
  }

  renderSample = (index, key) => {
    const sample = this.props.samples[index];
    return (
      <div 
        key={key}
        class="sample">
        <img src={sample.src}/>
        <a>
          {limitNameLenght(sample.name)}
          {sample.label}
        </a>
      </div>
    )
  }
}

const limitNameLenght = (name, limit = 16) => {
  if (name.length > limit) {
    return name.substring(0, limit) + '...'
  } else {
    return name;
  }
}
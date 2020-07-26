import React from 'react';
import Sidebar from '../Sidebar/index'
import ImageClassification from '../ImageClassification/index'
import Col from 'react-bootstrap/Col';
import './style.css'

export default function Labeling(props) {
  return (
    <>
      <Col xs={10} className="labelingWorkspace">
        <ImageClassification 
          imageSrc={props.currentSample.src}
          labels={props.labels}
          onLabelClick={props.onLabelClick}/>
      </Col>
      <Col>
        <Sidebar
          key={props.currentSample.src}
          labels={props.labels}
          selectedLabel={props.currentSample.label}
          onLabelClick={props.onLabelClick}
          samples={props.samples}/>
      </Col>
    </>
  )
}

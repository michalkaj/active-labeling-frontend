import React from 'react';
import { Button } from 'react-bootstrap';
import './style.css'


export default function ImageClassification(props) {
  return (
    <div id="labelingWindow">
      <div id="imageContainer">
        <img src={props.imageSrc}
            id="sample" 
            alt="Label this"/>
      </div>
      <div id="buttonContainer">
        <ul>
          {props.labels.map((label, i) => {
            return (<li key={label}>
              <Button 
                onClick={() => props.onLabelClick(label, true)}
                variant="primary">
                  {`(${i + 1}) ${label}`}
              </Button></li>)
          })}
        </ul>
      </div>
    </div>
  )
}
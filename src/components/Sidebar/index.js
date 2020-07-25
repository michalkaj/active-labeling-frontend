import React from 'react';
import Select from 'react-select';
import SampleList from '../SampleList/index'
import './style.css'

export default function Sidebar(props) {
  return (
    <div id="sidebar">
      <div>
        <Select
          autoFocus="true"
          placeholder="Select label..."
          options={props.labels.map(labelToOption)}
          value={props.selectedLabel ? labelToOption(props.selectedLabel) : undefined}
          onChange={(selectedLabel) => {
            props.onLabelClick(selectedLabel.label);
          }}
        />
        </div>
        <div class="sampleList">
          <SampleList 
            samples={props.samples}/>
        </div>
    </div>
    )
}

const labelToOption = (l) => {
  return {value: l.toLowerCase(), label: l}
}

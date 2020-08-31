import React, { Component } from 'react';
import Sidebar from 'components/Sidebar'
import ImageClassification from 'components/ImageClassification'
import Grid from "@material-ui/core/Grid";

const styles = {
  Sidebar: { backgroundColor: "lightblue"},
  ImageClassification : {
    backgroundColor: "blue",
    height: '100%'
  },
  Workspace: {
    backgroundColor: "orange",
    height: "100%"
  }
}

export default class Labeling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImageIndex: (props.samples.length !== 0) ? 0 : undefined,
      labeledInBatch: 0,
      progress: 0
    };
  }


  componentDidUpdate(prevProps) {
    if (this.props.samples !== prevProps.samples) {
      this.setState({
        selectedImageIndex: 0,
        labeledInBatch: 0
      })
    }
  }

  render() {
    return (
      <Grid container
            style={styles.Workspace}
            direction="row"
      >
        <Grid item
              sm={9}
              style={styles.ImageClassification}>
          <ImageClassification
              imageSrc={this.currentSample().src}
              labels={this.props.labels}
              multiclass={this.props.multiclass}
              onLabelClick={this.onLabelClick}/>
        </Grid>
        <Grid item
              sm={3} style={styles.Sidebar}>
          <Sidebar
            key={this.currentSample().name}
            labels={this.props.labels}
            multiclass={this.props.multiclass}
            selectedLabel={this.currentSample().label}
            onLabelClick={this.onLabelClick}
            onPrev={this.onPrev}
            onNext={this.onNext}
            onTeach={this.props.onTeach}
            progress={this.state.progress}
            />
        </Grid>
      </Grid>
    )
  }

  currentSample = () => {
    if (this.state.selectedImageIndex !== undefined)
      return this.props.samples[this.state.selectedImageIndex];
    else
      return {src: 'https://react.rocks/images/converted/react-svg-pan-zoom.jpg'};
  }

  computeProgress = (labeledInBatch) => {
    return (labeledInBatch / this.props.samples.length) * 100;
  }

  onNext = () => {
    const samples = this.props.samples;
    const index = this.state.selectedImageIndex;
    if (index < samples.length - 1){
      this.setState({
        selectedImageIndex: this.state.selectedImageIndex + 1,
      })
    }

  }

  onPrev = () => {
    const index = this.state.selectedImageIndex;
    if (index > 0)
      this.setState({
        selectedImageIndex: this.state.selectedImageIndex - 1,
      })
  }


  onLabelClick = (labels, nextImage=false) => {
    const sample = this.currentSample();
    var labeledInBatch = this.state.labeledInBatch;
    console.log(sample);
    if (labels.length === 0) {
      labeledInBatch -= 1;
    } else if (sample.labels === undefined || sample.labels.length === 0) {
      labeledInBatch += 1;
    }
    sample.labels = labels;

    this.setState({
      labeledInBatch: labeledInBatch,
      progress: this.computeProgress(labeledInBatch)
    });
    if (nextImage)
      this.onNext();
  }
}

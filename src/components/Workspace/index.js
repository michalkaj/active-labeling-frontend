import React, {Component} from 'react';
import TabPanel from '../TabPanel/index'
import convertSample from '../../utils/sampleDecoding'
import saveSamples from '../../utils/sampleSaving'
import Labeling from '../Labeling/index';
import Setup from '../Setup/index';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { saveAs } from 'file-saver';


const styles = {
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
    height: 'calc(100% - 48px)'
  },
  LabelingWorkspace: {
    backgroundColor: "yellow",
    height: "100%"
  }
};

export default class Workspace extends Component {
  state = {
    samples: [],
    currentWindow: 'setup',
    labels: [],
    multiclass: false,
    activeUrl: 'http://localhost:5000/',
    tab: 0
  }

  render() {
    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Tabs value={this.state.tab} onChange={this.handleChangeTab}>
            <Tab label="Setup" id="setup-tab" />
            <Tab label="Labeling" id="labeling-tab" />
            <Tab label="Progress" id="progress-tab" />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.tab} index={0} style={styles.LabelingWorkspace}>
          <Setup
            onSaveOptions={this.onSaveOptions}
            multiclass={this.state.multiclass}
            labels={this.state.labels}
            activeUrl={this.state.activeUrl}
            onLoadImages={this.onLoadImages}
            onSave={this.onSave}
            fetchConfig={this.fetchConfig}
          />
        </TabPanel>
        <TabPanel value={this.state.tab} index={1} style={styles.LabelingWorkspace}>
          <Labeling
            samples={this.state.samples}
            multiclass={this.state.multiclass}
            labels={this.state.labels}
            activeUrl={this.state.activeUrl}
            onTeach={this.onTeach}
          />
        </TabPanel>
        <TabPanel value={this.state.tab} index={2} style={styles.LabelingWorkspace}>
        </TabPanel>
      </div>
    )
  }

  handleChangeTab = (event, newTab) => {
    this.setState({tab: newTab})
  }

  onLoadImages = () => {
    fetch(this.state.activeUrl + 'query')
      .then(res => res.json())
      .then(result => {
        const samples = result.samples.map(convertSample);
        this.setState({samples});
      })
  }

  onSave = () => {
    const samplesJson = JSON.stringify(
      this.state.samples.map(s => {return {name: s.name, label: s.label}}));
    const blob = new Blob([samplesJson], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'labels.json');
  }

  fetchConfig = () => {
    fetch(this.state.activeUrl + 'config')
      .then(res => res.json())
      .then(config => {
         this.setState({
           ...config
        })
      });
  }

  onSaveOptions = (multiclass, labels, activeUrl) => {
    const configJson = JSON.stringify({
        'labels': labels,
        'multiclass': multiclass
      });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: configJson
    };
    fetch(this.state.activeUrl + 'config', requestOptions);
    this.setState({
      multiclass, labels, activeUrl
    })
  }

  onTeach = () => {
    const samplesJson = JSON.stringify({'samples': this.state.samples});

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: samplesJson
    };
    fetch(this.state.activeUrl + 'annotate', requestOptions)
      .then(fetch(this.state.activeUrl + 'teach'))
      .then(res => {
        console.log(res);
      })
  }
}
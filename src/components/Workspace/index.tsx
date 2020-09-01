import React, {Component} from 'react';
import TabPanel from '../TabPanel'
import Labeling from '../Labeling';
import Setup from '../Setup';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Sample from "../../model/sample";
import ActiveLearning from "../../model/activeLearning";
import Config from "../../model/config";
import {styled} from "@material-ui/styles";


const Root = styled('div')({
    flexGrow: 1,
    margin: 0,
    padding: 0,
    height: 'calc(100% - 48px)'
});

const LabelingPanel = styled(TabPanel)({
    backgroundColor: "yellow",
    height: "100%"
})


export default class Workspace extends Component {
    state = {
        samples: [],
        currentWindow: 'setup',
        tab: 0,
        selectedImageIndex: null,
        labeledInBatch: 0,
        config: new Config()
    }
    activeLearning: ActiveLearning;

    constructor(props: any) {
        super(props);
        this.activeLearning = new ActiveLearning(this.state.config.activeUrl);
    }

    render() {
        return (
            <Root>
                <AppBar position="static">
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleChangeTab}
                    >
                        <Tab label="Setup" id="setup-tab"/>
                        <Tab label="Labeling" id="labeling-tab"/>
                        <Tab label="Progress" id="progress-tab"/>
                    </Tabs>
                </AppBar>
                <LabelingPanel
                    value={this.state.tab}
                    index={0}
                >
                    <Setup
                        // onSaveOptions={this.onSaveOptions}
                        onLoadImages={this.onLoadImages}
                        config={this.state.config}
                        fetchConfig={this.fetchConfig}
                        onSave={() => {
                        }}
                    />
                </LabelingPanel>
                <LabelingPanel
                    value={this.state.tab}
                    index={1}
                >
                    <Labeling
                        onPrev={this.onPrev}
                        onNext={this.onNext}
                        onLabelClick={this.onLabelClick}
                        onTeach={this.onTeach}
                        currentSample={this.getCurrentSample()}
                        samples={this.state.samples}
                        config={this.state.config}
                        labeledInBatch={this.state.labeledInBatch}
                    />
                </LabelingPanel>
                <LabelingPanel
                    value={this.state.tab}
                    index={2}
                >
                </LabelingPanel>
            </Root>
        )
    }

    handleChangeTab = (event: object, value: any) => {
        this.setState({tab: value})
    }

    onLoadImages = () => {
        this.activeLearning
            .fetchSamples()
            .then(samples => {
                this.setState({
                    samples: samples,
                    selectedImageIndex: 0
                });
            });
    }

    fetchConfig = () => {
        this.activeLearning
            .fetchConfig()
            .then(config => {
                this.setState({config})
            });
    }

    onTeach = () => {
        this.activeLearning
            .teach(this.state.samples);
    }

    onNext = () => {
        const samples = this.state.samples;
        const index = this.state.selectedImageIndex;
        if (index === null)
            throw new Error('index is not set');
        if (index < samples.length - 1) {
            this.setState({
                selectedImageIndex: index + 1,
            })
        }

    }

    onPrev = () => {
        const index = this.state.selectedImageIndex;
        if (index === null)
            throw new Error('index is not set');
        if (index > 0)
            this.setState({
                selectedImageIndex: index - 1,
            })
    }

    onLabelClick = (labels: Array<string>, nextImage: boolean = false) => {
        const sample = this.getCurrentSample();
        var labeledInBatch = this.state.labeledInBatch;
        if (labels.length === 0) {
            labeledInBatch -= 1;
        } else if (sample.labels === undefined || sample.labels.length === 0) {
            labeledInBatch += 1;
        }
        sample.labels = labels;

        this.setState({
            labeledInBatch: labeledInBatch,
            selectedLabels: labels
        });
        if (nextImage)
            this.onNext();
    }

    getCurrentSample = (): Sample => {
        const index = this.state.selectedImageIndex;
        if (index == null) {
            return new Sample('???', [], 0);
        }
        return this.state.samples[index];
    }
}
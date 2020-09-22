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
import Progress from "../Progress";


const Root = styled('div')({
    flexGrow: 1,
    margin: 0,
    padding: 0,
    height: 'calc(100% - 48px)',
    backgroundColor: 'red'
});

const LabelingPanel = styled(TabPanel)({
    backgroundColor: '#F5F5F5',
    height: 'calc(100% - 48px)'
})


export default class Workspace extends Component {
    state = {
        samples: [],
        currentWindow: 'setup',
        tab: 0,
        selectedImageIndex: null,
        labeledInBatch: 0,
        stats: {
            metrics: [],
            label_frequencies: []
        },
        config: {
            'dataset_name': 'dataset',
            'allowed_labels': [],
            'multiclass': false,
            'active_url': 'http://localhost:5000/',
            'batch_size': 10
        }
    }
    activeLearning: ActiveLearning;

    constructor(props: any) {
        super(props);
        this.activeLearning = new ActiveLearning();
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
                        onLoadImages={this.onFetchImages}
                        config={this.state.config}
                        fetchConfig={this.fetchConfig}
                        saveConfig={this.saveConfig}
                    />
                </LabelingPanel>
                <LabelingPanel
                    value={this.state.tab}
                    index={1}
                >
                    <Labeling
                        onPrev={this.onPrev}
                        onNext={this.onNext}
                        onSelectSample={this.onSelectSample}
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
                    <Progress
                        fetchStats={this.fetchStats}
                        stats={this.state.stats}
                    />
                </LabelingPanel>
            </Root>
        )
    }

    handleChangeTab = (event: object, value: any) => {
        this.setState({tab: value})
    }

    onFetchImages = () => {
        this.activeLearning
            .fetchSamples(this.state.config.active_url, this.state.config.batch_size)
            .then(samples => {
                this.setState({
                    samples: samples,
                    selectedImageIndex: 0,
                    labeledInBatch: 0
                });
            });
    }

    fetchConfig = () => {
        this.activeLearning
            .fetchConfig(this.state.config.active_url)
            .then(config => {
                console.log(config);
                console.log('cc', Boolean(config.multiclass));
                this.setState({config})
            });
    }

    fetchStats= () => {
        console.log('fetching metrics')
        this.activeLearning
            .fetchStats(this.state.config.active_url)
            .then(stats => {
                this.setState({stats})
            });
    }

    onTeach = () => {
        this.activeLearning
            .teach(this.state.config.active_url, this.state.samples)
            .then(result => {
                if (result == 200) {
                    this.onFetchImages();
                }
            });
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

    onSelectSample = (index: number) => {
        this.setState({selectedImageIndex: index})
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

    onLabelClick = (labels: Array<string>) => {
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
        if (!this.state.config.multiclass)
            this.onNext();
    }

    getCurrentSample = (): Sample => {
        const index = this.state.selectedImageIndex;
        if (index == null) {
            return new Sample('???', '???', []);
        }
        return this.state.samples[index];
    }

    saveConfig = (name: string, value: any): void => {
        console.log('saving', name, value);
        this.setState((prevState) => {
            let config: Config = Object.assign({}, this.state.config);
            config[name] = value;
            return {config};
        })
    }
}
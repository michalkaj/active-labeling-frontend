import React, {Component} from 'react';
import TabPanel from '../TabPanel'
import Labeling from '../Labeling';
import Setup from '../Setup';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Sample from "../../utils/sample";
import ActiveLearning from "../../utils/activeLearning";
import Config from "../../utils/config";
import {styled} from "@material-ui/styles";
import Metrics from "../Metrics";
import {getFromStorage, randomHSL, saveToStorage} from "../../utils/utils";
import loadJson from "../../utils/loadJson";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {Cookies} from "react-cookie";
import Stats from "../../utils/metric";
import config from "../../utils/config";


const Root = styled('div')({
    flexGrow: 1,
    margin: 0,
    padding: 0,
    height: '90%',
    minHeight: '90vh',
    backgroundColor: 'red',
    boxShadow: '3',
    elevation: 25,
});

const LabelingPanel = styled(TabPanel)({
    backgroundColor: '#F5F5F5',
    height: '100%'
})


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1565C0'
        },
        secondary: {
            main: '#FFC107'
        },
        text: {
            primary: '#212121'
        }
    }
});

type propTypes = {
    cookies: Cookies
};

type stateType = {
    samples: Sample[],
    tab: number,
    selectedImageIndex: number,
    labeledInBatch: number,
    stats: Stats,
    config: Config,
    labelColors: Map<string, string>,
    // cookies: Cookies,
}

export default class Workspace extends Component {
    activeLearning: ActiveLearning;
    state: stateType;

    constructor(props: propTypes) {
        super(props);
        const defaultConfig = {
            'dataset_name': 'dataset',
            'server_url': '',
            'allowed_labels': [],
            'batch_size': 10,
            'pool_size': 0.1,
            'training_set_size': 20,
        };

        this.state = {
            samples: [],
            tab: getFromStorage('tab', 0),
            selectedImageIndex: -1,
            labeledInBatch: 0,
            stats: {
                metrics: [],
                label_frequencies: []
            },
            config: getFromStorage('config', defaultConfig),
            labelColors: new Map(),
        }
        this.updateColorMapping(this.state.config.allowed_labels)
        this.activeLearning = new ActiveLearning();
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
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
                            loadAnnotations={e => loadJson(e, this.loadAnnotations)}
                            loadConfig={e => loadJson(e, this.loadConfig)}
                            saveConfig={this.saveConfig}
                            saveSamples={this.onFetchAnnotations}
                            updateColorMapping={this.updateColorMapping}
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
                            fetchSamples={this.onFetchImages}
                            labelColorMapping={this.state.labelColors}
                        />
                    </LabelingPanel>
                    <LabelingPanel
                        value={this.state.tab}
                        index={2}
                    >
                        <Metrics
                            fetchStats={this.fetchStats}
                            stats={this.state.stats}
                        />
                    </LabelingPanel>
                </Root>
            </MuiThemeProvider>
        )
    }

    handleChangeTab = (event: object, value: any) => {
        saveToStorage('tab', value);
        this.setState({tab: value})
    }

    onFetchImages = () => {
        this.activeLearning
            .fetchSamples(this.state.config.server_url, this.state.config.batch_size, this.state.config.pool_size)
            .then(samples => {
                this.setState({
                    samples: samples,
                    selectedImageIndex: 0,
                    labeledInBatch: 0
                });
            });
    }

    onFetchAnnotations = () => {
        this.activeLearning
            .fetchAnnotations(this.state.config.server_url)
            .then(annotations => {
                const jsonString = JSON.stringify(annotations);
                const a = document.createElement("a");
                const file = new Blob([jsonString], {type: 'text/plain'});
                a.href = URL.createObjectURL(file);
                let name = annotations['dataset_name'];
                if (name === undefined || name.length == 0) {
                    name = 'dataset'
                }
                a.download = name + '.json';
                a.click();
            });
    }

    loadConfig = (config: any) => {
        const newConfig = {...this.state.config, ...config};
        this.setState({config: newConfig});
        saveToStorage('config', newConfig);
        this.updateColorMapping(newConfig.allowed_labels);
        // this.activeLearning
        // .fetchConfig(this.state.config.server_url)
        // .then(config => {
        //     const newConfig = {...this.state.config, ...config};
        //     this.setState({config: newConfig});
        //     console.log('this is new config', newConfig);
        //     this.updateColorMapping(newConfig.allowed_labels);
        // });
    }

    loadAnnotations = (annots: any) => {
        const annotations = annots.annotations;
        const samples  = Object.entries(annotations).map((key: any) =>
            new Sample(key[0], '', '', key[1]));
        this.activeLearning.annotate(this.state.config.server_url, samples)
            .then(result => {
                console.log(result);
            });
    }

    fetchStats= () => {
        this.activeLearning
            .fetchStats(this.state.config.server_url)
            .then(stats => {
                this.setState({stats})
            });
    }

    onTeach = () => {
        this.activeLearning
            .teach(this.state.config.server_url, this.state.samples)
            .then(response => {
                if (response.ok) {
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

    onLabelClick = (label: string | null) => {
        const sample = this.getCurrentSample();
        let labeledInBatch = this.state.labeledInBatch;
        if (label === null) {
            labeledInBatch -= 1;
        } else if (sample.label === null) {
            labeledInBatch += 1;
        }
        sample.label = label;

        this.setState({
            labeledInBatch: labeledInBatch,
            selectedLabel: label
        });
        this.onNext();
    }

    getCurrentSample = (): Sample => {
        const index = this.state.selectedImageIndex;
        if (index < 0) {
            return new Sample('???', '???', '???');
        }
        return this.state.samples[index];
    }

    saveConfig = (name: string, value: any): void => {
        this.setState((prevState) => {
            let newConfig: Config = Object.assign({}, this.state.config);
            newConfig[name] = value;
            saveToStorage('config', newConfig);
            return {'config': newConfig};
        })
    }

    updateColorMapping = (labelNames: string[]) => {
        const labelColors = this.state.labelColors;
        labelNames.map(labelName => {
            if (!labelColors.has(labelName)) {
                labelColors.set(labelName, randomHSL());
            }
        })
        this.setState({labelColors});
    }
}
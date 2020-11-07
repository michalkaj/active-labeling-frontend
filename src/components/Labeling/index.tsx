import React, {useEffect} from 'react';
import Sidebar from '../Sidebar'
import ImageClassification from '../ImageClassification'
import Grid from "@material-ui/core/Grid";
import Sample from "../../utils/sample";
import Config from "../../utils/config";
import {styled} from "@material-ui/styles";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const WorkspaceGrid = styled(Grid)({
    // backgroundColor: '#eceff1',
    height: '100%',
    // overflow: 'hidden'
})

type Props = {
    onPrev: () => void,
    onNext: () => void,
    fetchSamples: () => void,
    onTeach: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onSelectSample : (index: number) => void,
    onLabelClick: (labels: string | null) => void,
    currentSample: Sample,
    samples: Array<Sample>,
    config: Config
    labeledInBatch: number,
    labelColorMapping: Map<string, string>
}

const Labeling = (props: Props) => {
    useEffect(() => {
        console.log('props', props);
        if (props.samples.length == 0) {
            console.log('fetching')
            props.fetchSamples();
        }
    });

    return (
        <WorkspaceGrid
            container
        >
            <Grid
                container
                xs={9}
                direction='row'
            >
                <Grid
                    item
                    container
                    xs={1}
                    alignItems='center'
                    justify='flex-start'
                    onClick={props.onPrev}
                >
                    <ArrowBackIosIcon/>
                </Grid>
                <Grid
                    container
                    alignItems='center'
                    xs={10}
                >
                    {/*<LinearProgress*/}
                    {/*    variant="determinate"*/}
                    {/*    value={20}*/}
                    {/*    style={{'width': '90%'}}*/}
                    {/*/>*/}
                    <ImageClassification
                        imageSrc={props.currentSample.src}/>
                </Grid>
                <Grid
                    item
                    container
                    xs={1}
                    alignItems='center'
                    justify='flex-end'
                    onClick={props.onNext}
                >
                    <ArrowForwardIosIcon/>
                </Grid>
            </Grid>
            <Sidebar
                key={props.currentSample.name}
                labels={props.config.allowed_labels}
                multiclass={props.config.multiclass}
                selectedLabel={props.currentSample.label}
                onLabelClick={props.onLabelClick}
                onSelectSample={props.onSelectSample}
                onTeach={props.onTeach}
                progress={computeProgress(props.labeledInBatch, props.samples)}
                samples={props.samples}
                labelColorMapping={props.labelColorMapping}
            />
        </WorkspaceGrid>
    )
}

const computeProgress = (labeledInBatch: number, samples: Array<Sample>): number => {
    return (labeledInBatch / samples.length) * 100;
}

export default Labeling;
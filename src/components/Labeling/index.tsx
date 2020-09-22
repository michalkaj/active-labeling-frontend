import React from 'react';
import Sidebar from '../Sidebar'
import ImageClassification from '../ImageClassification'
import Grid from "@material-ui/core/Grid";
import Sample from "../../model/sample";
import Config from "../../model/config";
import {styled} from "@material-ui/styles";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const WorkspaceGrid = styled(Grid)({
    backgroundColor: '#eceff1',
    height: '100%',
    overflow: 'hidden'
})

type Props = {
    onPrev: () => void,
    onNext: () => void,
    onTeach: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onSelectSample : (index: number) => void,
    onLabelClick: (labels: Array<string>) => void,
    currentSample: Sample,
    samples: Array<Sample>,
    config: Config
    labeledInBatch: number,
}

const Labeling = (props: Props) => {
    return (
        <WorkspaceGrid
            container
            justify='space-between'
            direction='row'
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
                    xs={10}
                >
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
                selectedLabels={props.currentSample.labels}
                onLabelClick={props.onLabelClick}
                onSelectSample={props.onSelectSample}
                onTeach={props.onTeach}
                progress={computeProgress(props.labeledInBatch, props.samples)}
                samples={props.samples}
            />
        </WorkspaceGrid>
    )
}

const computeProgress = (labeledInBatch: number, samples: Array<Sample>): number => {
    return (labeledInBatch / samples.length) * 100;
}

export default Labeling;
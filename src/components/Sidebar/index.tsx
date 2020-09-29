import React from 'react';
import Select, {ValueType} from 'react-select';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import {styled} from "@material-ui/styles";
import SampleList from "../SampleList";
import Sample from "../../model/sample";
import {Divider, Typography} from "@material-ui/core";

const StyledLinearProgress = styled(Grid)({
    width: '70%'
});

const SideBarGrid = styled(Grid) ({
    backgroundColor: '#cfd8dc',
    // height: '100%',
    // overflow: 'auto'
    overflow: 'hidden'
})

// const SampleListContainer = styled(Grid)({
//     width: '90%',
//     height: 300,
//     overflow: 'auto'
// })

type TOption = {
    label: string
}

type Props = {
    onTeach: (event: React.MouseEvent<HTMLButtonElement>) => void
    onSelectSample : (index: number) => void,
    onLabelClick: (label: string | null) => void
    progress: number,
    multiclass: boolean,
    labels: string[],
    selectedLabel: string | null,
    samples: Array<Sample>,
    labelColorMapping: Map<string, string>
}

const Sidebar = (props: Props) => {
    return (
        <SideBarGrid
            container
            xs={3}
            direction='column'
            // justify='center'
            alignItems='center'
        >
            <Grid
                item
                container
                direction='row'
                alignItems='center'
                justify="space-evenly"
                style={{marginTop: 30}}
            >
                <StyledLinearProgress item>
                    <LinearProgress
                        variant='determinate'
                        value={props.progress}

                    />
                </StyledLinearProgress>
                <Grid>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={props.progress !== 100}
                        onClick={props.onTeach}
                    >
                        Teach
                    </Button>
                </Grid>
            </Grid>

            <Divider variant='middle' style={{marginTop: 30, marginBottom: 30}}/>

            <Grid
                container
                item
                justify='center'
                style={{width: '90%'}}
            >
                <Grid item style={{width: '100%'}}>
                    <Typography>Pick a label</Typography>
                </Grid>
                <Grid
                    item
                    style={{width: '100%', marginTop: 10, marginBottom: 10}}
                >
                    <Select
                        style={{width: '100%'}}
                        autoFocus={true}
                        placeholder="Label..."
                        options={props.labels.map(l => {return {label: l}})}
                        isMulti={false}
                        // value={props.selectedLabel.name}
                        onChange={(option) => handleChange(option, props)}
                    />
                </Grid>
                <Grid
                    item
                    container
                    justify='center'
                    style={{width: '100%', overflow: 'auto'}}
                >
                    {renderTopLabels(props.labels, 10, props)}
                </Grid>
            </Grid>

            <Divider variant='middle' style={{marginTop: 30, marginBottom: 30}}/>

            <Grid
                item
                container
                style={{height: 500, width: '90%'}}
            >
                <Grid item>
                    <Typography>Samples in batch</Typography>
                </Grid>
                <Grid
                    container
                    item
                    style={{height: '100%', overflowX: 'hidden', overflowY: 'scroll'}}
                >
                    <SampleList
                        samples={props.samples}
                        onSelectSample={props.onSelectSample}
                        labelColorMapping={props.labelColorMapping}
                    />
                </Grid>
            </Grid>

        </SideBarGrid>
    )
}

const handleChange = (option: ValueType<TOption>, props: Props): void => {
    const opt = option as TOption;
    if (option !== null && option !== undefined)
        props.onLabelClick(opt.label);
};

const renderTopLabels = (labels: Array<string>, item_num: number = 10, props: Props) => {
    const topLabels = labels.slice(0, item_num);
    return (
        topLabels.map(label => {
            return (
                <Button
                    style={{borderRadius: 16, backgroundColor: props.labelColorMapping.get(label), margin: 2}}
                    variant='outlined'
                    onClick={() => {
                        props.onLabelClick(label)
                    }}
                >
                    {label}
                </Button>
            )
        })
    )
}


export default Sidebar;
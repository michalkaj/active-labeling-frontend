import React from 'react';
import Select, {OptionsType, ValueType} from 'react-select';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import {styled} from "@material-ui/styles";
import SampleList from "../SampleList";
import Sample from "../../model/sample";
import {Divider, List, ListItem, ListItemText, Typography} from "@material-ui/core";

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



type Props = {
    onTeach: (event: React.MouseEvent<HTMLButtonElement>) => void
    onSelectSample : (index: number) => void,
    onLabelClick: (label: string[]) => void
    progress: number,
    multiclass: boolean,
    labels: string[],
    selectedLabels: string[],
    samples: Array<Sample>
}

type TOption = {
    label: string,
    value: string
};


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
                        options={stringsToLabelGroup(props.labels)}
                        isMulti={props.multiclass}
                        value={stringsToLabelGroup(props.selectedLabels)}
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
                    />
                </Grid>
            </Grid>

        </SideBarGrid>
    )
}


const randomHSL = () => {
    return "hsla(" + ~~(360 * Math.random()) + "," +
        "70%," +
        "80%, 0.5)"
}


const handleChange = (option: ValueType<TOption>, props: Props): void => {
    if (props.multiclass) {
        var options = option as TOption[];
        options = (options === null) ? [] : options;
        props.onLabelClick(options.map((o: TOption) => o.label));
    } else {
        option = option as TOption;
        if (option !== null && option !== undefined)
            props.onLabelClick([option.label]);
    }
};


const stringsToLabelGroup = (labels: string[]): OptionsType<TOption> => {
    if (labels === undefined)
        return [];
    return labels.map(l => {
        return {label: l, value: l.toLowerCase()}
    });
};

const renderTopLabels = (labels: Array<string>, item_num: number = 10, props: Props) => {
    const topLabels = labels.slice(0, item_num);
    const alreadySelected = (props.selectedLabels === undefined) ? [] : props.selectedLabels;

    return (
        topLabels.map(l => {
            const index = alreadySelected.indexOf(l);
            return (
                <Button
                    style={{borderRadius: 16, backgroundColor: randomHSL(), margin: 2}}
                    variant='outlined'
                    onClick={() => {
                        if (index === -1) {
                            props.onLabelClick([l, ...alreadySelected])
                        }
                        else {
                            props.onLabelClick([
                                ...alreadySelected.slice(0, index),
                                ...alreadySelected.slice(index + 1),
                            ])
                        }
                    }}
                >
                    {l}
                </Button>
            )
        })
    )
}

export default Sidebar;
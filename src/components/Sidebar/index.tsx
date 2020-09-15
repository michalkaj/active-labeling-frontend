import React from 'react';
import Select, {OptionsType, ValueType} from 'react-select';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import {styled} from "@material-ui/styles";
import SampleList from "../SampleList";
import Sample from "../../model/sample";
import {List, ListItem, ListItemText} from "@material-ui/core";


const StyledSelect = styled(Grid)({
    width: '90%',
});

const StyledLinearProgress = styled(Grid)({
    width: '90%'
});

const SideBarGrid = styled(Grid) ({
    backgroundColor: '#cfd8dc',
    height: '100%'
})

const SampleListContainer = styled(Grid)({
    height: '40%',
    width: '90%',
    overflow: 'auto'
})



type Props = {
    onPrev: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onNext: (event: React.MouseEvent<HTMLButtonElement>) => void,
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
            direction="column"
            alignItems='center'
            spacing={2}
        >
            <Grid
                item
                container
                justify="space-evenly"
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={props.onPrev}
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={props.onNext}>
                    Next
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={props.progress !== 100}
                    onClick={props.onTeach}
                >
                    Teach
                </Button>
            </Grid>
            <StyledSelect item>
                <Select
                    autoFocus={true}
                    placeholder="Select a label..."
                    options={stringsToLabelGroup(props.labels)}
                    isMulti={props.multiclass}
                    value={stringsToLabelGroup(props.selectedLabels)}
                    onChange={(option) => handleChange(option, props)}
                />
            </StyledSelect>

            {renderTopLabels(props.labels, 3, props)}

            <StyledLinearProgress item>
                <LinearProgress variant="determinate" value={props.progress}/>
            </StyledLinearProgress>

            <SampleListContainer item>
                <SampleList samples={props.samples} onSelectSample={props.onSelectSample}/>
            </SampleListContainer>
        </SideBarGrid>
    )
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

const renderTopLabels = (labels: Array<string>, item_num: number = 5, props: Props) => {
    const topLabels = labels.slice(0, item_num);
    const alreadySelected = (props.selectedLabels === undefined) ? [] : props.selectedLabels;

    return (
        <Grid container direction={"column"} style={{'width': '90%'}}>
            {topLabels.map(l => {
                const index = alreadySelected.indexOf(l);
                return (
                    <Button
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
                                    // selected={index !== -1}

                }
        </Grid>
    )
}

export default Sidebar;
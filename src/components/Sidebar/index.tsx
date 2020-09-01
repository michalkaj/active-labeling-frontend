import React from 'react';
import Select, {OptionsType, ValueType} from 'react-select';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import {styled} from "@material-ui/styles";


const StyledSelect = styled(Grid)({
    width: '90%',
    backgroundColor: 'red'
});

const StyledLinearProgress = styled(Grid)({
    width: '90%'
});


type Props = {
    onPrev: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onNext: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onTeach: (event: React.MouseEvent<HTMLButtonElement>) => void
    onLabelClick: (label: string[]) => void
    progress: number,
    multiclass: boolean,
    labels: string[],
    selectedLabels: string[]
}

type TOption = {
    label: string,
    value: string
};


const Sidebar = (props: Props) => {
    return (
        <Grid
            container
            direction="column"
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
            <StyledLinearProgress item>
                <LinearProgress variant="determinate" value={props.progress}/>
            </StyledLinearProgress>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={props.progress !== 100}
                    onClick={props.onTeach}
                >
                    Teach
                </Button>
            </Grid>
        </Grid>
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


export default Sidebar;
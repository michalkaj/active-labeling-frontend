import React from 'react';
import Select, {ValueType} from 'react-select';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import {styled} from "@material-ui/styles";
import SampleList from "../SampleList";
import Sample from "../../utils/sample";
import {Box, Paper, Typography} from "@material-ui/core";


const SideBarGrid = styled(Grid) ({
    // backgroundColor: '#e2f1f8',
    // borderColor: 'primary.main',
    border: 2,
    height: '100%',
    // overflow: 'auto'
    // overflow: 'hidden'
})

const SideBarItem = styled(Grid) ({
    item: 'true',
    container: 'true',
    paddingTop: '10%',
    width: '90%',
})

const MyPaper = styled(Paper)({
    width: '100%',
    height: '100%',
    elevation: 3
})

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
            justify='center'
        >
            <MyPaper>
                <Grid
                    item
                    container
                    justify='center'
                    alignItems='flex-start'
                    alignContent='flex-start'
                >
                    <SideBarItem
                        container
                        direction='row'
                        alignItems='center'
                    >
                        <Grid
                            item
                            style={{width: '80%', paddingRight: '3%'}}
                        >
                            <LinearProgress
                                variant='determinate'
                                value={props.progress}

                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={props.progress !== 100}
                                onClick={props.onTeach}
                            >
                                Teach
                            </Button>
                        </Grid>
                    </SideBarItem>

                    <SideBarItem>
                        <Grid item style={{width: '100%'}}>
                            <Typography >
                                <Box color="textPrimary" fontSize="h6.fontSize" fontWeight='fontWeightBold'>
                                    Label
                                </Box>
                            </Typography>
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
                            // justify='center'
                            style={{width: '100%', overflow: 'auto'}}
                        >
                            {renderTopLabels(props.labels, 10, props)}
                        </Grid>
                    </SideBarItem>

                    <SideBarItem>
                        <Grid item>
                            <Typography >
                                <Box color="textPrimary" fontSize="h6.fontSize" fontWeight='fontWeightBold'>
                                    Current batch
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                        >
                            <SampleList
                                samples={props.samples}
                                onSelectSample={props.onSelectSample}
                                labelColorMapping={props.labelColorMapping}
                            />
                        </Grid>
                    </SideBarItem>

                </Grid>

            </MyPaper>
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
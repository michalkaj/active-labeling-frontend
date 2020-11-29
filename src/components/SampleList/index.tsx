import React, {ReactText} from 'react';
import Sample from "../../utils/sample";
import {Grid, List, ListItem, ListItemText} from "@material-ui/core";
import ReactList from "react-list";
import Button from "@material-ui/core/Button";
import {styled} from "@material-ui/styles";

type Props = {
    samples: Array<Sample>,
    onSelectSample : (index: number) => void,
    labelColorMapping: Map<string, string>
}

const SampleList = (props: Props) => {
    return (
        <Grid style={{width: '100%'}}>
            <List style={{overflowY: 'scroll', height: 350}}>
                {props.samples.map((s, i) => renderItem2(i, s, props))}
            </List>
        </Grid>
    )
}
const renderItem2 = (index: number, sample: Sample, props: Props) => {
    return (
        <ListItem key={sample.src}
            onClick={() => props.onSelectSample(index)}
            style={{backgroundColor: (sample.label !== null) ? '#81c784' : '#e57373',
                marginBottom: 4,
                padding: 4,
                borderRadius: 10,
                width: '100%',
            }}>
            <Grid
                item
                container
                justify={'space-between'}
                direction='row'
            >
                <Grid item>
                    <img
                        style={{'height': 40, 'width': 40, borderRadius: '50%'}}
                        src={sample.src}
                        alt={sample.name}
                    />
                </Grid>
                <Grid item>
                    <ListItemText>{sample.name}</ListItemText>
                </Grid>
                <Grid item
                      container
                      justify='flex-end'
                      style={{width: '40%'}}>
                    {renderLabels(sample.label, props.labelColorMapping)}
                </Grid>
            </Grid>
        </ListItem>
    )
}


const renderItem = (index: number, key: ReactText, props: Props) => {
    const sample = props.samples[index];
    return (
        <ListItem key={sample.src}
            onClick={() => props.onSelectSample(index)}
            style={{backgroundColor: (sample.label !== null) ? '#81c784' : '#e57373',
                marginBottom: 4,
                padding: 4,
                borderRadius: 10,
                width: '100%',
            }}>
            <Grid
                item
                container
                justify={'space-between'}
                direction='row'
            >
                <Grid item>
                    <img
                        style={{'height': 40, 'width': 40, borderRadius: '50%'}}
                        src={sample.src}
                        alt={sample.name}
                    />
                </Grid>
                <Grid item>
                    <ListItemText>{sample.name}</ListItemText>
                </Grid>
                <Grid item
                      container
                      justify='flex-end'
                      style={{width: '40%'}}>
                    {renderLabels(sample.label, props.labelColorMapping)}
                </Grid>
            </Grid>
        </ListItem>
    )
}

const renderLabels = (label: string | null, labelColorMapping: Map<string, string>) => {
    let color = undefined
    if (label !== null)
       color = labelColorMapping.get(label);
       return (
           <Button
                style={{borderRadius: 16, backgroundColor: color,
                    margin: 2, height: 30}}
                disableFocusRipple
                size='small'
            variant='outlined'>{label}</Button>
    )
}

export default SampleList;
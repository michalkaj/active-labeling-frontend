import React, {ReactText} from 'react';
import Sample from "../../model/sample";
import {Divider, Grid, List, ListItem, ListItemText, styled} from "@material-ui/core";
import ReactList from "react-list";
import Button from "@material-ui/core/Button";

const StyledList = styled(List)({
   overflow: 'auto',
   backgroundColor: 'red'
});

type Props = {
    samples: Array<Sample>,
    onSelectSample : (index: number) => void,
}

const SampleList = (props: Props) => {
    return (
        <ReactList
            itemRenderer={(i, k) => renderItem(i, k, props)}
            length={props.samples.length}
            type='uniform'
        />
    )
}

const renderItem = (index: number, key: ReactText, props: Props) => {
    const sample = props.samples[index];
    return (
        <ListItem key={sample.src}
            onClick={() => props.onSelectSample(index)}
            style={{backgroundColor: (sample.labels.length > 0) ? '#81c784' : '#e57373', marginBottom: 4, borderRadius: 10}}>
            <Grid item>
                <img style={{'height': 40, 'width': 40, borderRadius: '50%'}} src={sample.src} alt={sample.src}/>
            </Grid>
            <Grid
                item
                container
                style={{textOverflow: 'clip', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                <Grid item>
                    <ListItemText>{sample.name}</ListItemText>
                </Grid>
                <Grid container direction="row">
                    {renderLabels(sample.labels)}
                </Grid>
            </Grid>
        </ListItem>
    )
}

const renderLabels = (labels: Array<string>) => {
    const labels_ = (labels.length > 0) ? labels : [' '];
    return labels_.map((label) =>(
       <Button
            style={{borderRadius: 16, backgroundColor: randomHSL(),
                margin: 2, height: 30}}
            disableFocusRipple
            size='small'
            variant='outlined'>{label}</Button>
    ))
}

const randomHSL = () => {
    return "hsla(" + ~~(360 * Math.random()) + "," +
        "70%," +
        "80%, 0.5)"
}

export default SampleList;
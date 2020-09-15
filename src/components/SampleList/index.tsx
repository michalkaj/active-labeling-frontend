import React from 'react';
import ReactList from 'react-list';
import Sample from "../../model/sample";
import {Container, Grid, List, ListItem, styled, Typography} from "@material-ui/core";

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
        <StyledList>
            {props.samples.map((sample, i) => (
                <ListItem key={sample.src}
                    onClick={() => props.onSelectSample(i)}
                    style={{'backgroundColor': (sample.labels.length > 0) ? 'green' : 'red'}}>
                    <Grid>
                        <img style={{'height': 30, 'width': 30}} src={sample.src} alt={sample.src}/>
                    </Grid>
                    <Grid style={{textOverflow: 'clip', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                        <Grid>
                            <Typography align='center'>{sample.name}</Typography>
                        </Grid>
                        <Grid container direction="row">
                            {renderLabels(sample.labels)}
                        </Grid>
                    </Grid>
                </ListItem>
            ))}
        </StyledList>
    )
}

const renderLabels = (labels: Array<string>) => {
    const labels_ = (labels.length > 0) ? labels : [' '];
    return labels_.map((label) =>(
        <div>
            {label}
        </div>
    ))
}

export default SampleList;
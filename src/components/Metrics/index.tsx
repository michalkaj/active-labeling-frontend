import React, {useEffect} from 'react';
import Plot from 'react-plotly.js';
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import Stats from "../../utils/metric";
import {styled} from "@material-ui/styles";

type Props = {
    fetchStats : () => void,
    stats: Stats
}

const MyPaper = styled(Paper)({
    width: '100%',
    height: '100%',
    elevation: 3,
    padding: '5%'
})

const Metrics = (props: Props) => {
    useEffect(() => {
        props.fetchStats();
    }, []);

    const labels = Object.keys(props.stats.label_frequencies);
    const frequencies = Object.values(props.stats.label_frequencies);
    return (
        <Grid container
              justify='center'
            style={{'width': '100%'}}>
        <Grid
            container
            justify='center'
            alignItems='center'
            style={{overflow: 'auto', 'width': '50%', height: '90%'}}
        >
            <MyPaper>
                <Grid container item justify='center'>
                     <Typography >
                        <Box color="textPrimary" fontSize="h4.fontSize" fontWeight='fontWeightBold'>
                            Metrics
                        </Box>
                    </Typography>
                </Grid>

                <Grid item container
                      justify='center'
                      style={{marginBottom: 30}}>
                    {props.stats.metrics.map((metric_values: any) => {
                        const [metric_name, values] = metric_values;
                        const y = values.map((v: any) => v['metric_value']);
                        const x = values.map((v: any) => v['num_samples']);

                        console.log('vaallsss', values);
                        return <Plot
                            data={[
                                {
                                    x: x,
                                    y: y,
                                    yaxis: metric_name,
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: {color: 'blue'},
                                },
                            ]}
                            layout={{
                                title: metric_name,
                                xaxis: {title: 'Dataset size'},
                                yaxis: {title: 'Metric value', range: [0, 1]}
                            }}
                        />
                    })
                    }
                </Grid>

                <Grid item container
                    justify='center'>
                    <Plot
                        data={[
                            {
                                x: labels,
                                y: frequencies,
                                type: 'bar',
                            },
                        ]}
                        layout={{
                            title: 'Labels',
                            xaxis: {type: 'category', title: 'Classes'},
                            yaxis: {title: 'Frequency'}
                        }}
                    />
                </Grid>
            </MyPaper>
        </Grid>
        </Grid>
    );
}

export default Metrics;
import React, {useEffect} from 'react';
import Plot from 'react-plotly.js';
import {Grid} from "@material-ui/core";
import Stats from "../../model/metric";

type Props = {
    fetchStats : () => void,
    stats: Stats
}


const Progress = (props: Props) => {
    useEffect(() => {
        props.fetchStats();
    }, []);

    const labels = Object.keys(props.stats.label_frequencies);
    const frequencies = Object.values(props.stats.label_frequencies);
    return (
        <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
            style={{overflow: 'auto'}}
        >
            <Grid item style={{marginBottom: 30}}>
            {props.stats.metrics.map((metric: any) => {
                return <Plot
                    data={[
                        {
                            x: metric['num_samples'],
                            y: metric['metric_value'],
                            yaxis: metric['metric_name'],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'blue'},
                        },
                    ]}
                    layout={{
                        title: metric['metric_name'],
                        xaxis: {title: 'Sample size'},
                        yaxis: {title: 'Metric value'}
                    }}
                />}
            )}
            </Grid>
            <Grid>
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
        </Grid>
    );
}

export default Progress;
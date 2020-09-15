import React, {useEffect} from 'react';
import Plot from 'react-plotly.js';
import Metric from "../../model/metric";

type Props = {
    fetchMetrics: () => void,
    metrics: Array<Metric>
}


const Progress = (props: Props) => {
    useEffect(() => {
        props.fetchMetrics();
    }, []);

    return (
        <div>
            {props.metrics.map(metric => {
                return <Plot
                    data={[
                        {
                            x: metric.num_samples,
                            y: metric.values,
                            yaxis: metric.name,
                            xaxis: 'Sample size',
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'blue'},
                        },
                    ]}
                    layout={{width: 320, height: 240, title: metric.name}}
                />}
            )}
        </div>
    );
}

export default Progress;
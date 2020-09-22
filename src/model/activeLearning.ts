import convertSample from "../utils/sampleDecoding";
import Sample from "./sample";
import Config from "./config";
import Metric from "./metric";
import Stats from "./metric";

export default class ActiveLearning {
    private QUERY = 'query';
    private CONFIG = 'config';
    private ANNOTATE = 'annotate';
    private TEACH = 'teach';
    private METRICS = 'metrics';

    fetchSamples = async (url: string, batchSize: number): Promise<Array<Sample>> => {
        const response = await fetch(url + this.QUERY + `?batch_size=${batchSize}`);
        const responseJson = await response.json();
        return responseJson.samples.map(convertSample);
    }

    fetchConfig = async (url: string): Promise<Config> => {
        const response = await fetch(url + this.CONFIG);
        const config = await response.json();
        config.multiclass = config.multiclass === 'true';
        return config
    }

    fetchStats = async (url: string): Promise<Stats> => {
        const response = await fetch(url + this.METRICS);
        const response_json = await response.json();
        console.log('stats', response_json);
        const stats = response_json as Stats;
        return stats;
    }

    onSaveOptions = async (url:string, config: Config): Promise<number> => {
        const configJson = JSON.stringify(config);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: configJson
        };
        const response = await fetch(url + this.CONFIG, requestOptions);
        return response.status;
    }

    teach = async (url: string, samples: Array<Sample>): Promise<number> => {
        const samplesJson = JSON.stringify({'samples': samples.map(s => s.toDict())});
        console.log(samplesJson);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: samplesJson
        };
        fetch(url + this.ANNOTATE, requestOptions)
            .then(result => {
                if (result.ok) {
                    return fetch(url + this.TEACH).then(r => r.status);
                } else {
                    throw new Error('Something went wrong')
                }
            })
        return 200
    }
}
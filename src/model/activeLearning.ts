import convertSample from "../utils/sampleDecoding";
import Sample from "./sample";
import Config from "./config";
import Stats from "./metric";

export default class ActiveLearning {
    private QUERY = 'query';
    private CONFIG = 'config';
    private ANNOTATE = 'annotate';
    private ANNOTATIONS = 'annotations';
    private TEACH = 'teach';
    private METRICS = 'metrics';

    fetchSamples = async (url: string, batchSize: number, poolSize: number = 1.): Promise<Array<Sample>> => {
        const response = await fetch(url
            + this.QUERY
            + `?batch_size=${batchSize}`
            + `&pool_size=${poolSize}`
        );
        const responseJson = await response.json();
        return responseJson.samples.map(convertSample);
    }

    fetchAnnotations = async (url: string): Promise<any> => {
        const response = await fetch(url + this.ANNOTATIONS);
        const responseJson = await response.json();
        return responseJson;
    }

    fetchConfig = async (url: string): Promise<Config> => {
        const response = await fetch(url + this.CONFIG);
        const config = await response.json();
        return {
            server_url: url,
            allowed_labels: config.labels,
            batch_size: config.batch_size,
            dataset_name: config.dataset_name,
            multiclass: config.multiclass == 'true',
            pool_size: config.pool_size
        }
    }

    saveConfig = async (url:string, config: Config): Promise<number> => {
        const configJson = JSON.stringify(config);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: configJson
        };
        const response = await fetch(url + this.CONFIG, requestOptions);
        return response.status;
    }

    fetchStats = async (url: string): Promise<Stats> => {
        const response = await fetch(url + this.METRICS);
        const response_json = await response.json();
        const stats = response_json as Stats;
        return stats;
    }

    teach = async (url: string, samples: Array<Sample>): Promise<Response> => {
        return this.annotate(url, samples);
    }

    annotate = async (url: string, samples: Array<Sample>): Promise<Response> => {
        const samplesJson = JSON.stringify({
            'samples':
                samples.map(s => {
                    return {path: s.path, label: s.label}
                })
        })
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: samplesJson
        };
        return fetch(url + this.ANNOTATE, requestOptions);
    }
}
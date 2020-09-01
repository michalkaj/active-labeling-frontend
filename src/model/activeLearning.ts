import convertSample from "../utils/sampleDecoding";
import Sample from "./sample";
import Config from "./config";

export default class ActiveLearning {
    private url: string;
    private QUERY = 'query';
    private CONFIG = 'config';
    private TEACH = 'annotate';

    constructor(url: string) {
        this.url = url;
    }

    fetchSamples = async (): Promise<Array<Sample>> => {
        const response = await fetch(this.url + this.QUERY);
        const responseJson = await response.json();
        return responseJson.samples.map(convertSample);
    }


    fetchConfig = async (): Promise<Config> => {
        const response = await fetch(this.url + this.CONFIG);
        const {labels, multiclass} = await response.json();
        return new Config(labels, multiclass);
    }

    onSaveOptions = async (config: Config): Promise<number> => {
        const configJson = JSON.stringify(config);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: configJson
        };
        const response = await fetch(this.url + this.CONFIG, requestOptions);
        return response.status;
    }

    teach = async (samples: Array<Sample>): Promise<number> => {
        const samplesJson = JSON.stringify({'samples': samples});
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: samplesJson
        };
        const response = await fetch(this.url + this.TEACH, requestOptions);
        return response.status;
    }
}
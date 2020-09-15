export default class Metric {
    name: string;
    values: Array<number>;
    num_samples : Array<number>;

    constructor(name: string, values: Array<number>, num_samples: Array<number>) {
        this.name = name;
        this.values = values;
        this.num_samples = num_samples;
    }
}

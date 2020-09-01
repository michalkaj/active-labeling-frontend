export default class Sample {
    src: string;
    labels: Array<string>;
    name: string;
    index: number;

    constructor(src: string, labels: Array<string>, index: number) {
        this.src = src;
        this.labels = labels;
        this.name = src;
        this.index = index;
    }
}
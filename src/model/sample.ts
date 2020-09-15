export default class Sample {
    path: string;
    src: string;
    labels: Array<string>;
    name: string;

    constructor(path: string, src: string, labels: Array<string>) {
        this.path = path;
        this.src = src;
        this.labels = labels;
        this.name = path;
    }

    toDict = () => {
        return {'path': this.path, 'labels': this.labels};
    }
}

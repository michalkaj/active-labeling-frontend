
export default class Sample {
    path: string;
    src: string;
    label: string | null;
    name: string;

    constructor(path: string, src: string, label?: string) {
        this.path = path;
        this.src = src;
        this.label = label ?? null;
        this.name = path;
    }

    toDict = () => {
        return {'path': this.path, 'label': this.label};
    }
}

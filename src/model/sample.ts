
export default class Sample {
    path: string;
    name: string;
    src: string;
    label: string | null;

    constructor(path: string, name: string, src: string, label?: string) {
        this.path = path;
        this.name = name;
        this.src = src;
        this.label = label ?? null;
    }
}

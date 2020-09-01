export default class Config {
    allowed_labels: Array<string> = [];
    multiclass: boolean = false;
    activeUrl: string = 'http://localhost:5000/';

    constructor(allowed_labels?: Array<string>, multiclass?: boolean, activeUrl?: string) {
        if (allowed_labels !== undefined)
            this.allowed_labels = allowed_labels;
        if (multiclass !== undefined)
            this.multiclass = multiclass;
        if (activeUrl !== undefined)
            this.activeUrl = activeUrl
    }
}
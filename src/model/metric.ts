interface Metric {
    name: string,
    values: Array<number>,
    num_samples : Array<number>,
    [key: string]: any
}

export default interface Stats {
    metrics: Array<Metric>,
    label_frequencies: Array<[string, number]>,
    [key: string]: any
}

export default interface Config {
    dataset_name: string,
    allowed_labels: Array<string>,
    multiclass: boolean,
    active_url: string,
    batch_size: number,
    [key: string]: any
}
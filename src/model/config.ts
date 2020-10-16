export default interface Config {
    dataset_name: string,
    allowed_labels: Array<string>,
    server_url: string,
    multiclass: boolean,
    batch_size: number,
    pool_size: number,
    [key: string]: any
}
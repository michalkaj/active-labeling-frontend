export default interface Config {
    dataset_name: string,
    allowed_labels: Array<string>,
    server_url: string,
    batch_size: number,
    pool_size: number,
    training_set_size: number,
    [key: string]: any
}

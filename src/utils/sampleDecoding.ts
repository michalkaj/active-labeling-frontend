import Sample from "../model/sample";

export default function (sample: any): Sample {
    return new Sample(
        sample.path,
        'data:image.png;base64,' + sample.base64_file,
        (sample.labels !== undefined) ? sample.labels : null,
    )
}

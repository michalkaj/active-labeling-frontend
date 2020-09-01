import Sample from "../model/sample";

export default function (sample: any): Sample {
    return new Sample(
        'data:image.png;base64,' + sample.base64_file,
        sample.labels,
        sample.index
    )
}

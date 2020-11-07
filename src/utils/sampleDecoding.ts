import Sample from "./sample";

export default function (sample: any): Sample {
    return new Sample(
        sample.path,
        sample.name,
        'data:image.png;base64,' + sample.base64_file,
        (sample.label !== undefined) ? sample.label : null,
    )
}

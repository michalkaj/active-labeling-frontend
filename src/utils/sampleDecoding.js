export default function (sample) {
  return {
    src: 'data:image.png;base64,' + sample.base64_file,
    name: sample.name,
    index: sample.index,
    type: sample.type,
    labels: sample.labels
  }
}
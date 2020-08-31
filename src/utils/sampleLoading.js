const convertToSamplesObject = (fp, path) => {
  const sample = {
     src: `file:///${fp}`,
     name: path.basename(fp),
     labels: []
  };
  const ext = fp.split(".").slice(-1)[0].toLowerCase()

  if (["png", "jpg", "jpeg"].includes(ext)) {
    sample['type'] = 'image';
  } else if (["pdf"].includes(ext)) {
    sample['type'] = 'pdf';
  } else if (["mp4", "webm", "mkv"].includes(ext)) {
    sample['type'] = 'video';
  }
  return sample;
}

async function promptSamples({ electron }) {
  const {
    canceled,
    filePaths: dirPaths,
  } = await electron.remote.dialog.showOpenDialog({
    title: "Select Directory to Import Files",
    properties: ["openDirectory"],
  })
  if (canceled) return
  const dirPath = dirPaths[0]
  const fs = electron.remote.require("fs")
  const path = electron.remote.require("path")

  return (await fs.promises.readdir(dirPath))
    .filter((fn) => fn.includes("."))
    .map((fileName) => path.join(dirPath, fileName))
    .map((fp) => convertToSamplesObject(fp, path))
    .filter(Boolean)
    .filter(o => { return o.type === 'image' })
}

export default promptSamples;
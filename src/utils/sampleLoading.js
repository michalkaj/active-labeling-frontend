const convertToSamplesObject = (fp, path) => {
  const sample = {
     src: `file:///${fp}`,
     name: path.basename(fp)
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

// function get_files(filepath, extensions = null, recursive = false, acc_path = '') {
//     if (acc_path === '') 
//         acc_path = filepath;
//     else
//         acc_path = path.join(acc_path, filepath);

//     var result = [];
//     electronFs.readdirSync(acc_path).forEach(file => {
//         var stat = electronFs.statSync(path.join(acc_path, file));

//         if (recursive && stat.isDirectory()) {
//             result = result.concat(get_files(file, extensions, recursive, acc_path))
//         } else if (extensions !== null && extensions.has(path.extname(file))) {
//             result.push(path.join(acc_path, file));
//         }
//     });

//     return result.map(convertToSamplesObject);
// }

// export default get_files

export default promptSamples;
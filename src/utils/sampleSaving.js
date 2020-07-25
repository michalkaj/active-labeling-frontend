export default async function saveSamples(samples, electron) {
  const {
    canceled,
    filePath
  } = await electron.remote.dialog.showSaveDialog()
  if (canceled) return;

  const fs = electron.remote.require('fs');
  fs.writeFile(filePath, samples, (err) => {
    if (err)
      console.log('ERROR SAVING FILE');
  })
}
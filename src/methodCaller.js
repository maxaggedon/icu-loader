const exec = require('child_process').exec

module.exports = (script) => {
  // Run node command with script
  return new Promise((resolve, reject) => {
    exec(`node --icu-data-dir=./node_modules/full-icu -p '${script}'`, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      }

      // resolve the trimed output of excuted script
      resolve(stdout.trim())
    })
  })
}

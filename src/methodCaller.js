'use strict'

/**
 * Require modules
 */
const exec = require('child_process').exec

module.exports = (script) => {
  return new Promise((resolve, reject) => {
    // Run node command with icu data
    exec(`node --icu-data-dir=${__dirname}/node_modules/full-icu -p '${script}'`, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      }

      // resolve the trimed output of excuted script
      resolve(stdout.trim())
    })
  })
}

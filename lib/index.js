'use strict';

export const Potrace = require('./Potrace');
export const Posterizer = require('./Posterizer');
export const Jimp = require('jimp');
export async function as_paths (file, options = {}) {
  return new Promise((resolve, reject) => {
    const posterizer = new Posterizer(options)
    posterizer.loadImage(file, error => {
      if (error) reject(error)
      const width = posterizer._potrace._luminanceData.width
      const height = posterizer._potrace._luminanceData.height
      resolve({ width, height, paths: posterizer._pathTags(false) })
    })
  })
}

export async function as_path (file, options) {
  return new Promise((resolve, reject) => {
    const potrace = new Potrace(options)
    potrace.loadImage(file, error => {
      if (error) reject(error)
      resolve(potrace.getPathTag())
    })
  })
}

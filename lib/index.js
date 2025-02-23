'use strict';

export const Potrace = require('./Potrace');
export const Posterizer = require('./Posterizer');
export const Jimp = require('jimp');
export async function as_paths (file, options = {}) {
  return new Promise((resolve, reject) => {
    var posterizer = new Posterizer(options)
    posterizer.loadImage(file, error => {
      if (error) reject(error)
      const width = posterizer._potrace._luminanceData.width
      const height = posterizer._potrace._luminanceData.height
      resolve({ width, height, paths: posterizer._pathTags(false) })
    })
  })
}

/**
 * Wrapper for Potrace that simplifies use down to one function call
 *
 * @param {string|Buffer|Jimp} file Source image, file path or {@link Jimp} instance
 * @param {Potrace~Options} [options]
 * @param {traceCallback} cb Callback function. Accepts 3 arguments: error, svg content and instance of {@link Potrace} (so it could be reused with different set of parameters)
 */
export function trace(file, options, cb) {
  if (arguments.length === 2) {
    cb = options;
    options = {};
  }

  var potrace = new Potrace(options);

  potrace.loadImage(file, function(err) {
    if (err) { return cb(err); }
    cb(null, potrace.getSVG(), potrace);
  });
}

/**
 * Wrapper for Potrace that simplifies use down to one function call
 *
 * @param {string|Buffer|Jimp} file Source image, file path or {@link Jimp} instance
 * @param {Posterizer~Options} [options]
 * @param {posterizeCallback} cb Callback function. Accepts 3 arguments: error, svg content and instance of {@link Potrace} (so it could be reused with different set of parameters)
 */
export function posterize(file, options, cb) {
  if (arguments.length === 2) {
    cb = options;
    options = {};
  }

  var posterizer = new Posterizer(options);

  posterizer.loadImage(file, function(err) {
    if (err) { return cb(err); }
    cb(null, posterizer.getSVG(), posterizer);
  });
}

/**
 * Callback for trace method
 * @callback traceCallback
 * @param {Error|null} err
 * @param {string} svg SVG document contents
 * @param {Potrace} [instance] Potrace class instance
 */

/**
 * Callback for posterize method
 * @callback posterizeCallback
 * @param {Error|null} err
 * @param {string} svg SVG document contents
 * @param {Posterizer} [instance] Posterizer class instance
 */

'use strict';
require('./types/Point');
const Potrace = require('./Potrace');
const Posterizer = require('./Posterizer');

async function as_paths (file, options = {}) {
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

function trace(file, options, cb) {
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

function posterize(file, options, cb) {
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

module.exports = {
  as_paths: as_paths,
  trace: trace,
  posterize: posterize
}

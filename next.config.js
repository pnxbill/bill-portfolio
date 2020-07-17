

const path = require('path');

// Configuration for easy imports with @ meaning root folder
module.exports = {
  webpack: (config) => {

    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  }
}
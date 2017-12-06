const packager = require('electron-packager');
const config = require('./package.json');

packager({
  dir: './',
  out: './app',
  name: config.name,
  platform: 'darwin',
  arch: 'x64',
  version: '1.7.9',
  icon: './images/Messages.icns',
  'app-bundle-id': 'jp.phi.electron-app',
  'app-version': config.version,
  overwrite: true,
  asar: true,
  prune: true,
  },
  function done (err, appPath) {
    if(err) {
      throw new Error(err);
    }
    console.log('Done!!');
});

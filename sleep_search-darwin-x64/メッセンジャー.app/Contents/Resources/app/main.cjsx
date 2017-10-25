path = require('path');
node_module_path = path.resolve(path.join(__dirname, 'node_modules'));

global.module.paths.unshift(node_module_path)

import WebpackDevMiddleware from 'webpack-dev-middleware';
import config               from '../../config';

const paths = config.utils_paths;
const debug = require('debug')('kit:server:webpack-dev');

export default function ({ compiler, publicPath }) {
  debug('Enable Webpack dev middleware.');

  return WebpackDevMiddleware(compiler, {
    publicPath,
    contentBase : paths.base(config.dir_client),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
<<<<<<< HEAD
=======
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
>>>>>>> 385b1f14edfc8e1684dbfe59d96f0a7cbd44565b
    lazy        : false,
    stats       : {
      colors : true
    }
  });
}

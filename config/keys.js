// figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // in production - return production keys
  module.exports = require('./prod');
} else {
  // in development - return development keys
  module.exports = require('./dev');
}

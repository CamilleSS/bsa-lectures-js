const user = require('./user');
const message = require('./message');

module.exports = app => {
  app.use('/api/user', user);
  app.use('/api/message', message);
};
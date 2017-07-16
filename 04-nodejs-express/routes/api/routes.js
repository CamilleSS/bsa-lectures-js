const user = require('./user');
const message = require('./message');
const userHistory = require('./user-history');

module.exports = app => {
  app.use('/api/user', user);
  app.use('/api/message', message);
  app.use('/api/user-history', userHistory);
};
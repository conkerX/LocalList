const models = require('../models');

const JsonHeaders = { 'Content-Type': 'application/json' };

module.exports = {
  post: (req, res) => {
    if (req.body.password.length < 6) {
      res.writeHead(400);
      res.end('password too short');
    } else {
      models.user.create(req.body)
        .then((user) => {
          req.login(user, () => {
            res.writeHead(201, JsonHeaders);
            res.end(JSON.stringify({
              id: user.id,
              username: user.username,
            }));
          });
        })
        .catch((err) => {
          if (err.name === 'SequelizeUniqueConstraintError') {
            res.writeHead(400);
            res.end('user already exists');
          } else {
            throw err;
          }
        });
    }
  },
};

const router = require('express').Router();
const userHistoryService = require('../../services/user-history');

router.get('/:id', (req, res, next) => {
  userHistoryService.findOtherUsers(Number(req.params.id), (error, data) => {
    if (!error) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

module.exports = router;
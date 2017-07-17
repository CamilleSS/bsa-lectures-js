const router = require('express').Router();
const userService = require('../../services/user');

router.get('/', (req, res, next) => {
  userService.findAll((error, data) => {
    if (!error) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

router.get('/:id', (req, res, next) => {
  userService.findOne(Number(req.params.id), (error, data) => {
    if (!error) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

router.post('/', (req, res, next) => {
  const newUser = req.body;
  userService.add(newUser, (error, data) => {
    res.end();
  });
});

router.delete('/:id', (req, res, next) => {
  userService.findAndDelete(Number(req.params.id), (error, data) => {
    if (!error){
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

router.put('/:id', (req, res, next) => {
  const newUserData = req.body;
  console.log(newUserData);
  userService.findAndUpdate(Number(req.params.id), newUserData, (error, data) => {
    if (!error){
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

module.exports = router;
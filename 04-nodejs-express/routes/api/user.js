const router = require('express').Router();
const userService = require('../../services/user');

router.get('/', (req, res, next) => {
  userService.findAll((error, data) => {
    if (!error) {
      res.data = data;
      res.json(res.data);
    } else {
      console.log(error);
      res.status(400);
      res.end();
    }
  });
});

router.get('/:id', (req, res, next) => {
  userService.findOne(req.params.id, (error, data) => {
    if (!error) {
      res.data = data;
      res.json(res.data);
    } else {
      console.log(error);
      res.status(400);
      res.end();
    }
  });
});

router.post('/', (req, res, next) => {
  const newUser = req.body;
  userService.add(newUser, (error, data) => {
    if (!error){
      res.json(res.data);
    } else {
      console.log(error);
      res.status(400);
      res.end();
    }
  });
});

router.delete('/:id', (req, res, next) => {
  userService.findAndDelete(req.params.id, (error, data) => {
    if (!error){
      res.json(res.data);
    } else {
      console.log(error);
      res.status(400);
      res.end();
    }
  });
});

router.put('/:id', (req, res, next) => {
  const newUserData = req.body;
  userService.findAndUpdate(req.params.id, newUserData, (error, data) => {
    if (!error){
      res.json(res.data);
    } else {
      console.log(error);
      res.status(400);
      res.end();
    }
  });
});

router.get('/:id/history', (req, res, next) => {
  userService.findOtherUsers(req.params.id, (error, data) => {
    if (!error) {
      res.data = data;
      res.json(res.data);
    } else {
      console.log(error);
      res.status(400);
      res.end();
    }
  });
});

module.exports = router;
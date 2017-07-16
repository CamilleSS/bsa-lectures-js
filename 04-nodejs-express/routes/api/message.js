const router = require('express').Router();
const messageService = require('../../services/message');

router.get('/', (req, res, next) => {
  messageService.findAll((error, data) => {
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
  messageService.findOne(Number(req.params.id), (error, data) => {
    if (!error) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
    }
  });
});

router.post('/', (req, res, next) => {
  const obj = req.body;
  messageService.add(obj, (error, data) => {
    res.end();
  });
});

router.delete('/:id', (req, res, next) => {
  messageService.findAndDelete(Number(req.params.id), (error, data) => {
    if (!err){
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

router.put('/:id', (req, res, next) => {
  const obj = req.body;
  messageService.findAndUpdate(Number(req.params.id), obj, (error, data) => {
    if (!err){
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

module.exports = router;
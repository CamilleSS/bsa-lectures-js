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
  messageService.findOne(req.params.id, (error, data) => {
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
  const newMessage = req.body;
  messageService.add(newMessage, (error, data) => {
    res.end();
  });
});

router.delete('/:id', (req, res, next) => {
  messageService.findAndDelete(req.params.id, (error, data) => {
    if (!error){
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

router.put('/:id', (req, res, next) => {
  const newMessageData = req.body;
  messageService.findAndUpdate(req.params.id, newMessageData, (error, data) => {
    if (!error){
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

module.exports = router;
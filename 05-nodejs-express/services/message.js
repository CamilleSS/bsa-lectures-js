const db = require('../db');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  findAll: callback => {
    db.get().collection('message').find().toArray((error, docs) => {
      if (error) {
        callback(error);
      }
      callback(null, docs);
    });
  },

  findOne: (id, callback) => {
    db.get().collection('message').findOne(
      {_id: ObjectId(id)},
      (error, doc) => {
        if (error) {
          callback(error);
        }
        callback(null, doc);
      });
  },

  add: (doc, callback) => {
    if (doc.hasOwnProperty('senderId') && doc.hasOwnProperty('receiverId')) {
      db.get().collection('message').insertOne(
        {senderId: doc.senderId,
        receiverId: doc.receiverId,
        messageText: doc.messageText},
        (error, result) => {
          if (error) {
            callback(error);
          }
          callback(null);
        });
    } else {
      callback(new Error('Some fields weren\'t specified'));
    }
  },

  findAndDelete: (id, callback) => {
    db.get().collection('message').deleteOne(
      {_id: ObjectId(id)},
      (error, result) => {
        if (error) {
          callback(error);
        }
        callback(null);
      });
  },

  findAndUpdate: (id, data, callback) => {
    if (data.hasOwnProperty('senderId') && data.hasOwnProperty('receiverId')) {
      db.get().collection('message').updateOne(
        {_id: ObjectId(id)},
        {senderId: data.senderId,
          receiverId: data.receiverId,
          messageText: data.messageText},
        (error, result) => {
          if (error) {
            callback(error);
          }
          callback(null);
        });
    } else {
      callback(new Error('Some fields weren\'t specified'));
    }
  }
};
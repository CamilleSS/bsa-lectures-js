const db = require('../db');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  findAll: callback => {
    db.get().collection('user').find().toArray((error, docs) => {
      if (error) {
        callback(error);
      }
      callback(null, docs);
    });
  },

  findOne: (id, callback) => {
    db.get().collection('user').findOne(
      {_id: ObjectId(id)},
      (error, doc) => {
        if (error) {
          callback(error);
        }
        callback(null, doc);
      });
  },

  add: (doc, callback) => {
    db.get().collection('user').insertOne(doc, (error, result) => {
      if (error) {
        callback(error);
      }
      callback(null);
    });
  },

  findAndDelete: (id, callback) => {
    db.get().collection('user').deleteOne(
      {_id: ObjectId(id)},
      (error, result) => {
        if (error) {
          callback(error);
        }
        callback(null);
      });
  },

  findAndUpdate: (id, data, callback) => {
    db.get().collection('user').updateOne(
      {_id: ObjectId(id)},
      {name: data.name},
      {email: data.email},
      (error, result) => {
        if (error) {
          callback(error);
        }
        callback(null);
      });
  },

  findOtherUsers: (id, callback) => {
    db.get().collection('message').find(
      {$or: [{senderId: id}, {receiverId: id}]}
    ).toArray((error, docs) => {
      if (error) {
        callback(error);
      }

      let foundMessages = docs;
      let otherUserIds = [];

      foundMessages.forEach(message => {
        if (message.senderId === id) {
          otherUserId = ObjectId(message.receiverId);
        } else if (message.receiverId === id) {
          otherUserId = ObjectId(message.senderId);
        }
        otherUserIds.push(otherUserId);
      });

      db.get().collection('user').find(
        {_id: {$in: otherUserIds}}
      ).toArray((error, docs) => {
        if (error) {
          callback(error);
        }
        callback(null, docs);
      });
    });
  },

  findMessages: (id, callback) => {
    db.get().collection('message').find(
      {senderId: id}
    ).toArray((error, docs) => {
      if (error) {
        callback(error);
      }
      callback(null, docs);
    });
  }
};
## Usage

1. npm install
2. mongod
3. mongo
4. node ./
5. go to localhost:5000 in browser

## Routes

### Users

```javascript
// data sample
{
  "id": 15,
  "name": "Kenny",
  "email": "kenny@gmail.com"
}
```

* **GET /api/user** - read the list of all users
* **GET /api/user/id** - read the data of a specific user
* **POST /api/user** - create new user
* **PUT /api/user/id** - update the data of a specific user
* **DELETE /api/user/id** - delete a specific user

### Messages

```javascript
// data sample
{
  "id": 50,
  "senderId": 5,
  "receiverId": 10,
  "messageText": "abyrvalg"
}
```

* **GET /api/message** - read the list of all messages
* **GET /api/message/id** - read the data of a specific message
* **POST /api/message** - create new message
* **PUT /api/message/id** - update the data of a specific message
* **DELETE /api/message/id** - delete a specific message

### User History
* **GET /api/user-history/id** - read the list of all users with whom a specific user has been messaging
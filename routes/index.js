var express = require('express');
var router = express.Router();
const envConfig = require('dotenv').config()

const MessageModel = require("../models/message");

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// console.log('process.env.MDB_CONNECTION_STRING', process.env.MDB_CONNECTION_STRING);
const mongoDB = process.env.MDB_CONNECTION_STRING;

// main().catch((err) => console.log(err));
// async function main() {
//   console.log("Debug: About to connect");
//   await mongoose.connect(mongoDB);
//   console.log("Debug: Should be connected?");
//   await createGenres();
//   await createAuthors();
//   await createBooks();
//   await createBookInstances();
//   console.log("Debug: Closing mongoose");
//   mongoose.connection.close();
// }

async function messageCreate(user, message) {
  const messagedetail = {
    user,
    message,
    date_posted: new Date(),
  };

  console.log('Debug: message detail', messagedetail)
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  const messageData = new MessageModel(messagedetail);
  await messageData.save();
  console.log(`Debug: Added message by: ${user}`);
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function getMessages() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  messages = await MessageModel.find({}).sort({ date_posted: -1 });
  console.log(`Debug: Finding Messages: ${messages}`);
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();  
  return messages;
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  let messages = await getMessages().catch((err) => console.log(err));
  console.log('messages after getting them for index: ', messages);
  res.render('index', { title: 'Express', messages });
});

router.get('/new', function(req, res, next) {
  res.render('form', { title: 'New Message' });
});

router.post('/new', async function(req, res, next) {
  // res.render('form', { title: 'New Message' });
  // console.log('req', req);
  console.log('req', req.body);
  await messageCreate(req.body.user, req.body.message).catch((err) => console.log(err));
  console.log('messages after saving new one: ', messages)
  res.redirect('/')
});

module.exports = router;
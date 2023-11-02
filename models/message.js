const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: { type: String, required: true, maxLength: 1000 },
  user: { type: String, required: true, maxLength: 100 },
  date_posted: { type: Date },
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);
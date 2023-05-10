const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "A notification must have a title"],
    unique: true,
  },
  content: String,
});

module.exports = mongoose.model("Notification", notificationSchema);

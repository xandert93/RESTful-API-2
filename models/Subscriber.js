const { Schema, model } = require('mongoose');

const subscriberSchema = new Schema({
  name: {
    type: String,
    required: 1,
  },
  subscribedToChannel: {
    type: String,
    required: 1,
  },
  subscribedDate: {
    type: Date,
    required: 1,
    default: Date.now,
  },
});

module.exports = model('Subscriber', subscriberSchema);

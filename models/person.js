const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    contact: {
      type: String,
    },
  },
  { collection: 'Person' },
);

module.exports = mongoose.model('Person', personSchema);

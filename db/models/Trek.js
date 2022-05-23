const mongoose = require('mongoose');

const TrekSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  image: String,
  startsAt: String,
  participants: [
    {
      name: String,
      email: String,
    },
  ],
});

const Trek = mongoose.model('Trek', TrekSchema);

module.exports = Trek;

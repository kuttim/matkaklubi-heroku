const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  image: String,
  updatedAt: String,
  content: [
    {
      title: String,
      text: String,
    },
  ],
  tags: [
    {
      name: String,
    },
  ],
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;

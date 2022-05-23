const express = require('express');
const moment = require('moment');
const path = require('path');
const { MongoClient } = require('mongodb');
const Trek = require('./db/models/Trek');
const News = require('./db/models/News');
const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');
require('dotenv').config();

moment.locale('et');
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

MongoClient.connect(process.env.MONGODB_URL, (err, client) => {
  if (err) {
    console.log(err);
  } else {
    console.log(
      'Successfully established a connection with the database.'
    );
  }
});

const app = express();

app.use(express.json({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Matkaklubi',
  });
});

app.get('/contact', (req, res) => {
  res.render('pages/contact', {
    title: 'Kontakt',
  });
});

app.get('/treks', async (req, res) => {
  const trekList = await Trek.find();
  res.render('pages/treks', {
    title: 'Treks',
    treks: trekList,
  });
});

app.post('/register', (req, res) => {
  const { email, name, trek: id } = req.body;

  const trek = treks.find((trek) => trek.id === parseInt(id));

  trek.participants.push({
    email,
    name,
  });
  res.end();
});

app.get('/trek/:id', async (req, res) => {
  const id = req.params.id;
  const trek = await Trek.findOne({ id });
  if (trek) {
    res.render('pages/trek', {
      title: 'Trek',
      trek,
    });
  } else {
    res.render('pages/error', {
      title: 'Viga',
      message: 'Trekki ei eksisteeri',
    });
  }
});

app.get('/news', async (req, res) => {
  const newsList = await News.find({});
  console.log({ newsList });
  res.render('pages/news', {
    title: 'Uudised',
    newsList,
  });
});

app.get('/news/:id', (req, res) => {
  const singleNews = news.find(
    (news) => news.id === Number(req.params.id)
  );
  if (singleNews) {
    res.render('pages/single-news', {
      title: singleNews.title,
      singleNews,
      newsList,
    });
  } else {
    res.render('pages/error', {
      title: 'Viga',
      message: 'Uudist ei eksisteeri',
    });
  }
});

app.put('/news/update/:id', async (req, res) => {
  const news = await News.findOne({ id: req.params.id });

  if (news) {
    (news.title = req.body.title),
      (news.description = req.body.description),
      news.save();
  }
  res.json({ news });
});

app.post('/news/create', async (req, res) => {
  const { title, description } = req.body;
  const createNews = new News({
    title,
    description,
    image: req.body.image || `https://picsum.photos/id/214/143`,
    updatedAt:
      req.body.updatedAt || moment().subtract(2, 'days').fromNow(),
  });
  await createNews.save();
  console.log(createNews);
});

app.delete('/news/delete/:id/', async (req, res) => {
  console.log(req.params);
  const news = await News.findById(req.params.id);
  var isDeleted = false;
  if (news) {
    await news.remove();
    isDeleted = true;
  }

  res.json({ isDeleted });
});

app.put('/trek/update/:id', async (req, res) => {
  const trek = await Trek.findById(req.params.id);
  if (trek) {
    trek.title = req.body.title;
    trek.description = req.body.description;
    trek.save();
  }
  console.log(`Trek updated: ${trek.title}`);
  res.json({ trek });
});

app.delete('/trek/delete/:id', async (req, res) => {
  const trek = await Trek.findById(req.params.id);
  var isDeleted = false;
  if (trek) {
    await trek.remove();
    isDeleted = true;
  }

  res.json({ isDeleted });
});
app.post('/trek/create', async (req, res) => {
  const trek = new Trek({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image || `https://picsum.photos/id/214/143`,

    startsAt: req.body.date || moment().endOf('day').fromNow(),
    participants: [],
  });
  await trek.save();
  res.json({ trek });
});

app.get('/admin', async (req, res) => {
  const trekList = await Trek.find({});
  const newsList = await News.find({});
  res.render('pages/admin', {
    title: 'Admin',
    treks: trekList,
    news: newsList,
  });
});
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);

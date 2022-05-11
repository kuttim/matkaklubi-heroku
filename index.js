const express = require('express');
const moment = require('moment');
const path = require('path');
const PORT = process.env.PORT || 5000;

moment.locale('et');

const treks = [
  {
    id: 1,
    title: 'Kepikõnd',
    description:
      'Duis et lectus sit amet diam imperdiet placerat. Curabitur ac tempus massa. ',
    image: 'https://p.ocdn.ee/53/i/2016/7/8/nadky13h.c2a.jpg',
    url: 'https://www.liigume.ee/747181/kepikond-ja-kaimine',
    startsAt: moment().endOf('day').fromNow(),
    participants: [],
  },
  {
    id: 2,
    title: 'Kiirkõnd',
    description:
      'Duis et lectus sit amet diam imperdiet placerat. Curabitur ac tempus massa.',
    image:
      'https://strongguru.org/wp-content/uploads/2019/07/speedwalking-benefits.jpg',
    url: 'https://et.strongguru.org/exercises-et/eelised-kiirkond.html',
    startsAt: moment().endOf('day').fromNow(),
    participants: [],
  },
  {
    id: 3,
    title: 'Mägironimine',
    description:
      'Duis et lectus sit amet diam imperdiet placerat. Curabitur ac tempus massa.',
    image:
      'https://i0.wp.com/www.adrenaliin.ee/wp-content/uploads/2016/08/32678984_10214834359787845_1891638910103060480_n.jpg?fit=1024%2C681&ssl=1',
    url: 'https://et.strongguru.org/exercises-et/eelised-magironimine.html',
    startsAt: moment().endOf('day').fromNow(),
    participants: [],
  },
];

const app = express();

app.use(express.urlencoded({ extended: true }));

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

app.get('/treks', (req, res) => {
  res.render('pages/treks', {
    title: 'Treks',
    treks,
  });
});

app.post('/register', (req, res) => {
  const { email, name, trek: id } = req.body;

  const trek = treks.find((trek) => trek.id === parseInt(id));

  trek.participants.push({
    email,
    name,
  });
  res.render('pages/success', {
    title: 'Registreerumine õnnestus',
    message: 'Teie registreerimine õnnestus!',
  });
});

app.get('/trek/:id', (req, res) => {
  const id = req.params.id;
  const trek = treks.find((trek) => trek.id === Number(id));
  if (trek) {
    console.log(trek);
    res.render('pages/trek', {
      title: 'Treks',
      trek,
      treks,
    });
  } else {
    res.render('pages/error', {
      title: 'Viga',
      message: 'Trekki ei eksisteeri',
    });
  }
});
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);

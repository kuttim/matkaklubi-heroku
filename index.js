const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const treks = [
  {
    title: 'Kepikõnd',
    description:
      'Duis et lectus sit amet diam imperdiet placerat. Curabitur ac tempus massa. ',
    image: 'https://p.ocdn.ee/53/i/2016/7/8/nadky13h.c2a.jpg',
    location: 'Tartu',
    url: 'https://www.liigume.ee/747181/kepikond-ja-kaimine',
    startsAt: '2020-01-01',
    endsAt: '2020-01-01',
  },
  {
    title: 'Kiirkõnd',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    image:
      'https://strongguru.org/wp-content/uploads/2019/07/speedwalking-benefits.jpg',
    location: 'Tallinn',
    url: 'https://et.strongguru.org/exercises-et/eelised-kiirkond.html',
    startsAt: '2020-01-01',
    endsAt: '2020-01-02',
  },
  {
    title: 'Mägironimine',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    image:
      'https://i0.wp.com/www.adrenaliin.ee/wp-content/uploads/2016/08/32678984_10214834359787845_1891638910103060480_n.jpg?fit=1024%2C681&ssl=1',
    location: 'Tallinn',
    url: 'https://et.strongguru.org/exercises-et/eelised-magironimine.html',
    startsAt: '2020-01-01',
    endsAt: '2020-01-02',
  },
];

const app = express();

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

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);

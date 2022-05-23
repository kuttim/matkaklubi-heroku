const mongoose = require('mongoose');
const Trek = require('./models/Trek');
const News = require('./models/News');
const moment = require('moment');
const dotenv = require('dotenv');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

moment.locale('et');
const seedTreks = [
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

const seedNews = [
  {
    id: 1,
    title: 'Uudis 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://picsum.photos/420/270',
    updatedAt: moment().subtract(2, 'days').fromNow(),
    content: [
      {
        title: 'Esimene sektsioon',
        text: 'Nullam risus magna, accumsan id laoreet ornare, semper vitae erat. Proin justo justo, iaculis vel varius ut, pulvinar et felis. Vivamus nec lectus quis leo ultricies viverra vitae vehicula est. Nam massa nibh, semper id tristique quis, aliquam non dui. Duis laoreet scelerisque enim, nec vulputate turpis aliquet sit amet. ',
      },
      {
        title: 'Teine sektsioon',
        text: 'Duis porttitor, velit facilisis aliquam condimentum, lacus sapien mattis justo, sit amet elementum massa nibh ut libero. Pellentesque at odio blandit, fringilla est ac, aliquam sapien. Mauris scelerisque nisi ut placerat mollis. Aliquam vitae tellus sed ante volutpat aliquam. Curabitur mattis orci ut ex varius varius.',
      },
    ],
    tags: [
      {
        name: 'Sport',
      },
      {
        name: 'Loodus',
      },
    ],
  },
  {
    id: 2,
    title: 'Uudis 2',
    image: 'https://picsum.photos/420/270',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu justo gravida leo convallis lobortis id sed erat. Nullam lobortis risus nec tempus lobortis. ',
    content: [
      {
        id: 1,
        title: 'Esimene sektsioon',
        text: 'Nullam risus magna, accumsan id laoreet ornare, semper vitae erat. Proin justo justo, iaculis vel varius ut, pulvinar et felis. Vivamus nec lectus quis leo ultricies viverra vitae vehicula est. Nam massa nibh, semper id tristique quis, aliquam non dui. Duis laoreet scelerisque enim, nec vulputate turpis aliquet sit amet. ',
      },
      {
        id: 2,
        title: 'Teine sektsioon',
        text: 'Duis porttitor, velit facilisis aliquam condimentum, lacus sapien mattis justo, sit amet elementum massa nibh ut libero. Pellentesque at odio blandit, fringilla est ac, aliquam sapien. Mauris scelerisque nisi ut placerat mollis. Aliquam vitae tellus sed ante volutpat aliquam. Curabitur mattis orci ut ex varius varius.',
      },
    ],
    tags: [
      {
        name: 'Tarbija',
      },
      {
        name: 'Maailm',
      },
    ],
    updatedAt: moment().subtract(1, 'days').fromNow(),
  },
  {
    id: 3,
    title: 'Uudis 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://picsum.photos/420/270',
    updatedAt: moment().subtract(3, 'days').fromNow(),
    content: [
      {
        id: 1,
        title: 'Esimene sektsioon',
        text: 'Nullam risus magna, accumsan id laoreet ornare, semper vitae erat. Proin justo justo, iaculis vel varius ut, pulvinar et felis. Vivamus nec lectus quis leo ultricies viverra vitae vehicula est. Nam massa nibh, semper id tristique quis, aliquam non dui. Duis laoreet scelerisque enim, nec vulputate turpis aliquet sit amet. ',
      },
      {
        id: 2,
        title: 'Teine sektsioon',
        text: 'Duis porttitor, velit facilisis aliquam condimentum, lacus sapien mattis justo, sit amet elementum massa nibh ut libero. Pellentesque at odio blandit, fringilla est ac, aliquam sapien. Mauris scelerisque nisi ut placerat mollis. Aliquam vitae tellus sed ante volutpat aliquam. Curabitur mattis orci ut ex varius varius.',
      },
    ],
    tags: [
      {
        name: 'Tarbija',
      },
      {
        name: 'Maailm',
      },
    ],
  },
];

const seedDatabase = async () => {
  await Trek.deleteMany({});
  await Trek.insertMany(seedTreks);

  await News.deleteMany({});
  await News.insertMany(seedNews);
};

seedDatabase().then(() => {
  console.log('Database successfully seeded.');
  mongoose.connection.close();
});

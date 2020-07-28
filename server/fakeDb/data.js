const mongoose = require('mongoose');

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const data = {
  users: [
    {
      _id: user1Id,
      avatar: 'https://www.shareicon.net/data/128x128/2017/01/06/868320_people_512x512.png',
      email: "bill@gmail.com",
      name: "Bill Marques",
      username: "pnxbill",
      info: "Hello I'm Bill",
      password: "testtest",
      role: "admin"
    },
    {
      _id: user2Id,
      avatar: 'https://www.shareicon.net/data/128x128/2017/01/06/868320_people_512x512.png',
      email: "test@gmail.com",
      name: "Test User",
      username: "test99",
      info: "Hello I'm Test",
      password: "testtest",
    },
  ],
  portfolios: [
    {
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programing....',
      startDate: '01/01/2014',
      endDate: '01/01/2016',
      user: user1Id
    },
    {
      title: "Job in Siemens",
      company: "Siemens",
      companyWebsite: "www.google.com",
      location: "Slovakia, Kosice",
      jobTitle: "Software Engineer",
      description: "Responsoble for parsing framework for JSON medical data.",
      startDate: "01/01/2011",
      endDate: "01/01/2013",
      user: user1Id
    },
    {
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011',
      user: user1Id
    }
  ]
};

module.exports = data;
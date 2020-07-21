
const express = require('express')
const next = require('next');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

const data = {
  portfolios: [
    {
      _id: '312id2312',
      title: 'Job in USA',
      content: 'It was a very nice experience',
      jobTitle: 'Chef',
      daysOfExperience: 100,
      isCurrentlyEmployed: false
    },
    {
      _id: '33fj21k3',
      title: 'Job in Barcelona',
      content: 'Barcelona rocks!',
      jobTitle: 'Chef',
      isCurrentlyEmployed: false
    },
    {
      _id: '31k2j31l',
      title: 'Job in Germany',
      content: 'Dark is a terrible TV Show',
      jobTitle: 'Manager',
      daysOfExperience: 132,
      isCurrentlyEmployed: true
    },
  ]
};

app.prepare().then(() => {
  const server = express();
  // Construct a scheema using GRAPHQL
  const schema = buildSchema(`
    type Portfolio {
      _id: ID!
      title: String
      content: String
      jobTitle: String
      daysOfExperience: Int
      isCurrentlyEmployed: Boolean
    }

    type Query {
      hello: String
      portfolio: Portfolio
      portfolios: [Portfolio]
    }
  `);
  // Provides a resolver for each graphql endpoint
  const root = {
    hello: () => {
      return 'Hello World'
    },
    portfolio: () => {
      return data.portfolios[0]
    },
    portfolios: () => data.portfolios
  };

  server.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }));

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
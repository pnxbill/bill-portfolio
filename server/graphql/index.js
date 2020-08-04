
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

const { portfolioQueries, portfolioMutations, userMutations, userQueries } = require('./resolvers');
const { portfolioTypes, userTypes } = require('./types');
const Portfolio = require('./models/Portfolio');
const User = require('./models/User');
const { buildAuthContext } = require('./context');

exports.createApolloServer = () => {
  // Construct a scheema using GRAPHQL
  const typeDefs = gql`
    ${portfolioTypes}
    ${userTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]

      user: User
    }

    type Mutation { 
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput ): Portfolio
      deletePortfolio(id : ID): Portfolio

      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signOut: Boolean
    }
  `;
  // Provides a resolver for each graphql endpoint
  const resolvers = {
    Query: {
      ...portfolioQueries,
      ...userQueries
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations
    }
  };

  const apolloServer = new ApolloServer({
    typeDefs, resolvers,
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio')),
        User: new User(mongoose.model('User'))
      }
    })
  });

  return apolloServer;
}
import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import moment from "moment";
// import { createHttpLink } from "apollo-link-http";



export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      request: operation => {
        operation.setContext({
          fetchOptions: {
            credentials: 'include'
          },
          headers
        })
      },
      uri: 'http://localhost:3000/graphql',
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Portfolio: {
          daysOfExperience({ startDate, endDate }, args, { cache }) {
            // HIS WAY (using third party library)
            let now = moment.unix();
            if (endDate) now = endDate / 1000;
            return moment.unix(now).diff(moment.unix(startDate / 1000), 'days');
            // MY WAY (using js knowledge)
            startDate = parseInt(startDate);
            endDate = endDate ? parseInt(endDate) : Date.now();
            return (endDate - startDate) / 1000 / 60 / 60 / 24;
          }
        }
      }
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      )
    }
  }
);
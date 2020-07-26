import withApollo from "next-with-apollo";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from "apollo-link-http";



export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: createHttpLink({ uri: 'http://localhost:3000/graphql' }),
      cache: new InMemoryCache().restore(initialState || {})
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
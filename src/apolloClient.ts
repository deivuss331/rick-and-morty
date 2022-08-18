import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from 'appConfig';

export default new ApolloClient({
  uri: config.graphQl.uri,
  cache: new InMemoryCache(),
});

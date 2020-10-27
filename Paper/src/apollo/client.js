import { ApolloClient, InMemoryCache } from "@apollo/client";
import { REACT_APP_API_REMOTE } from "@env";

export const client = new ApolloClient({
  uri: `${REACT_APP_API_REMOTE}/graphql`,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

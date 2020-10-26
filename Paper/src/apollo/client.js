import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import {WebSocketLink} from "@apollo/client/link/ws"
import { REACT_APP_API } from "@env";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({uri:"http://api.gardenry.shop:3002/graphql"})
const wsLink = new WebSocketLink({uri:"ws://api.gardenry.shop:3002/graphql",
options:{reconnect:true}})

const splitLink = split(({query})=>{
  const definition = getMainDefinition(query);
  return(definition.kind==="OperationDefinition"&&definition.operation==="subscription")
},wsLink,httpLink)

export const client = new ApolloClient({
  link:splitLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

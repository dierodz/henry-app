import React from "react";
import { Provider } from "react-redux";
import AppRouter from "routers/AppRouter";
import store from "store/store";
import "./styles/styles.scss";
import { ApolloProvider } from '@apollo/client';
import { client } from "apollo";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ApolloProvider>
  );
};

export default App;

import React from "react";
import { Provider } from "react-redux";
import AppRouter from "routers/AppRouter";
import store from "store/store";
import "./styles/styles.scss";
import { ApolloProvider } from '@apollo/client';
import { client } from "apollo";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { Settings } from 'luxon';
Settings.defaultLocale = "es"
const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={LuxonUtils} locale="es">
          <AppRouter />
        </MuiPickersUtilsProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;

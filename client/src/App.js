import React from "react";
import { Provider } from "react-redux";
import AppRouter from "routers/AppRouter";
import store from "store/store";
import "./styles/styles.scss";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import { Settings } from "luxon";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
Settings.defaultLocale = "es";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1e1e1e",
    },
    secondary: {
      main: "#ffff01",
    },
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={LuxonUtils} locale="es">
            <AppRouter />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;

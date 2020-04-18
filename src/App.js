import React, { Component, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import {  Snackbar } from '@material-ui/core';
import './App.css';
import ListaBusiness from './componentes/vistas/ListaBusiness';
import AppNavBar from './componentes/layout/AppNavbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import RegistrarUser from './componentes/seguridad/RegistrarUser';
import Login from './componentes/seguridad/Login';
import { FirebaseContext } from './server';

import { useStateValue } from './session/store';
import openSnackbarReducer from './session/reducers/openSnackbarReducer';

function App(props) {
  let firebase = React.useContext(FirebaseContext);
  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);

  const [{ openSnackbar }, dispatch] = useStateValue();

  useEffect(() => {
    firebase.estaIniciado().then(val => {
      setupFirebaseInicial(val);
    })
  })

  return autenticacionIniciada !== false ? (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbarReducer.open : false}
        autoHidenDuration={3000}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.message : ""}
          </span>
        }
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: ""
            }
          })
        }
      />
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <AppNavBar />

          <Grid container>
            <Switch>
              <Route path="/" exact component={ListaBusiness}></Route>
              <Route path="/auth/login" exact component={Login}></Route>
              <Route path="/auth/RegistrarUser" exact component={RegistrarUser}></Route>
            </Switch>
          </Grid>

        </MuiThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  )
    : null
    ;
}

export default App;
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
//import openSnackbarReducer from './session/reducers/openSnackbarReducer';
import RutaAutenticada from './componentes/seguridad/RutaAutenticada';
import PerfilUsuario from './componentes/seguridad/PerfilUsuario';
import NuevoBusiness from './componentes/vistas/NuevoBusiness';
import EditarNegocio from './componentes/vistas/EditarNegocio';

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
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.mensaje : ""}
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
              <RutaAutenticada exact path="/" autenticadoFirebase={firebase.auth.currentUser} component={ListaBusiness} />
              <RutaAutenticada exact path="/auth/perfil" autenticadoFirebase={firebase.auth.currentUser} component={PerfilUsuario} />
              <RutaAutenticada exact path="/negocio/nuevo" autenticadoFirebase={firebase.auth.currentUser} component={NuevoBusiness} />
              <RutaAutenticada exact path="/negocio/:id" autenticadoFirebase={firebase.auth.currentUser} component={EditarNegocio} />
              <Route path="/auth/login" exact component={Login} />
              <Route path="/auth/registrarUser" exact component={RegistrarUser} />
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
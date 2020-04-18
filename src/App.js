import React, { Component, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';
import ListaBusiness from './componentes/vistas/ListaBusiness';
import AppNavBar from './componentes/layout/AppNavbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import RegistrarUser from './componentes/seguridad/RegistrarUser';
import Login from './componentes/seguridad/Login';
import { FirebaseContext } from './server';


function App(props) {
  let firebase = React.useContext(FirebaseContext);
  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);


  useEffect(() =>{
      firebase.estaIniciado().then(val=>{
      setupFirebaseInicial(val);
      })
  })

  return autenticacionIniciada !== false ? (
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
  )
  : null
  ;
}

export default App;
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';
import ListaBusiness from './componentes/vistas/ListaBusiness';
import AppNavBar from './componentes/layout/AppNavbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import RegistrarUser from './componentes/seguridad/RegistrarUser';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <AppNavBar />

          <Grid container>
            <Switch>
              <Route path="/" exact component={ListaBusiness}></Route>
              <Route path="/auth/RegistrarUser" exact component={RegistrarUser}></Route>
            </Switch>
          </Grid>

        </MuiThemeProvider>
      </BrowserRouter>
    )
  }
}

export default App;
import React, { Component } from 'react';
import './App.css';
import ListaBusiness from './componentes/vistas/ListaBusiness';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme/theme';

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <ListaBusiness/>
      </MuiThemeProvider>
    )
  }
}

export default App;
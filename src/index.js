import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import store from './store'
// import {Router} from 'react-router-dom'
// import history from './history'
// import store from './store'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {blue, green} from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: green
    },
    status: {
      danger: 'orange'
    }
  })

ReactDOM.render(
    <Provider store = {store}>
        <App /> 
    </Provider>,
document.getElementById('root'));
registerServiceWorker();

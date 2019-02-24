import React, { Component } from 'react';
import { Login, Users, NotFound } from './containers';
import { Switch, Route } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route 
            exact 
            path="/" 
            component={ Login }
          />
          <Route 
            exact 
            path="/users" 
            component={ Users }
          />
          <Route 
            component={ NotFound }
          />
        </Switch>
      </div>
    );
  }
}

export default App;

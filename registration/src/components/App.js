// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <h1>Registration App</h1>
        <Switch>
          <Route path="/login">
            <Login setAuthenticated={setAuthenticated} />
          </Route>
          <Route path="/signup">
            <Signup setAuthenticated={setAuthenticated} />
          </Route>
          <PrivateRoute path="/home" component={Home} isAuthenticated={isAuthenticated} />
          <Route path="/">
            <p>Choose an option: <a href="/login">Login</a> or <a href="/signup">Signup</a></p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

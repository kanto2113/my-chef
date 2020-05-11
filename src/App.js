import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import Home from "./components/pages/home"
import Login from "./components/auth/login"
import Register from "./components/auth/register"
import About from "./components/pages/about"
import Legal from "./components/pages/legal"

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register /> 
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/legal">
             <Legal />
          </Route>
        </Switch>
    </Router>

  );
}

export default App;
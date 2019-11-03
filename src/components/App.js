import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import Dashboard from "./Dashboard"
import Navigation from "./Navigation"
import Login from "./Login"
import Logout from "./Logout"

function App() {
  return (
    <Router>
      <header>
        <Navigation />
      </header>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </Router>
  )
}

export default App;

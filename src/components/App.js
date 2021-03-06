import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import Logout from "./Logout"
import SignUp from "./SignUp"
import Notification from "./Notification"

function App() {
  return (
    <Router>
      <Notification />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </Router>
  )
}

export default App;

// import dependencies
import React from "react";
import { Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

// import internal component
import Home from "./page/home";
import Login from "./page/login";
import Dashboard from "./page/dashboard";

// import css
import "antd/dist/antd.css";
import "./index.css";
import "./App.css";

const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Router history={history}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/" render={Home} />
            <Route exact path="/login" render={Login} />
            <Route exact path="/dashboard" render={Dashboard} />
          </Switch>
        </Router>
      </div>
    </BrowserRouter>
  );
}

export default App;

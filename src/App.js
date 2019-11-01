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
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Users</Link>
            </li>
          </ul>
        </nav>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </BrowserRouter>
  );
}

export default App;

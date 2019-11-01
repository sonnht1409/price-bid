// import dependencies
import React from "react";
import { Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import useSWR from "swr";
import axios from "axios";

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
  const { data, error } = useSWR("/api/user", axios);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const { data: response } = data;
  console.log(response);
  console.log(error);
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

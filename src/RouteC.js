import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Welcome from "./Welcome.js";
import About from "./About.js";
import Meet from "./Meet.js";
import SubmitContracts from "./SubmitContracts.js";
import Login from "./Login.js";
import Profile from "./Profile.js";
import Tasks from "./Tasks.js";
import BrowseContracts from "./BrowseContracts.js";
import Connect from "./Connect.js";
import Resources from "./Resources.js";
import Logout from "./Logout.js";

export default class RouteC extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Redirect to="/welcome" />
          <Route path="/welcome" component={Welcome} />
          <Route path="/about" component={About} />
          <Route path="/meet-the-team" component={Meet} />
          <Route path="/submit-contracts" component={SubmitContracts} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/browse-contracts" component={BrowseContracts} />
          <Route path="/connect" component={Connect} />
          <Route path="/resources" component={Resources} />
          <Route path="/logout" component={Logout} />
        </div>
      </BrowserRouter>
    );
  }
}

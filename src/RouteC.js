import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Welcome from "./Welcome.js";
import About from "./About.js";
import Meet from "./Meet.js";
import SubmitContracts from "./SubmitContracts.js";
import Login from "./Login.js";
import Profile from "./Profile.js";
import Challenges from "./Challenges.js";
import BrowseContracts from "./BrowseContracts.js";
import Connect from "./Connect.js";
import Resources from "./Resources.js";
import Register from "./Register.js";
import TaskManager from "./TaskManager";

export default class RouteC extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/welcome" component={Welcome} />
          <Route path="/about" component={About} />
          <Route path="/meet-the-team" component={Meet} />
          <Route path="/submit-contracts" component={SubmitContracts} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/challenges" component={Challenges} />
          <Route path="/task-manager" component={TaskManager} />
          <Route path="/browse-contracts" component={BrowseContracts} />
          <Route path="/connect" component={Connect} />
          <Route path="/resources" component={Resources} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

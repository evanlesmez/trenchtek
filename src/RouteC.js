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
import Logout from "./Logout.js";
import TaskManager from "./TaskManager.js";
import TopbarCompany from "./TopbarCompany.js";
import TopbarUser from "./TopbarUser.js";

export default class RouteC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: "/welcome"
    };
  }
  render() {
    if (
      this.state.currentPath === "/welcome" ||
      this.state.currentPath === "/about" ||
      this.state.currentPath === "/meet-the-team" ||
      this.state.currentPath === "/submit-contracts"
    ) {
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
            <Route path="/challenges" component={Challenges} />
            <Route path="/task-manager" component={TaskManager} />
            <Route path="/browse-contracts" component={BrowseContracts} />
            <Route path="/connect" component={Connect} />
            <Route path="/resources" component={Resources} />
            <Route path="/logout" component={Logout} />
          </div>
        </BrowserRouter>
      );
    } else {
      return;
      <BrowserRouter>
        <div>
          <TopbarUser />
          <Redirect to="/welcome" />
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
          <Route path="/logout" component={Logout} />
        </div>
      </BrowserRouter>;
    }
  }
}

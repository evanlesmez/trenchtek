import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Welcome from "./Welcome.js";
import About from "./About.js";
import Meet from "./Meet.js";
import SubmitContracts from "./SubmitContracts.js";
import Login from "./Login.js";
import Profilehandler from "./Profilehandler.js";
import Challenges from "./Challenges.js";
import BrowseContracts from "./BrowseContracts.js";
import Connect from "./Connect.js";
import Connect2 from "./Connect2.js";
import Resources from "./Resources.js";
import Logout from "./Logout.js";
import TaskManager from "./TaskManager.js";
import TopbarCompany from "./TopbarCompany.js";
import TopbarUser from "./TopbarUser.js";
import Register from "./Register.js";
import Admin from "./Admin.js";
import User from "./User.js";
import firebase from "./Firebase.js";

export default class RouteC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTitle: "",
      loginSuccessful: false
    };
  }

  checkUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.setState({
          loginSuccessful: true
        });
      } else {
        this.setState({
          loginSuccessful: false
        });
      }
    });
  };

  componentDidMount() {
    this.checkUser();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        let userKey = user.uid;
        let userIDString = "/users/" + userKey;
        let database = firebase.database().ref(userIDString);
        database.on("value", snapshot => {
          let newTitleState = snapshot.val().title;
          console.log(newTitleState);
          this.setState({
            userTitle: newTitleState
          });
          console.log(this.state);
        });
        // User is signed in.
      } else {
        console.log("no user found");
        // No user is signed in.
      }
    });
  }

  render() {
    //<Route path="/submit-contracts" component={SubmitContracts} />
    const CompanyRegex = new RegExp(
      "^/$|/about|/meet-the-team|/submit-contracts"
    );
    const UserRegex = new RegExp(
      "/challenges|/task-manager|/browse-contracts|/connect|/resources|/profile|/q&a|/directory|/admin"
    );
    return (
      <BrowserRouter>
        <div>
          <Route path={CompanyRegex} component={TopbarCompany} />
          <Route
            path={UserRegex}
            render={() => <TopbarUser userTitle={this.state.userTitle} />}
          />
          <div>
            <Route exact path="/" component={Welcome} />
            <Route path="/about" component={About} />
            <Route path="/meet-the-team" component={Meet} />
            <Route path="/submit-contracts" component={SubmitContracts} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profilehandler} />
            <Route path="/challenges" component={Challenges} />
            <Route path="/task-manager" component={TaskManager} />
            <Route path="/browse-contracts" component={BrowseContracts} />
            <Route path="/q&a" component={Connect} />
            <Route path="/directory" component={Connect2} />
            <Route path="/resources" component={Resources} />
            <Route path="/register" component={Register} />
            <Route
              path="/profile"
              render={() => <Profilehandler userTitle={this.state.userTitle} />}
            />
            <Route
              path="/challenges"
              render={() => <Challenges userTitle={this.state.userTitle} />}
            />
            <Route
              path="/task-manager"
              render={() => <TaskManager userTitle={this.state.userTitle} />}
            />
            <Route
              path="/browse-contracts"
              render={() => (
                <BrowseContracts userTitle={this.state.userTitle} />
              )}
            />
            <Route
              path="/connect"
              render={() => <Connect userTitle={this.state.userTitle} />}
            />
            <Route path="/connect2" component={Connect2} />
            <Route
              path="/resources"
              render={() => <Resources userTitle={this.state.userTitle} />}
            />
            <Route path="/logout" component={Logout} />
            <Route
              path="/admin"
              render={() => <Admin userTitle={this.state.userTitle} />}
            />
            <Route
              path="/users"
              render={() => <User userTitle={this.state.userTitle} />}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

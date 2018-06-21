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
import TopbarCompany from "./TopbarCompany.js";
import TopbarUser from "./TopbarUser.js";
import Register from "./Register.js";
import Admin from "./Admin.js";
import User from "./User.js";
import firebase from "./Firebase.js";
import AddGroups from "./AddGroups";
import TaskManager from "./TaskManager"

export default class RouteC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTitle: "",
      loginSuccessful: false,
      uidString: ""
    };
  }

  updateField = (field, value) => {
    this.setState({
      ...this.state,
      field: value
    });
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("hello2");
        console.log(user);
        let userKey = user.uid;
        let userIDString = "/users/" + userKey;
        let database = firebase.database().ref(userIDString);
        console.log(userIDString);
        //console.log(userIDString);
        database.on("value", snapshot => {
          //console.log(snapshot.val());
          let newTitleState = snapshot.val().title;
          //console.log(newTitleState);
          this.setState({
            userTitle: newTitleState,
            uidString: userIDString
          });
          //console.log(this.state);
        });
        this.setState({ loginSuccessful: true });
        // User is signed in.
      } else {
        //console.log("no user found");

        this.setState({ loginSuccessful: false });
        // No user is signed in.
      }
    });
  }

  render() {
    const CompanyRegex = new RegExp(
      "^/$|/about|/meet-the-team|/submit-contracts"
    );
    const UserRegex = new RegExp(
      "/challenges|/task-manager|/browse-contracts|/connect|/resources|/profile|/q&a|/directory|/manage-contracts|/manage-users"
    );
    return (
      <div>
        <BrowserRouter>
          <div>


            <Route path={CompanyRegex} component={TopbarCompany} />
            <Route
              path={UserRegex}
              render={() =>
                this.state.loginSuccessful ? (
                  <TopbarUser userTitle={this.state.userTitle} />
                ) : null
              }
            />
            <div>
              <Route exact path="/" component={Welcome} />
              <Route path="/about" component={About} />
              <Route path="/meet-the-team" component={Meet} />
              <Route path="/submit-contracts" component={SubmitContracts} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              {this.state.loginSuccessful ? (
                <div>
                  <Route
                    path="/profile"
                    render={() => (
                      <Profilehandler {...this.state} /> // Need this for sending uid
                    )}
                  />
                  <Route
                    path="/challenges"
                    render={() => (
                      <Challenges userTitle={this.state.userTitle} uidString={this.state.uidString} />
                    )}
                  />
                  <Route
                    path="/task-manager"
                    render={() => (
                      <AddGroups userTitle={this.state.userTitle} />
                    )}
                  />
                  <Route
                    path="/browse-contracts"
                    render={() => (
                      <BrowseContracts userTitle={this.state.userTitle} />
                    )}
                  />
                  <Route
                    path="/q&a"
                    render={() => <Connect userTitle={this.state.userTitle} />}
                  />
                  <Route path="/directory" component={Connect2} />
                  <Route
                    path="/resources"
                    render={() => (
                      <Resources userTitle={this.state.userTitle} />
                    )}
                  />
                  <Route path="/logout" component={Logout} />
                  {this.state.userTitle === "Admin" ? (
                    <div>
                      <Route
                        path="/manage-contracts"
                        render={() => (
                          <Admin userTitle={this.state.userTitle} />
                        )}
                      />
                      <Route
                        path="/manage-users"
                        render={() => <User userTitle={this.state.userTitle} />}
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

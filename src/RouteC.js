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
import firebase from "./Firebase.js"

export default class RouteC extends Component {
  constructor(props){
  super(props);
  this.state = {
    currentPage: "welcome",
    userTitle: ""
    };
  }

  componentDidMount(){
    firebase
      .auth()
      .signInWithEmailAndPassword("email@email.com", "password")
      .catch(error => {
        alert(
          "The email address and/or password you entered was incorrect. Please try again."
        );
      });


    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        let userKey = user.uid;
        let userIDString = "users/" + userKey;
        let database = firebase.database().ref(userIDString);
        database.on("value" , (snapshot) => {
          let newTitleState = (snapshot.val().title);
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
      "/welcome|/about|/meet-the-team|/submit-contracts"
    );
    const UserRegex = new RegExp(
      "/challenges|/task-manager|/browse-contracts|/connect|/resources|/profile"
    );
    return (

      <BrowserRouter>
        <div>
          <Route path={CompanyRegex} component={TopbarCompany} />
          <Route path={UserRegex} render={()=><TopbarUser userTitle={this.state.userTitle}/>} />
          <Redirect to="/welcome" />
          <div>
            <Route path="/welcome" component={Welcome} />
            <Route path="/about" component={About} />
            <Route path="/meet-the-team" component={Meet} />
            <Route path="/submit-contracts" component={SubmitContracts} />

            <Route path="/login" component={Login} />
            <Route path="/profile" render={()=><Profilehandler userTitle={this.state.userTitle}/>}/>
            <Route path="/challenges" render={()=><Challenges userTitle={this.state.userTitle}/>}/>
            <Route path="/task-manager" render={()=><TaskManager userTitle={this.state.userTitle}/>}/>
            <Route path="/browse-contracts" render={()=><BrowseContracts userTitle={this.state.userTitle}/>} />
            <Route path="/connect" render={()=><Connect userTitle={this.state.userTitle}/>} />
            <Route path="/connect2" component={Connect2} />
            <Route path="/resources" render={()=><Resources userTitle={this.state.userTitle}/>} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/admin" render={()=><Admin userTitle={this.state.userTitle}/>} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

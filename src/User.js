import React, { Component } from "react";
import firebase from "./Firebase";

// Allows the administrators to view all the registered users

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.pullingUsers();
  }
  pullingUsers = () => {
    const userRef = firebase.database().ref("/users");
    userRef.on("value", snapshot => {
      let userstemp = snapshot.val();
      console.log(snapshot);
      this.setState({
        users: userstemp
      });
      console.log(this.state.users);
    });
  };
  render() {
    return <div>hi</div>;
  }
}

import React, { Component } from "react";
import firebase from "./Firebase";
import { Collapse, Button, Form, Input, DatePicker, Icon, Card } from "antd";

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
      let userstemp = [];
      snapshot.forEach(value => {
        console.log(value.key);
        if (value.val().approved === false && value.val().title !== "removed") {
          let obj = {
            name: value.val().name,
            email: value.val().email,
            title: value.val().title,
            key: value.key
          };
          userstemp.push(obj);
        }
      });
      this.setState({
        users: userstemp
      });
    });
  };

  acceptUser = user => {
    console.log(user);
    const userRef = firebase
      .database()
      .ref("/users/" + user.key)
      .child("approved")
      .set(true);
  };

  deleteUser = (e, user) => {
    e.preventDefault();
    console.log(user.key);
    const userToDelete = firebase.database().ref(`/users/${user.key}`);
    if (
      window.confirm(
        `Are you sure you want to reject the registration of: ${user.name}?`
      )
    ) {
      userToDelete.child("title").set("removed");
      userToDelete.child("approved").set("removed");
    }
  };
  render() {
    return (
      <div>
        {this.state.users.map(user => {
          return (
            <center>
              <Card title={user.name} style={{ width: 450 }}>
                <p>Email: {user.email} </p>
                <p>Title: {user.title} </p>
                <Button onClick={() => this.acceptUser(user)}>Accept</Button>
                <Button onClick={e => this.deleteUser(e, user)}>Reject</Button>
              </Card>
              <br />
            </center>
          );
        })}
      </div>
    );
  }
}

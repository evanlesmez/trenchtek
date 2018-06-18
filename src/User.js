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
    let userstemp = [];
    userRef.on("value", snapshot => {
      snapshot.forEach(value => {
        console.log(value.key);
        let obj = {
          name: value.val().name,
          email: value.val().email,
          title: value.val().title,
          key: value.key
        };
        userstemp.push(obj);
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
      .child("upvotes")
      .set("90");
  };
  render() {
    console.log(this.state.users);
    return (
      <div>
        {this.state.users.map(user => {
          return (
            <center>
              <Card title={user.name} style={{ width: 450 }}>
                <p>Email: {user.email} </p>
                <p>Title: {user.title} </p>
                <Button onClick={() => this.acceptUser(user)}>Accept</Button>
                <Button>Reject</Button>
              </Card>
              <br />
            </center>
          );
        })}
      </div>
    );
  }
}

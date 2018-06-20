import React, { Component } from "react";
import firebase from "./Firebase";
import "./Post.css";
import {
  Collapse,
  Button,
  Form,
  Input,
  DatePicker,
  Icon,
  Card,
  Select,
  Tag
} from "antd";

// Allows the administrators to view all the registered users

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unapprovedUsers: [],
      approvedUsers: [],
      allUsers: [],
      removedUsers: [],
      display: "unapprovedUsers"
    };
  }
  componentDidMount() {
    this.pullingUsers();
  }
  pullingUsers = () => {
    const userRef = firebase.database().ref("/users");
    userRef.on("value", snapshot => {
      let unapprovedUserstemp = [];
      let allUserstemp = [];
      let approvedUserstemp = [];
      let removedUserstemp = [];
      snapshot.forEach(value => {
        //console.log(value.key);
        let obj = {
          name: value.val().name,
          email: value.val().email,
          title: value.val().title,
          approved: value.val().approved,
          upvotes: value.val().upvotes,
          tags: value.val().tags,
          key: value.key
        };
        allUserstemp.push(obj);
        //console.log(value.val());
        if (value.val().approved === false && value.val().title !== "removed") {
          unapprovedUserstemp.push(obj);
          //console.log("?");
        }
        if (value.val().approved === true && value.val().title !== "removed") {
          approvedUserstemp.push(obj);
        }
        if (
          value.val().approved === "removed" &&
          value.val().title === "removed"
        ) {
          removedUserstemp.push(obj);
        }
      });
      this.setState({
        unapprovedUsers: unapprovedUserstemp,
        allUsers: allUserstemp,
        approvedUsers: approvedUserstemp,
        removedUsers: removedUserstemp
      });
    });
  };

  acceptUser = user => {
    //console.log(user);
    const userRef = firebase
      .database()
      .ref("/users/" + user.key)
      .child("approved")
      .set(true);
  };

  deleteUser = (e, user) => {
    e.preventDefault();
    //console.log(user.key);
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

  handleDisplay = value => {
    this.setState({
      display: value
    });
  };

  editUnapproved = user => {};
  render() {
    //console.log(this.state);
    return (
      <div>
        <br />
        <center>
          <div className="selectusers">
            Display:{" "}
            <Select
              defaultValue="unapprovedUsers"
              style={{ width: 170 }}
              onChange={value => {
                this.handleDisplay(value);
              }}
            >
              <Select.Option value="unapprovedUsers">
                Unapproved Users
              </Select.Option>
              <Select.Option value="approvedUsers">
                Approved Users
              </Select.Option>
              <Select.Option value="removedUsers">Removed Users</Select.Option>
              <Select.Option value="allUsers">All Users</Select.Option>
            </Select>
          </div>
        </center>
        <br />
        {this.state.display === "unapprovedUsers" &&
          this.state.unapprovedUsers.map(user => {
            return (
              <center>
                <Card
                  title={
                    <div className="panelheader">
                      <center>
                        <div className="headertitle">{user.name}</div>
                      </center>
                      <div className="chaldelete">
                        <Button size="small">
                          <Icon type="edit" />
                        </Button>
                      </div>
                    </div>
                  }
                  style={{ width: 450 }}
                >
                  <p>Email: {user.email} </p>
                  <p>Title: {user.title} </p>
                  <Button onClick={() => this.acceptUser(user)}>Accept</Button>
                  <Button onClick={e => this.deleteUser(e, user)}>
                    Reject
                  </Button>
                </Card>
                <br />
              </center>
            );
          })}
        {this.state.display === "removedUsers" &&
          this.state.removedUsers.map(user => {
            return (
              <center>
                <Card
                  title={
                    <div className="panelheader">
                      <center>
                        <div className="headertitle">{user.name}</div>
                      </center>
                      <div className="chaldelete">
                        <Button size="small">
                          <Icon type="edit" />
                        </Button>
                      </div>
                    </div>
                  }
                  style={{ width: 450 }}
                >
                  <p>Email: {user.email} </p>
                  <p>Title: {user.title} </p>
                  <Button onClick={() => this.acceptUser(user)}>Accept</Button>
                  <Button onClick={e => this.deleteUser(e, user)}>
                    Reject
                  </Button>
                </Card>
                <br />
              </center>
            );
          })}
        {this.state.display === "approvedUsers" &&
          this.state.approvedUsers.map(user => {
            return (
              <center>
                <Card
                  title={
                    <div className="panelheader">
                      <center>
                        <div className="headertitle">
                          {user.name +
                            " - " +
                            user.title.charAt(0).toUpperCase() +
                            user.title.slice(1)}
                        </div>
                      </center>
                      <div className="chaldelete">
                        <Button size="small">
                          <Icon type="edit" />
                        </Button>
                      </div>
                    </div>
                  }
                  style={{ width: 450 }}
                >
                  <p>Email: {user.email} </p>
                  <p>Title: {user.title} </p>
                  <p>Approved: {user.approved.toString()}</p>
                  <p class="escape">About: {user.about} </p>
                  <p class="escape">
                    Tags: {user.tags.map(t => <Tag color="blue">{t}</Tag>)}
                  </p>

                  <Button onClick={() => this.acceptUser(user)}>Accept</Button>
                  <Button onClick={e => this.deleteUser(e, user)}>
                    Reject
                  </Button>
                </Card>
                <br />
              </center>
            );
          })}
        {this.state.display === "allUsers" &&
          this.state.allUsers.map(user => {
            return (
              <center>
                <Card
                  title={
                    <div className="panelheader">
                      <center>
                        <div className="headertitle">
                          {user.name +
                            " - " +
                            user.title.charAt(0).toUpperCase() +
                            user.title.slice(1)}
                        </div>
                      </center>
                      <div className="chaldelete">
                        <Button size="small">
                          <Icon type="edit" />
                        </Button>
                      </div>
                    </div>
                  }
                  style={{ width: 450 }}
                >
                  <p>Email: {user.email} </p>
                  <p>Title: {user.title} </p>
                  <p>Approved: {user.approved.toString()}</p>
                  <p class="escape">About: {user.about} </p>
                  <p class="escape">
                    Tags: {user.tags.map(t => <Tag color="blue">{t}</Tag>)}
                  </p>

                  <Button onClick={() => this.acceptUser(user)}>Accept</Button>
                  <Button onClick={e => this.deleteUser(e, user)}>
                    Reject
                  </Button>
                </Card>
                <br />
              </center>
            );
          })}
      </div>
    );
  }
}

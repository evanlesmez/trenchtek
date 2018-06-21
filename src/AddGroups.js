import React, { Component } from "react";
import { Button, Form, Input, Card, Row, Col } from "antd";
import firebase from "./Firebase.js";
import TaskManager from "./TaskManager";

const groupRef = firebase.database().ref("groups");
const userRef = firebase.database().ref("users");
const FormItem = Form.Item;
let newGroup = null;
let newUsers = [];
let started = false;
let userid = null;

export default class AddGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      groupForm: null,
      currentEmail: "",
      personalCreated: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        userid = user.uid;
      }
      userRef.child(userid).on("value", snapshot => {
        let info = snapshot.val();
        for (let cri in info) {
          if (cri === "email") {
            this.setState({ currentEmail: info[cri] }, () => {
              groupRef.on("value", snapshot => {
                let groups = snapshot.val();
                let tempGroup = [];
                for (let group in groups) {
                  if (group === "Personal" + userid) {
                    this.setState({ personalCreated: true });
                  }
                  groupRef
                    .child(group)
                    .child("users")
                    .on("value", snapshot => {
                      let users = snapshot.val();
                      if (
                        users !== null &&
                        users.includes(this.state.currentEmail)
                      ) {
                        tempGroup.push(group);
                        let tempUser = [];
                        for (let user in users) {
                          tempUser.push(users[user]);
                        }
                        this.setState({ [group + "Users"]: tempUser });
                      }
                      groupRef
                        .child(group)
                        .child("tasks")
                        .on("value", snapshot => {
                          let tasks = [];
                          snapshot.forEach(child => {
                            let name = child.val().name;
                            let des = child.val().des;
                            let type = child.val().type;
                            let key = child.key;
                            tasks.push({
                              name: name,
                              type: type,
                              key: key
                            });
                            this.setState({ [group + "Tasks"]: tasks });
                          });
                        });
                    });
                }
                started = true;
                this.setState({ groups: tempGroup });
              });
            });
          }
        }
      });
    });
  }

  deleteGroup = group => {
    if (group.substring(0, 8) === "Personal") {
      this.setState({ personalCreated: false });
    }
    groupRef.child(group).remove();
  };

  deleteTask = (group, key) => {
    groupRef
      .child(group)
      .child("tasks")
      .child(key)
      .remove();
  };

  submitGroup = () => {
    if (newGroup === null || newUsers.length === 0) {
      alert("Please enter a group name and users!");
      return false;
    } else {
      let tempGroup = this.state.groups;
      tempGroup.push(newGroup);
      this.setState({
        groups: tempGroup,
        groupForm: null,
        [newGroup + "Tasks"]: [{ name: "default", type: "uncompleted" }],
        [newGroup + "Users"]: newUsers
      });
      groupRef
        .child(newGroup)
        .child("tasks")
        .push({ name: "default", type: "uncompleted" });
      groupRef
        .child(newGroup)
        .child("users")
        .set(newUsers);
      newGroup = null;
      newUsers = null;
      return true;
    }
  };

  submitPersonal = () => {
    let tempGroup = this.state.groups;
    tempGroup.push("Personal" + userid);
    this.setState({
      groups: tempGroup,
      ["Personal" + userid + "Tasks"]: [
        { name: "default", type: "uncompleted" }
      ],
      ["Personal" + userid + "Users"]: [this.state.currentEmail],
      personalCreated: true
    });
    groupRef
      .child("Personal" + userid)
      .child("tasks")
      .push({ name: "default", type: "uncompleted" });
    groupRef
      .child("Personal" + userid)
      .child("users")
      .set([this.state.currentEmail]);
  };

  handleGroupChange = e => {
    newGroup = e.target.value;
  };

  handleUserChange = e => {
    let temp = e.target.value;
    newUsers = temp.split(", ");
    newUsers.push(this.state.currentEmail);
  };

  addGroupForm = () => {
    this.setState({
      groupForm: (
        <Row>
          <Col span={6}>
            <Card>
              <Form>
                <FormItem label="new group name">
                  <Input onChange={this.handleGroupChange} />
                </FormItem>
                <FormItem label="new users emails">
                  <Input onChange={this.handleUserChange} />
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.submitGroup}
                  >
                    Submit
                  </Button>
                </FormItem>
                <FormItem>
                  <Button onClick={this.handleCancel}>Cancel</Button>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      )
    });
  };

  handleCancel = () => {
    this.setState({ groupForm: null });
  };

  render() {
    console.log("add groups is rendering");
    return (
      <div>
        <TaskManager
          {...this.state}
          setTasks={this.setTasks}
          deleteGroup={this.deleteGroup}
          started={started}
          deleteTask={this.deleteTask}
          giveCurrentEmail={this.giveCurrentEmail}
          userid={userid}
        />
        <Button
          onClick={this.addGroupForm}
          style={{ marginLeft: 25, marginTop: 10, marginBottom: 10 }}
        >
          Add Group
        </Button>
        {!this.state.personalCreated ? (
          <Button
            onClick={this.submitPersonal}
            style={{ marginLeft: 25, marginTop: 10 }}
          >
            Add Personal
          </Button>
        ) : null}
        <div>{this.state.groupForm}</div>
      </div>
    );
  }
}

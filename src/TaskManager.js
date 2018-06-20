import React, { Component } from "react";
import { Button, Form, Input, Card, Layout, Row, Col, Icon } from "antd";
import firebase from "./Firebase.js";
import "./App.css";

const groupRef = firebase.database().ref("groups");
const userRef = firebase.database().ref("users");
const FormItem = Form.Item;
let newTask = null;
let newUser = null;
let newContent = "";
//let tasks = [];

const { Content } = Layout;

export default class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      //tasks: [],
      cardForm: null
    };
  }

  handleTaskChange = e => {
    newTask = e.target.value;
  };

  handleUserChange = e => {
    newUser = e.target.value;
  };

  submitTask = (e, group) => {
    if (group === "Personal") {
      group = group + this.props.userid;
    }
    e.preventDefault();
    groupRef
      .child(group)
      .child("tasks")
      .push({ name: newTask, des: newTask + "Content", type: "uncompleted" });
    this.setState({ [group + "cardForm"]: null });
  };

  markComplete = (group, key) => {
    groupRef
      .child(group)
      .child("tasks")
      .child(key)
      .child("type")
      .set("completed");
  };

  submitUser = (e, group) => {
    e.preventDefault();
    let tempUser = this.props[group + "Users"];
    tempUser.push(newUser);
    //this.props.setUsers(group, tempUser);
    groupRef
      .child(group)
      .child("users")
      .set(tempUser);
    this.setState({ [group + "cardForm"]: null });
  };

  addTaskForm = group => {
    this.setState({
      [group + "cardForm"]: (
        <Form onSubmit={e => this.submitTask(e, group)}>
          <FormItem label="new task">
            <Input onChange={this.handleTaskChange} />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      )
    });
  };

  addUserForm = group => {
    this.setState({
      [group + "cardForm"]: (
        <Form onSubmit={e => this.submitUser(e, group)}>
          <FormItem label="new user">
            <Input onChange={this.handleUserChange} />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      )
    });
  };

  editContent = e => {
    newContent = e.target.value;
  };

  render() {
    console.log("task manager is rendering");
    let title = "";
    return this.props.started
      ? this.props.groups.map(group => {
          group.substring(0, 8) === "Personal"
            ? (title = "Personal")
            : (title = group);

          return (
            <span className="make-them-inline">
              <Card
                title={title}
                style={{
                  marginTop: 25,
                  marginLeft: 25
                }}
                extra={
                  <div className="chaldelete">
                    <Button
                      size="small"
                      onClick={() => this.props.deleteGroup(group)}
                    >
                      <Icon type="delete" />
                    </Button>
                  </div>
                }
              >
                <div>Uncompleted tasks:</div>
                {this.props[group + "Tasks"].map(task => {
                  return (
                    <div>
                      {task.name !== "default" &&
                      task.type === "uncompleted" ? (
                        <Card style={{ marginTop: 16 }} type="inner">
                          <div>{task.name}</div>
                          <div className="chaldelete">
                            <Button
                              size="small"
                              onClick={() =>
                                this.props.deleteTask(group, task.key)
                              }
                            >
                              <Icon type="delete" />
                            </Button>
                            <Button
                              size="small"
                              onClick={() => this.markComplete(group, task.key)}
                            >
                              <Icon type="check" />
                            </Button>
                          </div>
                        </Card>
                      ) : null}{" "}
                    </div>
                  );
                })}

                <div>Completed tasks:</div>
                {this.props[group + "Tasks"].map(task => {
                  return (
                    <div>
                      {task.name !== "default" && task.type === "completed" ? (
                        <Card style={{ marginTop: 16 }} type="inner">
                          <div>{task.name}</div>
                          <div className="chaldelete">
                            <Button
                              size="small"
                              onClick={() =>
                                this.props.deleteTask(group, task.key)
                              }
                            >
                              <Icon type="delete" />
                            </Button>
                            <Button
                              size="small"
                              onClick={() => this.markComplete(group, task.key)}
                            >
                              <Icon type="check" />
                            </Button>
                          </div>
                        </Card>
                      ) : null}
                    </div>
                  );
                })}

                <Button
                  style={{ marginTop: 16 }}
                  onClick={() => this.addTaskForm(group)}
                >
                  Add Task
                </Button>
                <Button
                  style={{ marginTop: 16 }}
                  onClick={() => this.addUserForm(group)}
                >
                  Add User
                </Button>
                {this.state[group + "cardForm"]}
              </Card>
            </span>
          );
        })
      : null;
  }
}

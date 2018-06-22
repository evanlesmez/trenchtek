import React, { Component } from "react";
import { Button, Form, Input, Card, Layout, Row, Col, Icon } from "antd";
import firebase from "./Firebase.js";
import "./App.css";

const groupRef = firebase.database().ref("groups");
const userRef = firebase.database().ref("users");
const FormItem = Form.Item;
let newTask = null;
let newUser = [];
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

  mark = (group, key, place) => {
    groupRef
      .child(group)
      .child("tasks")
      .child(key)
      .child("type")
      .set(place);
  };

  submitUser = (e, group) => {
    e.preventDefault();
    let tempUser = this.props[group + "Users"];
    if (!tempUser.includes(newUser)) {
      tempUser.push(newUser);
    }
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
    return this.props.started ? (
      <div className="flex-container">
        {" "}
        {this.props.groups.map(group => {
          group.substring(0, 8) === "Personal"
            ? (title = "Personal")
            : (title = group);
          return (
            <div>
              <Card
                className="make-gray"
                title={title}
                style={{
                  marginTop: 25,
                  marginLeft: 20,
                  marginRight: 20
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
                <div>
                  <em>Uncompleted tasks:</em>
                </div>
                {this.props[group + "Tasks"].map(task => {
                  return (
                    <div>
                      {task.name !== "default" &&
                      task.type === "uncompleted" ? (
                        <Card
                          style={{ marginTop: 16 }}
                          type="inner"
                          className="rounded-corners"
                        >
                          <Col span={12}>
                            <div>{task.name}</div>
                          </Col>
                          <Col span={12}>
                            <div className="chaldelete">
                              <Button
                                size="small"
                                onClick={() =>
                                  this.props.deleteTask(group, task.key)
                                }
                                className="float-right"
                              >
                                <Icon type="delete" />
                              </Button>

                              <Button
                                size="small"
                                onClick={() =>
                                  this.mark(group, task.key, "completed")
                                }
                                className="float-right"
                              >
                                <Icon type="check" />
                              </Button>
                            </div>
                          </Col>
                        </Card>
                      ) : null}{" "}
                    </div>
                  );
                })}

                <div className="top-margin">
                  <em>Completed tasks:</em>
                </div>
                {this.props[group + "Tasks"].map(task => {
                  return (
                    <div>
                      {task.name !== "default" && task.type === "completed" ? (
                        <Card
                          style={{ marginTop: 16 }}
                          type="inner"
                          className="rounded-corners"
                        >
                          <Col span={12}>
                            <div>{task.name}</div>
                          </Col>
                          <Col span={12}>
                            <div className="chaldelete">
                              <Button
                                size="small"
                                onClick={() =>
                                  this.props.deleteTask(group, task.key)
                                }
                                className="float-right"
                              >
                                <Icon type="delete" />
                              </Button>

                              <Button
                                size="small"
                                onClick={() =>
                                  this.mark(group, task.key, "uncompleted")
                                }
                                className="float-right"
                              >
                                <Icon type="sync" />
                              </Button>
                            </div>
                          </Col>
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
            </div>
          );
        })}{" "}
      </div>
    ) : null;
  }
}

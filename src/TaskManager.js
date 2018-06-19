import React, { Component } from "react";
import { Button, Form, Input, Card, Layout, Row, Col } from "antd";
import firebase from "./Firebase.js";
import "./App.css";

const groupRef = firebase.database().ref("groups");
const userRef = firebase.database().ref("users");
const FormItem = Form.Item;
let newTask = null;

const { Content } = Layout;

export default class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      tasks: [],
      cardForm: null
    };
  }

  handleTaskChange = e => {
    newTask = e.target.value;
  };

  submitTask = (e, group) => {
    e.preventDefault();
    let tempTask = this.props[group + "Tasks"];
    tempTask.push(newTask);
    this.props.setTasks(group, tempTask);
    groupRef
      .child(group)
      .child("tasks")
      .set(tempTask);
    newTask = null;
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

  render() {
    return this.props.started
      ? this.props.groups.map(group => {
          return (
            <span className="make-them-inline">
              <Card
                title={group}
                style={{
                  marginTop: 25,
                  marginLeft: 25
                }}
                //className="challenge-collapse"
              >
                {this.props[group + "Tasks"].map((task, index) => {
                  return task !== "default" ? (
                    <Card style={{ marginTop: 16 }} type="inner" title={task}>
                      {task} content
                      <Button
                        style={{ marginTop: 16 }}
                        onClick={() => this.props.deleteTask(group, index)}
                        size="small"
                      >
                        Delete Task
                      </Button>
                    </Card>
                  ) : null;
                })}
                <Button
                  style={{ marginTop: 16 }}
                  onClick={() => this.addTaskForm(group)}
                >
                  Add Task
                </Button>
                <Button
                  style={{ marginTop: 16 }}
                  onClick={() => this.props.deleteGroup(group)}
                >
                  Delete Group
                </Button>
                {this.state[group + "cardForm"]}
              </Card>
            </span>
          );
        })
      : null;
  }
}

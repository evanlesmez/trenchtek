import React, { Component } from "react";
import { Button, Form, Input, Card, Layout, Row, Col } from "antd";
import firebase from "./Firebase.js";

const groupRef = firebase.database().ref("groups");
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

  componentDidMount() {
    firebase.auth().currentUser;
    if (user) {
      let userid = user.uid;
    }
  }

  handleTaskChange = e => {
    newTask = e.target.value;
  };

  // setTasksToFirebase = group => {
  //   groupRef.child(group).child('tasks').set(this.state.tasks);
  // };

  submitTask = (e, group) => {
    e.preventDefault();
    let tempTask = this.props[group + "Tasks"];
    tempTask.push(newTask);
    this.props.setTasks(group, tempTask);
    groupRef
      .child(group)
      .child("tasks")
      .set(this.props[group + "Tasks"]);
    newTask = null;
    this.setState({ cardForm: null });
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
    if (this.props["personalCards"] !== undefined) {
      return this.props.groups.map(group => {
        return (
          <Card
            title={group}
            style={{
              marginTop: 25,
              marginLeft: 25
            }}
            className="challenge-collapse"
          >
            {this.props[group + "Cards"].map(card => {
              return card;
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
        );
      });
    }
    return null;
  }
}

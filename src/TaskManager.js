import React, { Component } from "react";
import { Button, Collapse, Form, Input, Checkbox, Card } from "antd";
import firebase from "./Firebase.js";

const taskRef = firebase.database().ref("tasks");
const Panel = Collapse.Panel;
const FormItem = Form.Item;
let newTask = null;

export default class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      tasks: [],
      cardForm: null,
      cards: []
    };
  }

  handleTaskChange = e => {
    newTask = e.target.value;
  };

  setTasksToFirebase = group => {
    taskRef.child(group).set(this.state.tasks);
  };

  submitTask = group => {
    let tempTask = this.state.tasks;
    tempTask.push(newTask);
    let tempCard = this.state.cards;
    tempCard.push(
      <Card style={{ marginTop: 16 }} type="inner" title={newTask}>
        {newTask} content
      </Card>
    );
    this.setState(
      { cards: tempCard, cardForm: null },
      this.setTasksToFirebase(group)
    );
    newTask = null;
  };

  addTaskForm = () => {
    this.setState({
      cardForm: (
        <Form onSubmit={() => this.submitTask("den")}>
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
    return (
      <Card
        title="Group name"
        style={{
          color: "rgba(155, 242, 233, 1)",
          marginTop: 25,
          marginLeft: 25
        }}
        className="challenge-collapse"
      >
        {this.state.cards.map(card => {
          return card;
        })}
        {/* <Card type="inner" title="task 1">
          task 1 content, due date, etc.
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="task 2">
          task 2 content
        </Card> */}
        <Button style={{ marginTop: 16 }} onClick={this.addTaskForm}>
          Add Task
        </Button>
        {this.state.cardForm}
      </Card>
    );
  }
}

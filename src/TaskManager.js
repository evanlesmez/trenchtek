import React, { Component } from "react";
import { Button, Form, Input, Card, Layout, Row, Col } from "antd";
import firebase from "./Firebase.js";

const taskRef = firebase.database().ref("tasks");
const FormItem = Form.Item;
let newTask = null;
const { Content } = Layout;

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

  componentDidMount() {
    this.forceUpdate();
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

            <Button style={{ marginTop: 16 }} onClick={this.addTaskForm}>
              Add Task
            </Button>
            {this.state.cardForm}
          </Card>
        );
      });
    }
    return <Card title="test">more words</Card>;
  }
}

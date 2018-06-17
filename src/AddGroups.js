import React, { Component } from "react";
import { Button, Form, Input, Card } from "antd";
import firebase from "./Firebase.js";
import TaskManager from "./TaskManager";

const taskRef = firebase.database().ref("tasks");
const FormItem = Form.Item;
let newGroup = null;

export default class AddGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      groupForm: null
    };
  }

  componentDidMount() {
    taskRef.on("value", snapshot => {
      let tasks = snapshot.val();
      let tempGroup = [];
      for (let group in tasks) {
        tempGroup.push(group);
        this.setState({ [group + "Tasks"]: tasks[group] });
      }
      this.setState({ groups: tempGroup }, () => {
        let tempCard = [];
        let tasks = [];
        this.state.groups.map(group => {
          tempCard = [];
          tasks = this.state[group + "Tasks"];
          tasks.map(task => {
            tempCard.push(
              <Card style={{ marginTop: 16 }} type="inner" title={task}>
                {task} content
              </Card>
            );
          });
          this.setState(
            { [group + "Cards"]: tempCard } //, () => {this.forceUpdate();}
          );
        });
      });
    });
  }

  setTasks = (group, update) => {
    this.setState({ [group + "Tasks"]: update }, () => {
      taskRef.child(group).set(this.state[group + "Tasks"]);
    });
    console.log(group);
  };

  submitGroup = () => {
    let tempGroup = this.state.groups;
    tempGroup.push(newGroup);
    this.setState(
      {
        groups: tempGroup,
        groupForm: null,
        [newGroup + "Tasks"]: ["none"],
        [newGroup + "Cards"]: [null]
      },
      () => {
        this.state.groups.map(group => {
          taskRef.child(group).set(this.state[group + "Tasks"]);
        });
      }
    );
    newGroup = null;
  };

  handleGroupChange = e => {
    newGroup = e.target.value;
  };

  addGroupForm = () => {
    this.setState({
      groupForm: (
        <Form onSubmit={this.submitGroup}>
          <FormItem label="new group name">
            <Input onChange={this.handleGroupChange} />
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
      <div>
        <TaskManager {...this.state} setTasks={this.setTasks} />
        <Button
          onClick={this.addGroupForm}
          style={{ marginLeft: 25, marginTop: 10 }}
        >
          Add Group
        </Button>
        <div>{this.state.groupForm}</div>
      </div>
    );
  }
}

import React, { Component } from "react";
import TopbarUser from "./TopbarUser.js";
import { List, Button, Collapse, Form, Input, Checkbox } from "antd";
import firebase from "./Firebase.js";
import TaskManager from "./TaskManager";

const taskRef = firebase.database().ref("tasks");
const Panel = Collapse.Panel;
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
      for (let task in tasks) {
        tempGroup.push(task);
      }
      this.setState({ groups: tempGroup });
    });
  }

  submitGroup = () => {
    let tempGroup = this.state.groups;
    tempGroup.push(newGroup);
    this.setState(
      {
        groups: tempGroup,
        groupForm: null,
        [newGroup + "Tasks"]: ["none"]
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
            <Input
              onChange={e => {
                this.handleGroupChange(e, "name");
              }}
            />
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
        <TaskManager {...this.state} />
        <Button onClick={this.addGroupForm}>Add Group</Button>
        <div>{this.state.groupForm}</div>
      </div>
    );
  }
}

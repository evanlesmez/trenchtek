import React, { Component } from "react";
import { Button, Collapse, Form, Input, Checkbox } from "antd";
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
      checkForm: [],
      tasks: []
    };
  }

  checkChange = () => {
    this.setState({ checkForm: null });
  };

  handleTaskChange = e => {
    newTask = e.target.value;
  };

  setTasksToFirebase = group => {
    taskRef.child(group).set(this.state.tasks);
  };

  submitTask = group => {
    let tempTask = this.state.tasks;
    tempTask.push(newTask);
    this.setState({ tasks: tempTask }, this.setTasksToFirebase(group));
  };

  addTaskForm = group => {
    let tempTask = this.state.checkForm;
    tempTask.push(
      <Checkbox onChange={this.checkChange}>
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
      </Checkbox>
    );
    this.setState({
      checkForm: tempTask
    });
  };

  render() {
    return (
      <div>
        {this.props.groups.map(group => {
          return (
            <Collapse className="challenge-collapse">
              <Panel header={group}>
                <Checkbox onChange={this.checkChange}>Checkbox</Checkbox>
                <Button onClick={this.addTaskForm}>Add Task</Button>
              </Panel>
            </Collapse>
          );
        })}
        <div>{this.state.checkForm}</div>
      </div>
    );
  }
}

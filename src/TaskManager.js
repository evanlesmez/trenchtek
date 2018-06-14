import React, { Component } from "react";
import TopbarUser from "./TopbarUser.js";
import { List, Button, Collapse, Form, Input } from "antd";
import firebase from "./Firebase.js";

const data = ["personal", "group1", "group2"];
const taskRef = firebase.database().ref("tasks");
const Panel = Collapse.Panel;
const FormItem = Form.Item;

//const personalTasks = ["sleep", "eat", "shower"];
const groupTasks = ["think", "code", "react"];
let newGroup = null;

export default class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      groups: ["personal", "group1", "group2"],
      groupForm: null,
      personalTasks: ["sleep", "eat", "shower"],
      group1Tasks: ["hello", "we", "code"],
      group2Tasks: ["in", "react", "framework"]
    };
  }

  componentDidMount() {
    //data.map(group => taskRef.child(group).set(personalTasks));
    //taskRef.push(tasks);
    //tasks.map(task => taskRef.push(task));
  }

  handleClick = group => {
    this.setState({ trial: "trial" });
    taskRef.on("value", snapshot => {
      let tasks = snapshot.val();
      for (let task in tasks) {
        if (task === group) {
          //console.log(task);
        }
      }
    });
  };

  submitGroup = e => {
    //this.setState({ [newGroup + "Tasks"]: ["no tasks yet"] });
    let tempGroup = this.state.groups;
    tempGroup.push(newGroup);
    this.setState({
      groups: tempGroup,
      groupForm: null,
      [newGroup + "Tasks"]: ["no tasks yet"]
    });
    newGroup = null;
    this.addGroupsToFirebase();
  };

  addGroupsToFirebase = () => {
    this.state.groups.map(group => {
      taskRef.child(group).set(this.state[group + "Tasks"]);
    });
  };

  handleGroupChange = e => {
    newGroup = e.target.value;
    //this.setState({ [newGroup + "Tasks"]: ["no tasks yet"] });
    //console.log(this.state);
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
    console.log(this.state);
    return (
      <div>
        <TopbarUser />
        {/* <Collapse className="challenge-collapse">
          <Panel header={item.name}>
            details: {item.details}
            duedate: {item.duedate}
          </Panel>
        </Collapse> */}
        <List
          bordered
          dataSource={data}
          renderItem={item => (
            <List.Item
              onClick={() => {
                this.handleClick(item);
              }}
            >
              {item}
            </List.Item>
          )}
        />
        <Button onClick={this.addGroupForm}>Add Group</Button>
        <div>{this.state.groupForm}</div>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Button, Form, Input, Card } from "antd";
import firebase from "./Firebase.js";
import TaskManager from "./TaskManager";

const groupRef = firebase.database().ref("groups");
const FormItem = Form.Item;
let newGroup = null;
let newUsers = null;
let started = false;

export default class AddGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      groupForm: null
    };
  }

  componentDidMount() {
    groupRef.on("value", snapshot => {
      let groups = snapshot.val();
      let tempGroup = [];
      for (let group in groups) {
        tempGroup.push(group);
        groupRef
          .child(group)
          .child("tasks")
          .on("value", snapshot => {
            let tasks = snapshot.val();
            let tempTask = [];
            for (let task in tasks) {
              tempTask.push(tasks[task]);
            }
            this.setState({ [group + "Tasks"]: tempTask });
          });
        groupRef
          .child(group)
          .child("users")
          .on("value", snapshot => {
            let users = snapshot.val();
            let tempUser = [];
            for (let user in users) {
              tempUser.push(users[user]);
            }
            this.setState({ [group + "Users"]: tempUser });
          });
      }
      this.setState(
        { groups: tempGroup }
        // , () => {
        // let tempCard = [];
        // let tasks = [];
        // this.state.groups.map(group => {
        //   tempCard = [];
        //   tasks = this.state[group + "Tasks"];
        //   tasks.map((task, index) => {
        //     tempCard.push(
        //       <Card style={{ marginTop: 16 }} type="inner" title={task}>
        //         {task} content
        //         <Button
        //           style={{ marginTop: 16 }}
        //           onClick={() => this.deleteTask(group, index)}
        //         >
        //           Delete Task
        //         </Button>
        //       </Card>
        //     );
        //   });
        //   this.setState(
        //     { [group + "Cards"]: tempCard },
        //     () => {
        //       started = true;
        //     } //, () => {this.forceUpdate(); }
        //   );}
      );
    });
    //});
  }

  setTasks = (group, update) => {
    groupRef
      .child(group)
      .child("tasks")
      .set(update);
    this.setState({ [group + "Tasks"]: update });
  };

  deleteGroup = group => {
    groupRef.child(group).remove();
  };

  deleteTask = (group, index) => {
    groupRef
      .child(group)
      .child("tasks")
      .child(index)
      .remove();
  };

  submitGroup = () => {
    let tempGroup = this.state.groups;
    tempGroup.push(newGroup);
    this.setState(
      {
        groups: tempGroup,
        groupForm: null,
        [newGroup + "Tasks"]: ["none"],
        [newGroup + "Cards"]: [null],
        [newGroup + "Users"]: newUsers
      }
      // () => {
      //   console.log(this.state[newGroup + "Users"]);
      //   console.log(this.state);
      // }
    );
    groupRef
      .child(newGroup)
      .child("tasks")
      .set(["none"]);
    groupRef
      .child(newGroup)
      .child("users")
      .set(newUsers);
    newGroup = null;
    newUsers = null;
  };

  submitPersonal = () => {
    let tempGroup = this.state.groups;
    tempGroup.push("Personal");
    this.setState({
      groups: tempGroup,
      ["PersonalTasks"]: ["none"],
      ["PersonalCards"]: [null],
      ["PersonalUsers"]: ["none"]
    });
    groupRef
      .child("Personal")
      .child("tasks")
      .set(["none"]);
    groupRef
      .child("Personal")
      .child("users")
      .set(["none"]);
  };

  handleGroupChange = e => {
    newGroup = e.target.value;
  };

  handleUserChange = e => {
    let temp = e.target.value;
    newUsers = temp.split(", ");
  };

  addGroupForm = () => {
    this.setState({
      groupForm: (
        <Form onSubmit={this.submitGroup}>
          <FormItem label="new group name">
            <Input onChange={this.handleGroupChange} />
          </FormItem>
          <FormItem label="new users emails">
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

  render() {
    return (
      <div>
        <TaskManager
          {...this.state}
          setTasks={this.setTasks}
          deleteGroup={this.deleteGroup}
          started={started}
          deleteTask={this.deleteTask}
        />
        <Button
          onClick={this.addGroupForm}
          style={{ marginLeft: 25, marginTop: 10 }}
        >
          Add Group
        </Button>
        <Button
          onClick={this.submitPersonal}
          style={{ marginLeft: 25, marginTop: 10 }}
        >
          Add Personal
        </Button>
        <div>{this.state.groupForm}</div>
      </div>
    );
  }
}

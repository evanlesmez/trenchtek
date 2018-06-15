import React, { Component } from "react";
import firebase from "./Firebase.js";
import { Collapse, Button, Form, Input, DatePicker, Icon } from "antd";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const chalRef = firebase.database().ref("challenges");
const Panel = Collapse.Panel;
const FormItem = Form.Item;

export default class Challenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      name: "",
      details: "",
      duedate: "",
      isAdd: false
    };
  }

  componentDidMount() {
    chalRef.on("value", snapshot => {
      let challengest = [];
      snapshot.forEach(child => {
        let namet = child.val().name;
        let detailst = child.val().details;
        let duedatet = child.val().duedate;
        let key = child.key;
        challengest.push({
          name: namet,
          details: detailst,
          duedate: duedatet,
          id: key
        });
      });
      this.setState({ challenges: challengest });
    });
  }
  addDate = (date, dateString) => {
    this.setState({
      duedate: dateString
    });
  };
  addChal = e => {
    e.preventDefault;
    this.setState({ isAdd: true });
  };

  submitChal = e => {
    console.log(this.state);
    e.preventDefault();
    let obj = {
      name: this.state.name,
      details: this.state.details,
      duedate: this.state.duedate
    };
    let newPostKey = chalRef.child(this.state.name).push().key;
    let updates = {};
    updates[newPostKey] = obj;
    this.setState({ name: "", details: "", duedate: "", isAdd: false });
    return chalRef.update(updates);
  };

  handleChange = (e, label) => {
    this.setState({ [label]: e.target.value });
    console.log(this.state);
  };

  deletechal = item => {
    console.log(item);
    console.log(chalRef.child(item.id));
    chalRef.child(item.id).remove();
  };

  render() {
    if (this.state.isAdd) {
      return (
        <div>
          <div>
            All challenges:
            {this.state.challenges.map(item => {
              return (
                <Collapse>
                  <Panel header={item.name}>
                    details: {item.details}
                    duedate: {item.duedate}
                  </Panel>
                </Collapse>
              );
            })}
          </div>
          <Button onClick={this.addChal}>Add Challenge</Button>
          <Form onSubmit={this.submitChal}>
            <FormItem label="name">
              <Input
                onChange={e => {
                  this.handleChange(e, "name");
                }}
              />
            </FormItem>
            <FormItem label="details">
              <Input
                onChange={e => {
                  this.handleChange(e, "details");
                }}
              />
            </FormItem>
            <FormItem label="duedate">
              <DatePicker
                onChange={(date, dateString) => this.addDate(date, dateString)}
              />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Form>
        </div>
      );
    }
    return (
      <div>
        <div>
          All challenges:
          {this.state.challenges.map(item => {
            return (
              <Collapse>
                <Panel
                  header={
                    <div>
                      {" "}
                      {item.name}{" "}
                      <Button onClick={() => this.deletechal(item)}>
                        <Icon type="delete" />
                      </Button>
                    </div>
                  }
                >
                  details: {item.details}
                  duedate: {item.duedate}
                </Panel>
              </Collapse>
            );
          })}
        </div>
        <Button onClick={this.addChal}>Add Challenge</Button>
      </div>
    );
  }
}

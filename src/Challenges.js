import React, { Component } from "react";
import firebase from "./Firebase.js";
import { Collapse, Button, Form, Input, DatePicker, Icon, Card } from "antd";
import "./App.css";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const chalRef = firebase.database().ref("challenges");
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const { TextArea } = Input;

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
      console.log(challengest);
      challengest.sort(function(b, a) {
        return (
          parseInt(b.duedate.split(/-/i).join("")) -
          parseInt(a.duedate.split(/-/i).join(""))
        );
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

  cancelbut = e => {
    e.preventDefault;
    this.setState({ isAdd: false });
  };
  submitChal = e => {
    //console.log(this.state);
    e.preventDefault();
    let obj = {
      name: this.state.name,
      details: this.state.details,
      duedate: this.state.duedate
    };
    let newPostKey = chalRef.push().key;
    let updates = {};
    updates[newPostKey] = obj;
    this.setState({ name: "", details: "", duedate: "", isAdd: false });
    return chalRef.update(updates);
  };

  handleChange = (e, label) => {
    this.setState({ [label]: e.target.value });
    //console.log(this.state);
  };

  deletechal = (e, id, name) => {
    e.preventDefault();
    const challengeToDelete = firebase.database().ref(`/challenges/${id}`);
    if (
      window.confirm(`Are you sure you want to delete the challenge: ${name}?`)
    ) {
      challengeToDelete.remove();
    }
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 6 }
      },
      WrapperCol: {
        xs: { span: 1 },
        sm: { span: 1 }
      }
    };
    if (this.state.isAdd) {
      return (
        <div>
          <br />
          <br />
          <center>
            <Card title="Add Challenge" style={{ width: 600 }}>
              <Form onSubmit={this.submitChal}>
                <center>
                  <FormItem {...formItemLayout} label="Name">
                    <div className="input">
                      <Input
                        onChange={e => {
                          this.handleChange(e, "name");
                        }}
                      />
                    </div>
                  </FormItem>
                  <FormItem {...formItemLayout} label="Details">
                    <div className="input">
                      <TextArea
                        rows={8}
                        onChange={e => {
                          this.handleChange(e, "details");
                        }}
                      />
                    </div>
                  </FormItem>
                  <FormItem {...formItemLayout} label="Due Date">
                    <div className="input">
                      <DatePicker
                        onChange={(date, dateString) =>
                          this.addDate(date, dateString)
                        }
                      />
                    </div>
                  </FormItem>
                  <FormItem>
                    <div>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                      {"              "}
                      <Button onClick={this.cancelbut}>Cancel</Button>
                    </div>
                  </FormItem>
                </center>
              </Form>
            </Card>
          </center>
        </div>
      );
    }
    return (
      <div>
        <br />
        <br />
        <center>
          <Card title="Challenges" style={{ width: "85%" }}>
            <div>
              {this.state.challenges.map(item => {
                return (
                  <div>
                    <br />
                    <Collapse>
                      <Panel
                        header={
                          <div className="panelheader">
                            {" "}
                            {item.name}
                            <div className="chaldelete">
                              Due: {item.duedate} {"     "}
                              <Button
                                size="small"
                                onClick={e =>
                                  this.deletechal(e, item.id, item.name)
                                }
                              >
                                <Icon type="delete" />
                              </Button>
                            </div>
                          </div>
                        }
                      >
                        <div className="chalinfo">
                          <p id="chalbold">Details: </p>
                          {item.details}
                        </div>
                        <br />
                        <div className="chalinfo">
                          <p id="chalbold">Due date: </p>
                          {item.duedate}
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                );
              })}
            </div>
            <br />
            <Button
              size="large"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={this.addChal}
            />
          </Card>
        </center>
      </div>
    );
  }
}

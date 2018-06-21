import React, { Component } from "react";
import firebase from "./Firebase.js";
import { Collapse, Button, Form, Input, DatePicker, Icon, Card } from "antd";
import "./App.css";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const chalRef = firebase.database().ref("challenges");
const activeRef = firebase.database().ref("challenges/ative");
const pastRef = firebase.database().ref("challenges/completed");
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
      isAdd: false,
      userTitle: props.userTitle,
      gitRepo: "",
      submitchal: false,
      itemToSubmit: "",
      nameOfUser: "",
      url: "",
      comments: "",
      submissions: [],
      submissionsToView: [],
      viewSubmissions: false,
      indexToView: ""
    };
  }

  componentDidMount() {
    chalRef.on("value", snapshot => {
      let challengest = [];
      snapshot.forEach(child => {
        let namet = child.val().name;
        let detailst = child.val().details;
        let duedatet = child.val().duedate;
        let submissions = child.val().submissions;
        let key = child.key;
        challengest.push({
          name: namet,
          details: detailst,
          duedate: duedatet,
          id: key,
          submissions: submissions
        });
      });
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
    this.setState({ isAdd: false, submitchal: false, viewSubmissions: false });
  };

  submitChal = e => {
    e.preventDefault();
    let obj = {
      name: this.state.name,
      details: this.state.details,
      duedate: this.state.duedate,
      submissions: [" "]
    };
    let newPostKey = chalRef.push().key;
    let updates = {};
    updates[newPostKey] = obj;
    this.setState({ name: "", details: "", duedate: "" });
    alert("Challenge submitted!");
    return chalRef.update(updates);
  };

  handleChange = (e, label) => {
    this.setState({ [label]: e.target.value });
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
  addSubmit = item => {
    this.setState({
      ...this.state,
      submitchal: true,
      itemToSubmit: item
    });
  };

  userSubmit = e => {
    e.preventDefault();
    let array = this.state.itemToSubmit.submissions;
    let obj = {
      userName: this.state.nameOfUser,
      github: this.state.url,
      comments: this.state.comments
    };
    array.push(obj);
    firebase
      .database()
      .ref("challenges/" + this.state.itemToSubmit.id)
      .child("submissions")
      .set(array);
    this.setState({
      nameOfUser: "",
      url: "",
      comments: "",
      itemToSubmit: ""
    });
    alert("Challenge submitted!");
  };
  viewSubmit = (item, index) => {
    let view = [];
    firebase
      .database()
      .ref("challenges/" + item.id)
      .on("value", snapshot => {
        view = snapshot.val().submissions;
      });
    this.setState({
      submissionsToView: view,
      viewSubmissions: true,
      indexToView: index
    });
  };
  render() {
    console.log(this.state);
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
    if (this.state.viewSubmissions) {
      return (
        <div>
          <br />
          <center>
            <Card
              title={
                "Submissions for Challenge: " +
                this.state.challenges[this.state.indexToView].name
              }
              style={{ width: "85%" }}
            >
              <div>
                {this.state.submissionsToView.map((submission, index) => {
                  if (index != 0) {
                    return (
                      <div>
                        <Card>
                          <p>Name: {submission.userName}</p>
                          <p>Comments: {submission.comments}</p>
                          <a href={submission.github}>Github Repo</a>
                        </Card>
                        <br />
                      </div>
                    );
                  }
                })}
              </div>
            </Card>
            <br />
            <Button onClick={this.cancelbut}>Cancel</Button>
          </center>
        </div>
      );
    }
    if (this.state.submitchal) {
      return (
        <div>
          <br />
          <center>
            <Card
              title={"Submit Challenge - " + this.state.itemToSubmit.name}
              style={{ width: 600 }}
            >
              <Form onSubmit={this.submitChal}>
                <center>
                  <FormItem {...formItemLayout} label="Name">
                    <div className="input">
                      <Input
                        value={this.state.nameOfUser}
                        onChange={e => {
                          this.handleChange(e, "nameOfUser");
                        }}
                      />
                    </div>
                  </FormItem>
                  <FormItem {...formItemLayout} label="Link to GIT Repo">
                    <div className="input">
                      <Input
                        value={this.state.url}
                        onChange={e => {
                          this.handleChange(e, "url");
                        }}
                      />
                    </div>
                  </FormItem>
                  <FormItem {...formItemLayout} label="Comments">
                    <div className="input">
                      <TextArea
                        value={this.state.comments}
                        rows={8}
                        onChange={e => {
                          this.handleChange(e, "comments");
                        }}
                      />
                    </div>
                  </FormItem>
                  <FormItem>
                    <div>
                      <Button
                        onClick={e => {
                          this.userSubmit(e);
                        }}
                        type="primary"
                        htmlType="submit"
                      >
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
    if (this.state.isAdd) {
      return (
        <div>
          <br />
          <center>
            <Card title="Add Challenge" style={{ width: 600 }}>
              <Form onSubmit={this.submitChal}>
                <center>
                  <FormItem {...formItemLayout} label="Name">
                    <div className="input">
                      <Input
                        value={this.state.name}
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
                        value={this.state.details}
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
        <center>
          <div class="directory-title">Challenges</div>

          <div>
            {this.state.challenges.map((item, index) => {
              return (
                <div>
                  <br />
                  <Collapse style={{ width: "85%" }}>
                    <Panel
                      header={
                        <div className="panelheader">
                          {" "}
                          {item.name}
                          <div className="chaldelete">
                            Due: {item.duedate} {"     "}
                            {this.state.userTitle === "Admin" ? (
                              <Button
                                size="small"
                                onClick={e =>
                                  this.deletechal(e, item.id, item.name)
                                }
                              >
                                <Icon type="delete" />
                              </Button>
                            ) : null}
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
                      <Button onClick={() => this.addSubmit(item)}>
                        Add Submission
                      </Button>
                      <Button onClick={() => this.viewSubmit(item, index)}>
                        View Submissions
                      </Button>
                    </Panel>
                  </Collapse>
                </div>
              );
            })}
          </div>
          <br />
          {this.state.userTitle === "Admin" ? (
            <Button
              size="large"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={this.addChal}
            />
          ) : null}
        </center>
      </div>
    );
  }
}

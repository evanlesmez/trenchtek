import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Icon, Card } from "antd";
import "./App.css";
import firebase from "./Firebase.js";

export default class SubmitContracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      jobType: "",
      jobTimeframe: "",
      specialSkills: "",
      additionalDetails: "",
      adminApproved: false
    };
  }

  handleClick = () => {
    let obj = {
      companyName: this.state.companyName,
      jobType: this.state.jobType,
      jobTimeframe: this.state.jobTimeframe,
      specialSkills: this.state.specialSkills,
      additionalDetails: this.state.additionalDetails,
      adminApproved: this.state.adminApproved
    };

    console.log(obj);
    let newPostKey = firebase
      .database()
      .ref("/unapprovedCompanyContracts")
      .push(obj);
    this.setState({
      username: "",
      age: "",
      name: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <center>
          <br />
          <br />
          <Card title="Company Information Form" style={{ width: 450 }}>
            <Form layout="vertical" className="login-form">
              <Form.Item>
                <Input
                  placeholder="Company Name"
                  onChange={e => this.setState({ companyName: e.target.value })}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="Job Type"
                  onChange={e => this.setState({ jobType: e.target.value })}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="Job Timeframe"
                  onChange={e =>
                    this.setState({ jobTimeframe: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="Special Skills"
                  onChange={e =>
                    this.setState({ specialSkills: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="Additional Details"
                  onChange={e =>
                    this.setState({ additionalDetails: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={this.handleClick}
                >
                  Submit Contract
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </center>
      </div>
    );
  }
}

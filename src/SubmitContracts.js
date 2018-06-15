import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Icon, Card } from "antd";
import "./App.css";
import TopbarCompany from "./TopbarCompany";
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
        <TopbarCompany />
        <center>
          <br />
          <br />
          <Card title="Company Information Form" style={{ width: 450 }}>
            <Form layout="vertical" className="login-form">
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Company Name"
                  onChange={e => this.setState({ companyName: e.target.value })}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Job Type"
                  onChange={e => this.setState({ jobType: e.target.value })}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Job Timeframe"
                  onChange={e =>
                    this.setState({ jobTimeframe: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Special Skills"
                  onChange={e =>
                    this.setState({ specialSkills: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
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
    return <div>Submit Contracts Page</div>;
  }
}

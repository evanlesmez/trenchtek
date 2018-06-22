import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Icon, Card } from "antd";
import "./App.css";
import "./Post.css";
import firebase from "./Firebase.js";

export default class SubmitContracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      companyEmail: "",
      jobTimeframe: "",
      specialSkills: "",
      additionalDetails: "",
      status: ""
    };
  }

  handleClick = () => {
    let obj = {
      companyName: this.state.companyName,
      companyEmail: this.state.companyEmail,
      jobTimeframe: this.state.jobTimeframe,
      specialSkills: this.state.specialSkills,
      additionalDetails: this.state.additionalDetails,
      status: "pending"
    };
    firebase
      .database()
      .ref("pendingCompanyContracts")
      .push(obj);
    this.setState({
      companyName: "",
      companyEmail: "",
      jobTimeframe: "",
      specialSkills: "",
      additionalDetails: "",
      status: ""
    });
    alert(
      "Your contract has been successfully submitted! RevTek administrators will be in touch with you by email to let you know whether your contract has been approved. If you have any questions, please contact help@revtek.com."
    );
  };

  render() {
    return (
      <div className="background2">
        <center>
          <div class="directory-title">Submit Contract</div>
          <Card title="Company Information Form" style={{ width: 600 }}>
            <Form layout="vertical" className="login-form">
              <Form.Item label="Company Name:">
                <Input
                  onChange={e => this.setState({ companyName: e.target.value })}
                  value={this.state.companyName}
                />
              </Form.Item>
              <Form.Item label="Job Timeframe (e.g. &quot;2 weeks&quot;):">
                <Input
                  onChange={e =>
                    this.setState({ jobTimeframe: e.target.value })
                  }
                  value={this.state.jobTimeframe}
                />
              </Form.Item>
              <Form.Item label="Special Skills Required (e.g. &quot;Python&quot;):">
                <Input
                  onChange={e =>
                    this.setState({ specialSkills: e.target.value })
                  }
                  value={this.state.specialSkills}
                />
              </Form.Item>
              <Form.Item label="Details:">
                <Input.TextArea
                  onChange={e =>
                    this.setState({ additionalDetails: e.target.value })
                  }
                  value={this.state.additionalDetails}
                  rows={8}
                />
              </Form.Item>
              <Form.Item label="Email Address to Contact:">
                <Input
                  onChange={e =>
                    this.setState({ companyEmail: e.target.value })
                  }
                  value={this.state.companyEmail}
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
        <br />
        <br />
      </div>
    );
  }
}

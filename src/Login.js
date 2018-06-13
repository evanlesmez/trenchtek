import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Icon, Card } from "antd";
import "./App.css";

export default class Login extends Component {
  render() {
    return (
      <div>
        <center>
          <br />
          <Card title="Sign in" style={{ width: 450 }}>
            <Form layout="vertical" className="login-form">
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Sign in
                </Button>
                <br />
                <br />
                Or <Link to="">register now!</Link>
              </Form.Item>
            </Form>
          </Card>
          <br />
          <Link to="/profile">Click me to log in!!!</Link>
        </center>
      </div>
    );
  }
}

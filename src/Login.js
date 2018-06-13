import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Icon, Card } from "antd";
import "./App.css";
import TopbarCompany from "./TopbarCompany";
import firebase from "./Firebase.js";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginSuccessful: false
    };
  }

  componentDidMount() {
    this.checkUser();
  }

  handleClick = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        alert(
          "The email address and/or password you entered was incorrect. Please try again."
        );
      });
    this.checkUser();
  };

  checkUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.setState({
          loginSuccessful: true
        });
      } else {
        this.setState({
          loginSuccessful: false
        });
      }
    });
  };

  checkUser;

  render() {
    if (this.state.loginSuccessful) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        <TopbarCompany />
        <center>
          <br />
          <br />
          <Card title="Sign in" style={{ width: 450 }}>
            <Form layout="vertical" className="login-form">
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={this.handleClick}
                >
                  Sign in
                </Button>
                <br />
                <br />
                Or <Link to="">register now!</Link>
              </Form.Item>
            </Form>
          </Card>
        </center>
      </div>
    );
  }
}

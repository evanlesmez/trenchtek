import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Icon, Card } from "antd";
import "./App.css";
import "./Post.css";
import Type from "./Type.js";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import firebase from "./Firebase.js";

class Login extends Component {
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
    this.checkUser2();
  };
  checkUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      let exists = true;
      if (user !== null) {
        firebase
          .database()
          .ref("/users")
          .child(user.uid)
          .once("value", snapshot => {
            exists = snapshot.val().approved === true;
          })
          .then(() => {
            if (exists === false) {
              firebase.auth().signOut();
              this.setState({
                email: "",
                password: ""
              });
            } else {
              this.setState({
                loginSuccessful: true
              });
            }
          });
      } else {
        this.setState({
          loginSuccessful: false
        });
      }
    });
  };
  checkUser2 = () => {
    firebase.auth().onAuthStateChanged(user => {
      let removed = false;
      let accepted = false;
      if (user !== null) {
        firebase
          .database()
          .ref("/users")
          .child(user.uid)
          .once("value", snapshot => {
            removed = snapshot.val().approved === "removed";
            accepted = snapshot.val().approved === true;
          })
          .then(() => {
            if (removed === true) {
              alert("The user may have been removed.");
              firebase.auth().signOut();
              this.setState({
                email: "",
                password: ""
              });
            } else if (!accepted) {
              alert("Please wait for your registration to be approved.");
              firebase.auth().signOut();
              this.setState({
                email: "",
                password: ""
              });
            } else {
              this.setState({
                loginSuccessful: true
              });
            }
          });
      } else {
        this.setState({
          loginSuccessful: false
        });
      }
    });
  };

  render() {
    if (this.state.loginSuccessful) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        <br />
        <center>
          <Fade bottom>
            <Link to="/" className="redirect-to-home-logo-button">
              RevTek
            </Link>
          </Fade>
          <Fade>
            <Card title="Sign in" style={{ width: 450 }}>
              <Form layout="vertical" className="login-form">
                <Form.Item>
                  <Input
                    value={this.state.email}
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Email"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    value={this.state.password}
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
                    ghost
                  >
                    Sign in
                  </Button>
                  <br />
                  <br />
                  Or <Link to="/register">register now!</Link>
                </Form.Item>
              </Form>
            </Card>
          </Fade>
        </center>
      </div>
    );
  }
}

export default Form.create()(Login);

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Icon, Input, Button, Checkbox, Tooltip, Radio } from "antd";
import { Link } from "react-router-dom";
import { auth, logout } from "./Auth";
import firebase from "./Firebase";
import "./App.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      title: "",
      name: "",
      confirmDirty: false
    };
  }

  updateField = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    console.log(this.state);
    console.log(value);
    console.log(form.getFieldValue("password"));
    if (value !== this.state.password) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleSubmit = () => {
    console.log("hey");
    auth(this.state.email, this.state.password)
      .then(user => {
        if (user) {
          let userID = user.user.uid;
          let obj = {
            email: this.state.email,
            title: this.state.title,
            name: this.state.name,
            image: "",
            tags: "",
            about: "",
            upvotes: ""
          };
          let newPostKey = firebase
            .database()
            .ref("/users/" + userID)
            .set(obj);
          this.setState({
            email: "",
            password: "",
            title: "",
            name: "",
            confirmDirty: false
          });
          alert("Registration successful. Please login.");
          logout();
        }
      })
      .catch(error => {
        alert("Registration error: " + error.message);
      });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      WrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    console.log(this.state);
    return (
      <div>
        <Form layout>
          <Form.Item {...formItemLayout} label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(
              <Input
                onChange={e => this.updateField("email", e.target.value)}
                value={this.state.email}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Password">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input
                type="password"
                onChange={e => this.updateField("password", e.target.value)}
                value={this.state.password}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Confirm Password">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input
                type="password"
                value={this.state.password2}
                onBlur={this.handleConfirmBlur}
                onChange={e => this.updateField("password2", e.target.value)}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Full Name">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please input your name!"
                }
              ]
            })(
              <Input
                value={this.state.name}
                onChange={e => this.updateField("name", e.target.value)}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Title">
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Please select your title"
                }
              ]
            })(
              <Radio.Group
                onChange={e => this.updateField("title", e.target.value)}
                value={this.state.title}
              >
                <Radio value="intern">Intern</Radio>
                <Radio value="alumni">Alumni</Radio>
                <Radio value="admin">Administrator</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => this.handleSubmit()}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Register);

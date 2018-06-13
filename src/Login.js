import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from "react-router-dom";
import "./App.css"

class Login extends Component {
  render() {
    const {getFieldDecorator}=this.props.form;
      return (
      <div id = 'app'>
        <Form layout = "vertical">
          <Form.Item>
            
          </Form.Item>
        </Form>
        Login Page
        <br />
        <Link to="/profile">Click me to log in!!!</Link>
      </div>
    );
  }
}

export default Form.create()(Login);


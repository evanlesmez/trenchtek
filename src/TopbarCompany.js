import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import "./App.css";

export default class TopbarCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: ""
    };
  }
  render() {
    return (
      <div>
        <Menu
          mode="horizontal"
          classname="navbar"
          defaultSelectedKeys="welcome"
        >
          <Menu.Item key="welcome">
            <Link to="/">
              <div className="logo-button">RevTek</div>
            </Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">
              <div className="topbar-tab">about</div>
            </Link>
          </Menu.Item>
          <Menu.Item key="meet-the-team">
            <Link to="/meet-the-team">
              <div className="topbar-tab">meet the team</div>
            </Link>
          </Menu.Item>
          <Menu.Item key="submit-contracts">
            <Link to="/submit-contracts">
              <div className="topbar-tab">submit contracts</div>
            </Link>
          </Menu.Item>
          <Button
            className="login-logout-button"
            onClick={this.handleLoginClick}
            type="primary"
            ghost
          >
            <Link to="/login">
              <div className="topbar-tab">member login</div>
            </Link>
          </Button>
        </Menu>
      </div>
    );
  }
}

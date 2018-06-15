import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import "./App.css";

export default class TopbarUser extends Component {
  render() {
    return (
      <div>
        <Menu mode="horizontal" defaultSelectedKeys="profile">
          <Menu.Item key="profile">
            <Link to="/profile">
              <div className="topbar-tab">profile</div>
            </Link>
          </Menu.Item>
          <Menu.Item key="challenges">
            <Link to="/challenges">
              <div className="topbar-tab">challenges</div>
            </Link>
          </Menu.Item>
          <Menu.Item key="task-manager">
            <Link to="/task-manager">
              <div className="topbar-tab">task manager</div>
            </Link>
          </Menu.Item>
          <Menu.Item key="browse-contracts">
            <Link to="/browse-contracts">
              <div className="topbar-tab">contracts</div>
            </Link>
          </Menu.Item>
          <Menu.Item key="connect">
            <Link to="/connect">
              <div className="topbar-tab">connect</div>
            </Link>
          </Menu.Item>
          <Menu.Item key="resources">
            <Link to="/resources">
              <div className="topbar-tab">resources</div>
            </Link>
          </Menu.Item>

          <Button className="login-logout-button" type="danger" ghost>
            <Link to="/logout">
              <div className="topbar-tab">logout</div>
            </Link>
          </Button>
        </Menu>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import "./Topbar.css";
import "antd/dist/antd.css";

export default class TopbarUser extends Component {
  render() {
  if(true){
    return (
      <div>
        <Menu mode="horizontal">
          <Menu.Item key="tasks">
            <Link to="/tasks">tasks</Link>
          </Menu.Item>
          <Menu.Item key="browse-contracts">
            <Link to="/browse-contracts">contracts</Link>
          </Menu.Item>
          <Menu.Item key="connect">
            <Link to="/connect">connect</Link>
          </Menu.Item>
          <Menu.Item key="resources">
            <Link to="/resources">resources</Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link to="/profile">profile</Link>
          </Menu.Item>
          <Menu.Item key="admin">
            <Link to="/admin">admin</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  } else {
    return (
      <div>
        <Menu mode="horizontal">
          <Menu.Item key="tasks">
            <Link to="/tasks">tasks</Link>
          </Menu.Item>
          <Menu.Item key="browse-contracts">
            <Link to="/browse-contracts">contracts</Link>
          </Menu.Item>
          <Menu.Item key="connect">
            <Link to="/connect">connect</Link>
          </Menu.Item>
          <Menu.Item key="resources">
            <Link to="/resources">resources</Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link to="/profile">profile</Link>
          </Menu.Item>
        </Menu>
      </div>
    );

  }
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import "./Topbar.css";
import "antd/dist/antd.css";

export default class TopbarCompany extends Component {
  render() {
    return (
      <div>
        <Menu mode="horizontal">
          <Menu.Item key="about">
            <Link to="/about">about</Link>
          </Menu.Item>
          <Menu.Item key="meet-the-team">
            <Link to="/meet-the-team">meet the team</Link>
          </Menu.Item>
          <Menu.Item key="submit-contracts">
            <Link to="/submit-contracts">submit contracts</Link>
          </Menu.Item>
          <Menu.Item key="login">
            <Link to="/login">members login</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

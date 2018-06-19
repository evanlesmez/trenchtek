import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Button, Dropdown, Icon } from "antd";
import "./App.css";

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/q&a">
        <div className="topbar-tab">Q&A</div>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/directory">
        <div className="topbar-tab">Directory</div>
      </Link>
    </Menu.Item>
  </Menu>
);

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTitle: props.userTitle
    };
  }

  componentDidMount() {
    this.setState({
      userTitle: this.props.userTitle
    });
  }

  render() {
    let currentPage;
    if (
      this.props.history.location.pathname === "/q&a" ||
      this.props.history.location.pathname === "/directory"
    ) {
      currentPage = "/connect";
    } else {
      currentPage = this.props.history.location.pathname;
    }
    return (
      <div>
        <Menu mode="horizontal" defaultSelectedKeys={currentPage}>
          <Menu.Item key="/profile">
            <Link to="/profile">profile</Link>
          </Menu.Item>
          <Menu.Item key="/challenges">
            <Link to="/challenges">
              <div className="topbar-tab">challenges</div>
            </Link>
          </Menu.Item>
          <Menu.Item key="/task-manager">
            <Link to="/task-manager">task manager</Link>
          </Menu.Item>
          <Menu.Item key="/browse-contracts">
            <Link to="/browse-contracts">contracts</Link>
          </Menu.Item>
          <Menu.Item key="/connect">
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                connect <Icon type="down" />
              </a>
            </Dropdown>
          </Menu.Item>
          <Menu.Item key="/resources">
            <Link to="/resources">resources</Link>
          </Menu.Item>
          {this.state.userTitle === "admin" ? (
            <Menu.Item key="/admin">
              <Link to="/admin">admin</Link>
            </Menu.Item>
          ) : null}
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

export default withRouter(TopbarUser);

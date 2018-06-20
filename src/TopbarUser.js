import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Button } from "antd";
import "./App.css";

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
    return (
      <div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={this.props.history.location.pathname}
        >
          <Menu.Item key="/profile">
            <Link to="/profile">
              <div className="topbar-tab">profile</div>
            </Link>
          </Menu.Item>
          <Menu.SubMenu
            title={<div className="topbar-tab">interns</div>}
            key="/interns"
          >
            <Menu.Item key="/challenges">
              <Link to="/challenges">
                <div className="topbar-tab">challenges</div>
              </Link>
            </Menu.Item>
            <Menu.Item key="/resources">
              <Link to="/resources">
                <div className="topbar-tab">resources</div>
              </Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key="/task-manager">
            <Link to="/task-manager">
              <div className="topbar-tab">task manager</div>
            </Link>
          </Menu.Item>
          <Menu.Item key="/browse-contracts">
            <Link to="/browse-contracts">
              <div className="topbar-tab">contracts</div>
            </Link>
          </Menu.Item>
          <Menu.SubMenu
            title={<div className="topbar-tab">connect</div>}
            key="/connect"
          >
            <Menu.Item key="/q&a">
              <Link to="/q&a">
                <div className="topbar-tab">Q&A</div>
              </Link>
            </Menu.Item>
            <Menu.Item key="/directory">
              <Link to="/directory">
                <div className="topbar-tab">directory</div>
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            title={<div className="topbar-tab">admin</div>}
            key="/admin"
          >
            <Menu.Item key="/manage-contracts">
              <Link to="/manage-contracts">
                <div className="topbar-tab">manage contracts</div>
              </Link>
            </Menu.Item>
            <Menu.Item key="/manage-users">
              <Link to="/manage-users">
                <div className="topbar-tab">manage users</div>
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
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

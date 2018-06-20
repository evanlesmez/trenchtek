import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Button } from "antd";
import "./App.css";
import firebase from "./Firebase.js"

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTitle: "",
      uidString: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let userKey = user.uid;
        let userIDString = "/users/" + userKey;
        let database = firebase.database().ref(userIDString);
        //console.log(userIDString);
        database.on("value", snapshot => {
          //console.log(snapshot.val());
          let newTitleState = snapshot.val().title;
          //console.log(newTitleState);

          this.setState({
            userTitle: newTitleState,
            uidString: userIDString
          });
          //console.log(this.state);
        });
        this.setState({ loginSuccessful: true });
        // User is signed in.
      } else {
        //console.log("no user found");

        this.setState({ loginSuccessful: false });
        // No user is signed in.
      }
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
          <Menu.Item key="/resources">
            <Link to="/resources">
              <div className="topbar-tab">resources</div>
            </Link>
          </Menu.Item>


          {this.state.userTitle === "Admin" ? (
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

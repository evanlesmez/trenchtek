import React, { Component } from "react";
import firebase from "./Firebase";
import "./Post.css";
import {
  Collapse,
  Button,
  Form,
  Input,
  DatePicker,
  Icon,
  Card,
  Select,
  Radio,
  InputNumber,
  Tag
} from "antd";

// Allows the administrators to view all the registered users
const Option = Select.Option;
const children = [];
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unapprovedUsers: [],
      approvedUsers: [],
      allUsers: [],
      removedUsers: [],
      display: "unapprovedUsers",
      edit: false,
      editUser: "",
      editName: "",
      editEmail: "",
      editTitle: "",
      editApproved: "",
      editUpvotes: "",
      editTags: [],
      editKey: "",
      editAbout: "",
      editImage: ""
    };
    this.inputData();
  }
  componentDidMount() {
    this.pullingUsers();
  }
  inputData() {
    let list = [
      "Java",
      "Python",
      "R",
      "Javascript",
      "React",
      "C++",
      "Go",
      "Ruby",
      "RubyOnRails",
      "Entrepreneurship",
      "Arduino",
      "Raspberry pi"
    ];
    for (let i = 0; i < list.length; i++) {
      children.push(<Option key={list[i]}>{list[i]}</Option>);
    }
  }
  updateTagField = value => {
    this.state.editTags = value;
    console.log(value);
  };
  pullingUsers = () => {
    const userRef = firebase.database().ref("/users");
    userRef.on("value", snapshot => {
      let unapprovedUserstemp = [];
      let allUserstemp = [];
      let approvedUserstemp = [];
      let removedUserstemp = [];
      snapshot.forEach(value => {
        let obj = {
          name: value.val().name,
          email: value.val().email,
          title: value.val().title,
          approved: value.val().approved,
          upvotes: value.val().upvotes,
          tags: value.val().tags,
          key: value.key,
          about: value.val().about,
          image: value.val().image
        };
        allUserstemp.push(obj);
        //console.log(value.val());
        if (value.val().approved === false) {
          unapprovedUserstemp.push(obj);
        }
        if (value.val().approved === true) {
          approvedUserstemp.push(obj);
        }
        if (value.val().approved === "removed") {
          removedUserstemp.push(obj);
        }
      });
      this.setState({
        unapprovedUsers: unapprovedUserstemp,
        allUsers: allUserstemp,
        approvedUsers: approvedUserstemp,
        removedUsers: removedUserstemp
      });
    });
  };

  acceptUser = user => {
    const userRef = firebase
      .database()
      .ref("/users/" + user.key)
      .child("approved")
      .set(true);
  };

  deleteUser = (e, user) => {
    e.preventDefault();
    const userToDelete = firebase.database().ref(`/users/${user.key}`);
    if (
      window.confirm(
        `Are you sure you want to reject the registration of: ${user.name}?`
      )
    ) {
      userToDelete.child("approved").set("removed");
    }
  };

  reauth = (e, user) => {
    e.preventDefault();
    const userToRegister = firebase.database().ref(`/users/${user.key}`);
    if (
      window.confirm(
        `Are you sure you want to authenticate the registration of the removed user: ${
          user.name
        }?`
      )
    ) {
      userToRegister.child("approved").set(true);
    }
  };
  handleDisplay = value => {
    this.setState({ display: value });
  };

  editUnapproved = (e, user) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      edit: true,
      editAbout: user.about,
      editUser: user,
      editName: user.name,
      editEmail: user.email,
      editTitle: user.title,
      Approved: user.approved,
      editUpvotes: user.upvotes,
      editTags: user.tags,
      editKey: user.key,
      editImage: user.image
    });
  };

  updateEditUser = (field, value) => {
    this.setState({ [field]: value });
  };

  cancel = () => {
    this.setState({ edit: false });
  };

  submitChanges = () => {
    let edit = {
      about: this.state.editAbout,
      approved: this.state.editApproved,
      email: this.state.editEmail,
      image: this.state.editImage,
      name: this.state.editName,
      tags: this.state.editTags,
      title: this.state.editTitle,
      upvotes: this.state.editUpvotes
    };
    if (window.confirm(`Are you sure you want to submit your changes?`)) {
      firebase
        .database()
        .ref("/users/" + this.state.editKey)
        .set(edit);

      alert("Changes submitted.");
    }
  };
  render() {
    const formItemLayout = {
      labelCol: { xs: { span: 20 }, sm: { span: 6 } },
      WrapperCol: { xs: { span: 1 }, sm: { span: 1 } }
    };
    // edit User Page
    if (this.state.edit) {
      return (
        <div>
          {" "}
          <br />
          <br />
          <center>
            <Card
              title={
                <div className="panelheader2">
                  <center>Edit User: {this.state.editUser.name}</center>
                </div>
              }
              style={{ width: 450 }}
            >
              <Form>
                <center>
                  <Form.Item {...formItemLayout} label="Name">
                    <div className="input">
                      <Input
                        defaultValue={this.state.editName}
                        onChange={e =>
                          this.updateEditUser("editName", e.target.value)
                        }
                      />{" "}
                    </div>
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="Email">
                    <div className="input">
                      <Input
                        defaultValue={this.state.editEmail}
                        onChange={e =>
                          this.updateEditUser("editEmail", e.target.value)
                        }
                      />{" "}
                    </div>
                  </Form.Item>
                  <br />
                  <Form.Item {...formItemLayout} label="About">
                    <div className="input">
                      <Input.TextArea
                        rows={4}
                        defaultValue={this.state.editAbout}
                        onChange={e =>
                          this.updateEditUser("editAbout", e.target.value)
                        }
                      />
                    </div>
                  </Form.Item>
                  <br />
                  <Form.Item {...formItemLayout} label="Upvotes">
                    <div className="input">
                      <InputNumber
                        defaultValue={this.state.editUpvotes}
                        onChange={value =>
                          this.updateEditUser("editUpvotes", value)
                        }
                      />
                    </div>
                  </Form.Item>

                  <Form.Item {...formItemLayout} label="Tags">
                    <div className="input">
                      <Select
                        mode="tags"
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        defaultValue={["React"]}
                        onChange={this.updateTagField}
                      >
                        {children}
                      </Select>
                    </div>
                  </Form.Item>

                  <Form.Item {...formItemLayout} label="Title">
                    <Radio.Group
                      onChange={e =>
                        this.updateEditUser("editTitle", e.target.value)
                      }
                      defaultValue={this.state.editTitle}
                    >
                      <Radio value="Intern">Intern</Radio>
                      <Radio value="Alumni">Alumni</Radio>
                      <Radio value="Admin">Admin</Radio>
                    </Radio.Group>{" "}
                  </Form.Item>
                  <Button type="primary" onClick={this.submitChanges}>
                    Submit Changes
                  </Button>
                  {"  "}
                  <Button onClick={this.cancel}>Cancel</Button>
                </center>
              </Form>
            </Card>
            <br />
          </center>
        </div>
      );
    }
    // returns list of users
    return (
      <div>
        <br />
        <center>
          <div className="selectusers">
            Display:{" "}
            <Select
              defaultValue="unapprovedUsers"
              style={{ width: 170 }}
              onChange={value => {
                this.handleDisplay(value);
              }}
            >
              <Select.Option value="unapprovedUsers">
                Unapproved Users
              </Select.Option>
              <Select.Option value="approvedUsers">
                Approved Users
              </Select.Option>
              <Select.Option value="removedUsers">Removed Users</Select.Option>
              <Select.Option value="allUsers">All Users</Select.Option>
            </Select>
          </div>
        </center>
        <br />
        {this.state.display === "unapprovedUsers" &&
          this.state.unapprovedUsers.map(user => {
            return (
              <center>
                <Card
                  title={
                    <div className="panelheader2">
                      <center>
                        <div className="headertitle">{user.name}</div>
                      </center>
                      <div className="editbut">
                        <Button
                          size="small"
                          onClick={e => this.editUnapproved(e, user)}
                        >
                          <Icon type="edit" />
                        </Button>
                      </div>
                    </div>
                  }
                  style={{ width: 450 }}
                >
                  <p>Email: {user.email} </p>
                  <p>Title: {user.title} </p>
                  <p>Approved: {user.approved.toString()}</p>
                  <p class="escape">About: {user.about} </p>
                  <p class="escape">
                    Tags:{" "}
                    {user.tags.map(
                      t =>
                        t !== "999" && t !== " " && <Tag color="blue">{t}</Tag>
                    )}
                  </p>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => this.acceptUser(user)}
                  >
                    Accept
                  </Button>
                  {"    "}
                  {"   "}
                  <Button
                    size="small"
                    type="danger"
                    onClick={e => this.deleteUser(e, user)}
                  >
                    Reject
                  </Button>
                </Card>
                <br />
              </center>
            );
          })}
        {this.state.display === "removedUsers" &&
          this.state.removedUsers.map(user => {
            return (
              <center>
                <Card
                  title={
                    <div className="panelheader2">
                      <center>
                        <div className="headertitle">{user.name}</div>
                      </center>
                      <div className="editbut">
                        <Button
                          onClick={e => this.editUnapproved(e, user)}
                          size="small"
                        >
                          <Icon type="edit" />
                        </Button>
                      </div>
                    </div>
                  }
                  style={{ width: 450 }}
                >
                  <p>Email: {user.email} </p>
                  <p>Title: {user.title} </p>
                  <p>Approved: {user.approved.toString()}</p>
                  <p class="escape">About: {user.about} </p>
                  <p class="escape">
                    Tags:{" "}
                    {user.tags.map(
                      t =>
                        t !== "999" && t !== " " && <Tag color="blue">{t}</Tag>
                    )}
                  </p>
                  <Button
                    type="primary"
                    size="small"
                    onClick={e => this.reauth(e, user)}
                  >
                    Authenticate
                  </Button>
                </Card>
                <br />
              </center>
            );
          })}
        {this.state.display === "approvedUsers" &&
          this.state.approvedUsers.map(user => {
            return (
              <center>
                <Card
                  title={
                    <div className="panelheader2">
                      <div className="headertitle">
                        {user.name +
                          " - " +
                          user.title.charAt(0).toUpperCase() +
                          user.title.slice(1)}
                      </div>
                      <div className="editbut">
                        <Button
                          size="small"
                          onClick={e => this.editUnapproved(e, user)}
                        >
                          <Icon type="edit" />
                        </Button>
                      </div>
                    </div>
                  }
                  style={{ width: 450 }}
                >
                  <p>Email: {user.email} </p>
                  <p>Title: {user.title} </p>
                  <p>Approved: {user.approved.toString()}</p>
                  <p class="escape">About: {user.about} </p>
                  <p class="escape">
                    Tags:{" "}
                    {user.tags.map(
                      t =>
                        t !== "999" && t !== " " && <Tag color="blue">{t}</Tag>
                    )}
                  </p>

                  <Button
                    type="danger"
                    size="small"
                    onClick={e => this.deleteUser(e, user)}
                  >
                    Remove User
                  </Button>
                </Card>
                <br />
              </center>
            );
          })}
        {this.state.display === "allUsers" &&
          this.state.allUsers.map(user => {
            return (
              <center>
                <Card
                  title={
                    <div className="panelheader2">
                      <center>
                        <div className="headertitle">
                          {user.name +
                            " - " +
                            user.title.charAt(0).toUpperCase() +
                            user.title.slice(1)}
                        </div>
                      </center>
                      <div className="editbut">
                        <Button
                          size="small"
                          onClick={e => this.editUnapproved(e, user)}
                        >
                          <Icon type="edit" />
                        </Button>
                      </div>
                    </div>
                  }
                  style={{ width: 450 }}
                >
                  <p>Email: {user.email} </p>
                  <p>Title: {user.title} </p>
                  <p>Approved: {user.approved.toString()}</p>
                  <p class="escape">About: {user.about} </p>
                  <p class="escape">
                    Tags:{" "}
                    {user.tags.map(
                      t =>
                        t !== "999" && t !== " " && <Tag color="blue">{t}</Tag>
                    )}
                  </p>

                  {user.approved !== "removed" && (
                    <Button
                      type="danger"
                      size="small"
                      onClick={e => this.deleteUser(e, user)}
                    >
                      Remove
                    </Button>
                  )}
                  {user.approved === "removed" && (
                    <Button
                      type="primary"
                      size="small"
                      onClick={e => this.reauth(e, user)}
                    >
                      Authenticate
                    </Button>
                  )}
                </Card>
                <br />
              </center>
            );
          })}
      </div>
    );
  }
}

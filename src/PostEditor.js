import React, { Component } from "react";
import "./PostEditor.css";
import firebase from "./Firebase";
import { Input } from "antd";
import { Button, Menu, Dropdown, Icon } from "antd";

const { TextArea } = Input;
let useremail = null;
class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPostBody: "",
      newUpvotes: "0",
      user: ""
    };
    this.handlePostEditorInputChange = this.handlePostEditorInputChange.bind(
      this
    );
    this.createPost = this.createPost.bind(this);
  }
  handlePostEditorInputChange(ev) {
    this.setState({
      newPostBody: ev.target.value
    });
  }

  createPost() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        useremail = user.email;
      }
    });
    var object = {
      posts: this.state.newPostBody,
      upvotes: this.state.newUpvotes,
      user: this.state.user
    };
    this.props.addPost(
      this.state.newPostBody,
      this.state.newUpvotes,
      this.state.user
    );

    this.setState({
      newPostBody: "",
      newUpvotes: "0",
      user: ""
    });
  }
  render() {
    return (
      <div>
        <TextArea
          rows={3}
          class="post-editor-input"
          value={this.state.newPostBody}
          onChange={this.handlePostEditorInputChange}
        />
        <Button type="primary" onClick={this.createPost}>
          Post
        </Button>
      </div>
    );
  }
}

export default PostEditor;

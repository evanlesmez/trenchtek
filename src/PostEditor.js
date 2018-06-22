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
  addMessage = e => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      this.createPost();
    }
  };
  render() {
    return (
      <div>
        <TextArea
          rows={3}
          class="post-editor-input"
          value={this.state.newPostBody}
          onChange={this.handlePostEditorInputChange}
          onKeyDown={this.addMessage}
          placeholder="What's on your mind today?"
        />
        <Button type="primary" onClick={this.createPost}>
          Post
        </Button>
      </div>
    );
  }
}

export default PostEditor;

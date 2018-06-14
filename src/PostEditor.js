import React, { Component } from "react";
import "./PostEditor.css";
import firebase from "./Firebase";
import { Input } from "antd";
import { Button, Menu, Dropdown, Icon } from "antd";

const { TextArea } = Input;

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPostBody: ""
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
    var object = this.state.newPostBody;
    //var object = this.state;
    this.props.addPost(object);
    const list = firebase.database().ref("/posts");
    list.push(object);

    this.setState({
      newPostBody: ""
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

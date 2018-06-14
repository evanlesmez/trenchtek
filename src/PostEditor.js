import React, { Component } from "react";
import "./PostEditor.css";
import firebase from "./Firebase";

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
    this.props.addPost(object);
    const list = firebase.database().ref("/posts");
    list.push(object);

    this.setState({
      newPostBody: ""
    });
  }
  render() {
    return (
      <div className="panel post-de ault post-editor">
        <div className="panel-body">
          <textarea
            className="form-control post-editor-input"
            value={this.state.newPostBody}
            onChange={this.handlePostEditorInputChange}
          />
          <button
            className="btn btn-success post-editor-button"
            onClick={this.createPost}
          >
            Post
          </button>
        </div>
      </div>
    );
  }
}

export default PostEditor;

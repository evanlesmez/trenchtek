import React, { Component } from "react";
import Post from "./Post";
import PostEditor from "./PostEditor";
import firebase from "./Firebase";

class ThreadDisplay extends Component {
  constructor(props) {
    super(props);
    this.addPost = this.addPost.bind(this);
    this.state = {
      posts: []
    };
  }

  addPost(newPostBody) {
    const newState = Object.assign({}, this.state);
    newState.posts.push(newPostBody);
    this.setState(newState);
  }
  componentDidMount() {
    const list = firebase.database().ref("/posts");
    list.on("value", snapshot => {
      let objects = snapshot.val();
      let posts = [];
      for (let obj in objects) {
        if (objects[obj] != "") posts.push(objects[obj]);
      }
      this.setState({ posts: posts });
    });
  }
  render() {
    return (
      <div>
        {this.state.posts.map(postBody => {
          return <Post postBody={postBody} />;
        })}
        <PostEditor addPost={this.addPost} />
      </div>
    );
  }
}
export default ThreadDisplay;

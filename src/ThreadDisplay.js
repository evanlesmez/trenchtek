import React, { Component } from "react";
import Post from "./Post";
import "./Post.css";
import PostEditor from "./PostEditor";
import firebase from "./Firebase";
import { Card } from "antd";
import { Button, Menu, Dropdown, Icon } from "antd";

const { Meta } = Card;
class ThreadDisplay extends Component {
  constructor(props) {
    super(props);
    this.addPost = this.addPost.bind(this);
    this.state = {
      posts: []
    };
  }
  /*
  handleClick() {
    var object = this.state.posts.upvotes;
    const list = firebase.database().ref("/posts");
    list.push(object);
    this.setState({
      newUpvotes: ""
    });
    let newState = this.state.newUpvotes;
    for (let obj in newState) {
      if (newState[obj] == null) newState[obj] = 1;
      else newState[obj] += 1;
    }
    this.setState({ newUpvotes: newState });
  }*/
  addPost(newPostBody) {
    const newState = Object.assign({}, this.state);
    newState.posts.push(newPostBody);
    //newState.array.upvotes.push(newPostBody);
    this.setState(newState);
  }
  componentDidMount() {
    const list = firebase.database().ref("/posts");
    list.on("value", snapshot => {
      let objects = snapshot.val();
      let posts = [];
      for (let obj in objects) {
        if (objects[obj] != "") posts.push(objects[obj]);
        //console.log(objects[obj]);
      }
      this.setState({ posts: posts });
    });
  }

  render() {
    return (
      <div>
        {this.state.posts.map(postBody => {
          console.log(postBody);
          return (
            <div className="post-body">
              <div class="flexhorizontal">
                <div class="flexvertical">
                  <img
                    class="cover image-cropper"
                    src="http://1.bp.blogspot.com/-In9KukHrJGI/Tl7HT6i5kTI/AAAAAAAAADQ/-0JxyuulMME/s1600/poptropican2.jpg"
                  />
                  <div class="space" />
                  <center>
                    <Icon type="up-circle-o">1</Icon>
                  </center>
                </div>
                <div class="flexhorizontal">
                  <div class="space" />
                  <Card hoverable style={{ width: 500 }}>
                    <div>
                      <h2>User: Andy Page</h2>
                      <Meta title="Role: Admin" description={postBody} />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          );
        })}
        <div className="post-body">
          <PostEditor addPost={this.addPost} />
        </div>
      </div>
    );
  }
}
export default ThreadDisplay;

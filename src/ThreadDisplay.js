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
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      posts: "",
      upvotes: "",
      array: []
    };
  }
  addPost(newPostBody, newUpvotes) {
    const newState = Object.assign({}, this.state);
    var object = {
      posts: newPostBody,
      upvotes: newUpvotes
    };
    this.state.array.push(object);
  }
  handleClick() {
    var temp = Math.floor(Math.random() * this.state.array.length);
    console.log(temp);
    var number = parseInt(this.state.array[temp].upvotes);
    console.log(number);
    this.state.array[temp].upvotes = number++;
    console.log("HELLO");
    let list = firebase.database().ref("/array");
  }
  componentDidMount() {
    let list = firebase.database().ref("/array");
    list.on("value", snapshot => {
      let objects = snapshot.val();
      let all = [];
      let thing = {};
      for (let obj in objects) {
        if (objects[obj].posts != "") {
          thing = {
            posts: objects[obj].posts,
            upvotes: objects[obj].upvotes
          };
          all.push(thing);
        }
      }
      this.setState({ array: all });
    });
  }

  render() {
    return (
      <div>
        {this.state.array.map(data => {
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
                    <Icon type="up-circle-o" onClick={this.handleClick}>
                      {data.upvotes}
                    </Icon>
                  </center>
                </div>
                <div class="flexhorizontal">
                  <div class="space" />
                  <Card hoverable style={{ width: 500, maxHeight: 1000 }}>
                    <div>
                      <h2>User: Andy Page</h2>
                      <Meta title="Role: Admin" description={data.posts} />
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

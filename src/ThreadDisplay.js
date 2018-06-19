import React, { Component } from "react";
import Post from "./Post";
import "./Post.css";
import PostEditor from "./PostEditor";
import firebase from "./Firebase";
import { Card } from "antd";
import { Button, Menu, Dropdown, Icon } from "antd";

const { Meta } = Card;
let useremail = null;
let userinfo = null;
class ThreadDisplay extends Component {
  constructor(props) {
    super(props);
    this.addPost = this.addPost.bind(this);
    //this.handleClick = this.handleClick.bind(this);
    this.state = {
      posts: "",
      array: [],
      currentUser: ""
    };
  }

  addPost(newPostBody, newUpvotes) {
    const newState = Object.assign({}, this.state);
    let list = firebase.database().ref("/users");
    let thing = {};
    list.on("value", snapshot => {
      let objects = snapshot.val();
      for (let obj in objects) {
        if (objects[obj].email == useremail) thing = objects[obj];
      }
    });
    var randomid = Math.floor(Math.random() * 200000000);
    var object = {
      posts: newPostBody,
      upvotes: newUpvotes,
      currentUser: thing,
      id: randomid
    };
    this.state.array.push(object);
    let adder = firebase.database().ref("/posts");
    adder.push(object);
  }

  handleClick(data) {
    let list = firebase
      .database()
      .ref("/posts")
      .set();

    /*list.on("value", snapshot => {
      let objects = snapshot.val();
      let thing = {};
      for (let obj in objects) {
        if (objects[obj].id == data.id) {

        }
      }
    });*/
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        useremail = user.email;
      }
    });

    let list = firebase.database().ref("/users");
    list.on("value", snapshot => {
      let objects = snapshot.val();
      let thing = {};
      for (let obj in objects) {
        if (objects[obj].email == useremail) {
          thing = objects[obj];
          userinfo = thing;
        }
      }
      this.setState({ currentUser: thing });
    });

    list = firebase.database().ref("/posts");
    list.on("value", snapshot => {
      let objects = snapshot.val();
      let all = [];
      let thing = {};
      for (let obj in objects) {
        if (objects[obj].posts != "") {
          thing = {
            posts: objects[obj].posts,
            upvotes: objects[obj].upvotes,
            currentUser: objects[obj].currentUser,
            id: objects[obj].id
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
                    src="https://i.stack.imgur.com/34AD2.jpg"
                  />
                  <div class="space" />
                  <center>
                    <Icon
                      type="up-circle-o"
                      onClick={() => this.handleClick(data)}
                    >
                      {data.upvotes}
                    </Icon>
                  </center>
                </div>
                <div class="flexhorizontal">
                  <div class="space" />
                  <Card hoverable style={{ width: 500, maxHeight: 1000 }}>
                    <div>
                      <h3>
                        {data.currentUser.title}: {data.currentUser.name}
                      </h3>
                      <div>{data.posts}</div>
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

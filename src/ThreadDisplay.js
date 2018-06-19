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
      var randomid = Math.floor(Math.random() * 20000000000);

      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      var n = new Date();
      if (parseInt(n.getHours()) >= 13) {
        var time =
          String(parseInt(n.getHours()) - 12) +
          ":" +
          (String(n.getMinutes()).length == 1
            ? "0" + n.getMinutes() + "PM"
            : n.getMinutes() + "PM");
      } else if (parseInt(n.getHours()) >= 1 && parseInt(n.getHours()) <= 11) {
        var time =
          n.getHours() +
          ":" +
          (String(n.getMinutes()).length == 1
            ? "0" + n.getMinutes() + "AM"
            : n.getMinutes() + "AM");
      } else if (parseInt(n.getHours()) == 12) {
        var time =
          n.getHours() +
          ":" +
          (String(n.getMinutes()).length == 1
            ? "0" + n.getMinutes() + "PM"
            : n.getMinutes() + "PM");
      } else if (parseInt(n.getHours()) == 0) {
        var time =
          "12:" +
          (String(n.getMinutes()).length == 1
            ? "0" + n.getMinutes() + "AM"
            : n.getMinutes() + "AM");
      }
      var date =
        months[n.getMonth()] +
        " " +
        (String(n.getDate()).length == 1 ? "0" + n.getDate() : n.getDate()) +
        ", " +
        String(n.getFullYear()) +
        " " +
        String(time) +
        "";

      var object = {
        posts: newPostBody,
        upvotes: newUpvotes,
        currentUser: thing,
        id: randomid,
        date: date
      };
      this.state.array.push(object);
      let adder = firebase.database().ref("/posts");
      adder.push(object);
    });
  }

  handleClick(data) {
    let list = firebase.database().ref("/posts");
    let key;
    let currentUpvotes;
    let self = false;
    list.on("value", snapshot => {
      let objects = snapshot.val();
      for (let obj in objects) {
        console.log(objects[obj]);
        if (
          objects[obj].id == data.id &&
          objects[obj].currentUser.email != useremail
        ) {
          key = obj;
          currentUpvotes = objects[obj].upvotes;
          self = true;
        }
      }
    });
    if (self) {
      firebase
        .database()
        .ref("/posts/" + key)
        .child("/upvotes")
        .set(parseInt(currentUpvotes) + 1);
    }
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
            id: objects[obj].id,
            date: objects[obj].date
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
        <div>
          {this.state.array.map(data => {
            return (
              <div className="post-body">
                <div class="flexhorizontal">
                  <div class="flexvertical">
                    <img
                      class="image-cropper"
                      src="https://i.stack.imgur.com/34AD2.jpg"
                    />
                    <center>
                      <div class="nametitle">
                        {data.currentUser.name}
                        <br />
                        <small>
                          (
                          {data.currentUser.title}
                          )
                        </small>
                      </div>
                      <div class="space" />
                    </center>
                  </div>
                  <center class="margin">
                    <div class="flexvertical">
                      <Icon
                        type="up-circle-o"
                        style={{ fontSize: 18 }}
                        onClick={() => this.handleClick(data)}
                      />
                      <div>{data.upvotes}</div>
                    </div>
                  </center>

                  <div class="flexhorizontal">
                    <div class="space" />
                    <Card hoverable style={{ width: 500 }}>
                      <div class="date"> {data.date}</div>
                      <div class="escape">{data.posts}</div>
                    </Card>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div class="post-body">
          <div class="post-body2">
            <PostEditor addPost={this.addPost} />
          </div>
        </div>
      </div>
    );
  }
}
export default ThreadDisplay;

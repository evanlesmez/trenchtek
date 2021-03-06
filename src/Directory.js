import React, { Component } from "react";
import {
  Button,
  Select,
  Input,
  Menu,
  Dropdown,
  Checkbox,
  Card,
  Tag,
  Icon
} from "antd";

import firebase from "./Firebase";
import "./Post.css";
import "./App.css";

let storageRef = firebase.storage().ref("images/");
let dBase = firebase.database();
const CheckboxGroup = Checkbox.Group;
const Search = Input.Search;
const plainOptions = ["Intern", "Alumni", "Admin"];
const { Meta } = Card;
const { CheckableTag } = Tag;

export default class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      default: false,
      array: [],
      sortByUpvote: false,
      sortByName: false,
      sortByTag: false,
      boolean: false,
      loading: "hello"
    };
  }
  setBooleanTrue = () => {
    this.state.boolean = true;
  };
  setBooleanFalse = () => {
    this.state.boolean = false;
  };
  handleClose = (removedTag, info) => {};
  allowUpvoteSort = e => {
    this.setState({ sortByUpvote: true });
    this.setState({ sortByName: false });
    this.setState({ sortByTag: false });
  };
  allowNameSort = e => {
    this.setState({ sortByUpvote: false });
    this.setState({ sortByName: true });
    this.setState({ sortByTag: false });
  };
  allowNoneSort = e => {
    this.setState({ sortByUpvote: false });
    this.setState({ sortByName: false });
    this.setState({ sortByTag: false });
  };
  allowTagSort = e => {
    this.setState({ sortByUpvote: false });
    this.setState({ sortByName: false });
    this.setState({ sortByTag: true });
  };
  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  };
  onCheckAllChange = e => {
    if (this.state.checkedList.length > 0) {
      this.setState({
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
        default: false
      });
    } else {
      this.setState({
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
        default: true
      });
    }
  };
  sort = array => {
    if (this.state.sortByUpvote) {
      array.sort(function(a, b) {
        return parseInt(b.upvotes) - parseInt(a.upvotes);
      });
    } else if (this.state.sortByTag) {
      array.sort(function(a, b) {
        return b.tags.length - a.tags.length;
      });
    } else if (this.state.sortByName) {
      array.sort(function(a, b) {
        return (
          a.name.toUpperCase().charCodeAt(0) -
          b.name.toUpperCase().charCodeAt(0)
        );
      });
    }
    console.log(array);
    this.setState({ array: array }, () => {
      console.log("new state", this.state);
    });
  };
  searchResult = v => {
    var array = this.state.users;
    let list = firebase.database().ref("/users");
    list.on("value", snapshot => {
      let objects = snapshot.val();
      let array = [];
      let thing = {};
      let array2 = {};
      var person;
      let image;

      for (let obj in objects) {
        person = objects[obj];
        if (this.state.checkedList.includes(person.title)) {
          array2[obj] = person;
        }
      }
      for (let obj in array2) {
        person = array2[obj];
        var tag = person.tags;
        for (var i = 0; i < tag.length; i++) {
          if (tag[i] != "") {
            tag[i] = tag[i].toLowerCase();
          }
        }
        ///////////////////////
        ///Retrieving Image////
        ///////////////////////
        /*
        dBase.ref(obj).on("value", snapshot => {
          storageRef
            .child("users/" + obj)
            .getDownloadURL()
            .then(url => {
              person = array2[obj];
              var name = person.name.toLowerCase();
              if (
                v.indexOf("#") != -1 &&
                tag.includes(v.toLowerCase().substring(1))
              ) {
                thing = {
                  name: person.name,
                  title: person.title,
                  image: url,
                  tags: person.tags,
                  upvotes: person.upvotes
                };
                array.push(thing);
                console.log("1");
              } else if (
                v.indexOf("#") == -1 &&
                name.includes(v.toLowerCase())
              ) {
                thing = {
                  name: person.name,
                  title: person.title,
                  image: url,
                  tags: person.tags,
                  upvotes: person.upvotes
                };
                array.push(thing);
                console.log("2");
              } else if (v == "") {
                thing = {
                  name: person.name,
                  title: person.title,
                  image: url,
                  tags: person.tags,
                  upvotes: person.upvotes
                };
                array.push(thing);
                console.log("3");
              }
            })
            .catch(function(error) {
              person = array2[obj];

              var name = person.name.toLowerCase();
              if (
                v.indexOf("#") != -1 &&
                tag.includes(v.toLowerCase().substring(1))
              ) {
                thing = {
                  name: person.name,
                  title: person.title,
                  image: "https://i.stack.imgur.com/34AD2.jpg",
                  tags: person.tags,
                  upvotes: person.upvotes
                };
                array.push(thing);
                console.log("1a");
              } else if (
                v.indexOf("#") == -1 &&
                name.includes(v.toLowerCase())
              ) {
                thing = {
                  name: person.name,
                  title: person.title,
                  image: "https://i.stack.imgur.com/34AD2.jpg",
                  tags: person.tags,
                  upvotes: person.upvotes
                };
                array.push(thing);
                console.log("2a");
              } else if (v == "") {
                thing = {
                  name: person.name,
                  title: person.title,
                  image: "https://i.stack.imgur.com/34AD2.jpg",
                  tags: person.tags,
                  upvotes: person.upvotes
                };
                array.push(thing);
                console.log("3a");
              }
            });
        });
      }*/
        var name = person.name.toLowerCase();
        if (
          v.indexOf("#") != -1 &&
          tag.includes(v.toLowerCase().substring(1))
        ) {
          if (!this.state.boolean) {
            thing = {
              name: person.name,
              title: person.title,
              image: "https://i.stack.imgur.com/34AD2.jpg",
              tags: person.tags,
              upvotes: person.upvotes
            };
          } else {
            thing = {
              name: person.name,
              title: person.title,
              image: image,
              tags: person.tags,
              upvotes: person.upvotes
            };
          }
          array.push(thing);
        } else if (v.indexOf("#") == -1 && name.includes(v.toLowerCase())) {
          if (!this.state.boolean)
            thing = {
              name: person.name,
              title: person.title,
              image: "https://i.stack.imgur.com/34AD2.jpg",
              tags: person.tags,
              upvotes: person.upvotes
            };
          else {
            thing = {
              name: person.name,
              title: person.title,
              image: image,
              tags: person.tags,
              upvotes: person.upvotes
            };
          }
          array.push(thing);
        } else if (v == "") {
          if (!this.state.boolean) {
            thing = {
              name: person.name,
              title: person.title,
              image: "https://i.stack.imgur.com/34AD2.jpg",
              tags: person.tags,
              upvotes: person.upvotes
            };
          } else {
            thing = {
              name: person.name,
              title: person.title,
              image: image,
              tags: person.tags,
              upvotes: person.upvotes
            };
          }
          array.push(thing);
        }
      }
      ///////////////////////////
      /////////SORTING///////////
      ///////////////////////////
      this.sort(array);
    });
  };
  componentDidMount() {
    /////////////////////////////////////////////
    ///////////Initializing Upvotes//////////////
    /////////////////////////////////////////////
    let email2upvotes = [];
    let key2email = [];

    let list = firebase.database().ref("/users");
    list.on("value", snapshot => {
      let objects = snapshot.val();
      var person;
      for (let obj in objects) {
        person = objects[obj];
        key2email[obj] = person.email;
        email2upvotes[person.email] = 0;
      }
    });
    ////////////////////////////////////////
    /////////UPDATING UPVOTES///////////////
    ////////////////////////////////////////
    list = firebase.database().ref("/posts");
    list.on("value", snapshot => {
      let objects = snapshot.val();
      let thing = {};
      var email;
      var upvotes;
      for (let obj in objects) {
        email = objects[obj].currentUser.email;
        upvotes = parseInt(objects[obj].upvotes);
        email2upvotes[email] = parseInt(email2upvotes[email]) + upvotes;
      }
    });
    for (let key in key2email) {
      firebase
        .database()
        .ref("/users/" + key)
        .child("/upvotes")
        .set(email2upvotes[key2email[key]]);
    }
    /////////////////////////////////
    //Rerender with Updated Upvotes//
    /////////////////////////////////
    list = firebase.database().ref("/users");
    list.on("value", snapshot => {
      let objects = snapshot.val();
      let updatedArray = [];
      let thing = {};
      var person;
      for (let obj in objects) {
        person = objects[obj];

        if (person.image) {
          thing = {
            name: person.name,
            title: person.title,
            image: person.image,
            tags: person.tags,
            upvotes: person.upvotes
          };
        } else {
          thing = {
            name: person.name,
            title: person.title,
            image: "https://i.stack.imgur.com/34AD2.jpg",
            tags: person.tags,
            upvotes: person.upvotes
          };
        }
        updatedArray.push(thing);
      }
      this.state.loading = false;
      this.setState({ array: updatedArray });
    });
  }

  render() {
    if (this.state.loading === "hello" && console.log("hello"))
      this.state.loading = true;
    return (
      <div className="directory">
        <center>
          <div class="directory-title">Directory</div>
          <div className="directory">
            <Search
              className="directory"
              placeholder="Enter name or #tag"
              onSearch={value => {
                this.searchResult(value);
              }}
              style={{ width: 400 }}
              enterButton
            />

            <Select
              defaultValue="Sort By"
              style={{ width: 100 }}
              className="sort-button"
            >
              <Select.Option value="None" onClick={e => this.allowNoneSort(e)}>
                None
              </Select.Option>
              <Select.Option
                value="Upvotes"
                onClick={e => this.allowUpvoteSort(e)}
              >
                Upvotes
              </Select.Option>
              <Select.Option value="Name" onClick={e => this.allowNameSort(e)}>
                Name
              </Select.Option>
              <Select.Option
                value="#ofTags"
                onClick={e => this.allowTagSort(e)}
              >
                #ofTags
              </Select.Option>
            </Select>
          </div>
          <br />
          <Checkbox
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Check All
          </Checkbox>
          <CheckboxGroup
            options={plainOptions}
            value={this.state.checkedList}
            onChange={this.onChange}
          />
          <br />
          <br />
          <br />
          {this.state.array.map(user => (
            <div>
              <div>
                <Card
                  style={{ width: 500, maxHeight: 1000 }}
                  title={<div className="name-text">{user.name}</div>}
                  hoverable={true}
                  loading={this.state.loading}
                >
                  <div class="flexhorizontal">
                    <img class="directory-image" src={user.image} />
                    <div class="indent">
                      <div>
                        <div className="bigger-text">{"  "}Title: </div>
                        <div className="big-text">
                          {user.title.substring(0, 1).toUpperCase() +
                            user.title.substring(1)}
                        </div>
                      </div>
                      <div>
                        <div className="bigger-text">Upvotes: </div>
                        <div className="big-text">{user.upvotes}</div>
                      </div>
                    </div>
                  </div>
                </Card>
                <div class="tags">
                  {user.tags.map(
                    t => t !== "999" && t !== " " && <Tag color="blue">{t}</Tag>
                  )}
                </div>
              </div>
              <br />
              <br />
              <br />
            </div>
          ))}
        </center>
      </div>
    );
  }
}

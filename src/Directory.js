import React, { Component } from "react";
import { Button, Input, Menu, Dropdown, Checkbox, Card, Tag, Icon } from "antd";

import firebase from "./Firebase";
import "./Post.css";

const CheckboxGroup = Checkbox.Group;
const Search = Input.Search;
const plainOptions = ["Intern", "Alumni", "Senior Developers", "Admin"];
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
      sortByTag: false
    };
  }
  menu2 = () => {
    return (
      <div>
        <Menu
          key="None"
          onClick={e => this.allowNoneSort(e)}
          selectable={false}
        >
          <Menu.Item>None</Menu.Item>
        </Menu>
        <Menu
          key="Upvotes"
          onClick={e => this.allowUpvoteSort(e)}
          selectable={false}
        >
          <Menu.Item>Upvotes</Menu.Item>
        </Menu>
        <Menu
          key="Name"
          onClick={e => this.allowNameSort(e)}
          selectable={false}
        >
          <Menu.Item>Name</Menu.Item>
        </Menu>
        <Menu key="Tags" onClick={e => this.allowTagSort(e)} selectable={false}>
          <Menu.Item>#ofTags</Menu.Item>
        </Menu>
      </div>
    );
  };
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
  searchResult = v => {
    var array = this.state.users;
    let list = firebase.database().ref("/users");
    list.on("value", snapshot => {
      let objects = snapshot.val();
      let array = [];
      let thing = {};
      let array2 = [];
      var person;
      for (let obj in objects) {
        person = objects[obj];
        if (this.state.checkedList.includes(person.title)) {
          array2.push(person);
        }
      }
      for (let obj in array2) {
        person = array2[obj];
        var tag = person.tags;
        for (var i = 0; i < tag.length; i++) {
          if (tag[i] != "") tag[i] = tag[i].toLowerCase();
          else {
            delete tag[i];
          }
        }

        var name = person.name.toLowerCase();
        if (
          v.indexOf("#") != -1 &&
          tag.includes(v.toLowerCase().substring(1))
        ) {
          if (person.image === "") {
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
              image: person.image,
              tags: person.tags,
              upvotes: person.upvotes
            };
          }
          array.push(thing);
        } else if (v.indexOf("#") == -1 && name.includes(v.toLowerCase())) {
          if (person.image === "")
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
              image: person.image,
              tags: person.tags,
              upvotes: person.upvotes
            };
          }
          array.push(thing);
        } else if (v == "") {
          if (person.image == "") {
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
              image: person.image,
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

      this.setState({ array: array });
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

        if (person.image === "") {
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
            image: person.image,
            tags: person.tags,
            upvotes: person.upvotes
          };
        }
        updatedArray.push(thing);
      }
      this.setState({ array: updatedArray });
    });
  }
  render() {
    if (this.state.default === true) {
      return (
        <div>
          <div class="flexhorizontal2">
            <h1>
              The Directory
              <Icon type="book" style={{ fontSize: 40, color: "black" }} />
            </h1>
          </div>
          <div class="margin2">
            <Search
              placeholder="Search by name, tag (# at the front), blank for refresh"
              onSearch={value => {
                this.searchResult(value);
              }}
              style={{ width: 400 }}
              enterButton
            />
            <Dropdown overlay={this.menu2()} trigger={["click"]}>
              <a className="ant-dropdown-link" href="#">
                Sort by <Icon type="down" />
              </a>
            </Dropdown>
          </div>
          <center>
            <div>
              <Checkbox
                indeterminate={this.state.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.checkAll}
              >
                Check all
              </Checkbox>
            </div>
            <br />
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
                <div class="border">
                  <div class="username">User: {user.name}</div>
                  <Card hoverable style={{ width: 500, maxHeight: 1000 }}>
                    <div class="flexhorizontal">
                      <img class="directory-image" src={user.image} />
                      <div class="indent">
                        <h3>
                          Title:{" "}
                          {user.title.substring(0, 1).toUpperCase() +
                            user.title.substring(1)}
                        </h3>
                        <h3>Upvotes: {user.upvotes}</h3>
                      </div>
                    </div>
                  </Card>
                  <div class="tags">
                    {user.tags.map(t => <Tag color="blue">{t}</Tag>)}
                  </div>
                </div>
                <br />
              </div>
            ))}
          </center>
        </div>
      );
    } else {
      return (
        <div>
          <div class="flexhorizontal2">
            <h1>
              The Directory<Icon
                type="book"
                style={{ fontSize: 40, color: "black" }}
              />
            </h1>
          </div>
          <div class="margin2">
            <Search
              placeholder="Search by name, tag (# at the front), blank for refresh"
              onSearch={value => {
                this.searchResult(value);
              }}
              style={{ width: 400 }}
              enterButton
            />

            <Dropdown overlay={this.menu2()} trigger={["click"]}>
              <a className="ant-dropdown-link" href="#">
                Sort by <Icon type="down" />
              </a>
            </Dropdown>
          </div>
          <center>
            <div>
              <Checkbox
                indeterminate={this.state.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.checkAll}
              >
                Check all
              </Checkbox>
            </div>
            <br />
            <CheckboxGroup
              options={plainOptions}
              value={this.state.checkedList}
              onChange={this.onChange}
            />
            <br />
            <br />
            <br />
          </center>
        </div>
      );
    }
  }
}

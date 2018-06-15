import React, { Component } from "react";
import { Input, Checkbox, Card, Tag, Icon } from "antd";
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
      users: ["Sung Joon Park", "Sonali Luthar"],
      array: []
    };
  }
  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  };
  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };
  searchResult = value => {
    var array = this.state.users;
    array.push(value);
  };
  componentDidMount() {
    let list = firebase.database().ref("/users");
    list.on("value", snapshot => {
      let objects = snapshot.val();
      let array = [];
      let thing = {};
      var person;
      for (let obj in objects) {
        person = objects[obj];
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
      this.setState({ array: array });
    });
  }
  render() {
    return (
      <div>
        <div class="flexhorizontal2">
          <h1 class="directoryfont">The Directory</h1>
          <span />
          <Icon type="book" style={{ fontSize: 40, color: "black" }} />
        </div>
        <center>
          <Search
            placeholder="Search by name or tag (# at the front)"
            onSearch={value => {
              this.searchResult(value);
            }}
            style={{ width: 400 }}
            enterButton
          />
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
                    <div>
                      <Meta title="Title: ">{user.title}</Meta>
                      <Meta title="Upvotes: ">{user.upvotes}</Meta>
                    </div>
                  </div>
                </Card>
                <div class="tags">
                  <Tag color="blue">{user.tags}</Tag>
                </div>
              </div>
              <br />
            </div>
          ))}
        </center>
      </div>
    );
  }
}

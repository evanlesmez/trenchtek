import React, { Component } from "react";
import { Input, Checkbox, Card, Tag } from "antd";
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
      users: ["Sung Joon Park", "Sonali Luthar"]
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
    this.setState({ users: array });
  };

  render() {
    return (
      <div>
        <div>The Directory</div>
        <center>
          <Search
            placeholder="input search text"
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

          {this.state.users.map(user => (
            <div>
              <div class="border">
                <div class="username">User: {user}</div>
                <Card hoverable style={{ width: 500, maxHeight: 1000 }}>
                  <div class="flexhorizontal">
                    <img
                      class="directory-image"
                      src="https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/13528934_10201921374752485_3807518045680855002_n.jpg?_nc_cat=0&oh=263d3cc7d69c85b725714515c3effe41&oe=5BC3F9F9"
                    />
                    <div>
                      <Meta title="Role: ">{user}</Meta>
                      <Meta title="Rating: ">{user}</Meta>
                    </div>
                  </div>
                </Card>
                <div class="tags">
                  <Tag color="blue">"ReactJS"</Tag>
                  <Tag color="blue">"NodeJS"</Tag>
                  <Tag color="blue">"Java"</Tag>
                  <Tag color="blue">"Python"</Tag>
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

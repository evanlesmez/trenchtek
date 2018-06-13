import React, { Component } from "react";
import TopbarUser from "./TopbarUser.js";
import firebase from "./Firebase.js";
import { Collapse, Button } from "antd";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  AutoComplete
} from "antd";

const chalRef = firebase.database().ref("challenges");
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
let name = null;
let details = null;
let duedate = null;

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      name: "",
      details: "",
      duedate: "",
      isAdd: false
    };
  }

  componentDidMount() {
    chalRef.on("value", snapshot => {
      let challenges = snapshot.val();
      let newState = [];
      for (let chal in challenges) {
        newState.push({
          name: chal,
          details: chal.details,
          duedate: chal.duedate
        });
      }
      this.setState({ challenges: newState });
    });
  }

  addChal = e => {
    e.preventDefault;
    this.setState({ isAdd: true });
  };

  submitChal = e => {
    e.preventDefault();
    chalRef
      .child(this.state.name)
      .set({ details: this.state.details, duedate: this.state.duedate });
    this.setState({ name: "", details: "", duedate: "", isAdd: false });
  };

  handleChange = (e, label) => {
    this.setState({ [label]: e.target.value });
  };

  render() {
    if (this.state.isAdd) {
      return (
        <div>
          <div>
            <TopbarUser />
            {this.state.challenges.map(item => {
              <Collapse>
                <Panel header={item.name}>
                  details: {item.details} duedate: {item.duedate}
                </Panel>
              </Collapse>;
            })}
          </div>
          <Button onClick={this.addChal}>Add Challenge</Button>
          <Form onSubmit={this.submitChal}>
            <FormItem label="name">
              <Input
                onChange={e => {
                  this.handleChange(e, "name");
                }}
              />
            </FormItem>
            <FormItem label="details">
              <Input
                onChange={e => {
                  this.handleChange(e, "details");
                }}
              />
            </FormItem>
            <FormItem label="duedate">
              <Input
                onChange={e => {
                  this.handleChange(e, "duedate");
                }}
              />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Form>
        </div>
      );
    }
    return (
      <div>
        <div>
          <TopbarUser />
          {this.state.challenges.map(item => {
            <Collapse>
              <Panel header={item.name}>
                details: {item.details} duedate: {item.duedate}
              </Panel>
            </Collapse>;
          })}
        </div>
        <Button onClick={this.addChal}>Add Challenge</Button>
      </div>
    );
  }
}

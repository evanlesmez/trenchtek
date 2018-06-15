import React, { Component } from "react";
import firebase from "./Firebase.js";
import { Button, Card, Input, Form, Icon } from "antd";
import "./App.css";

const resourcesRef = firebase.database().ref("resources");

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      description: "",
      url: "",
      addingResource: false
    };
  }

  handleAddResourceClick = () => {
    this.setState({
      addingResource: true
    });
  };

  handleSubmitClick = () => {
    let newResource = {
      description: this.state.description,
      url: this.state.url
    };
    resourcesRef.push(newResource);
    this.setState({ url: "", description: "", addingResource: false });
  };

  handleCancelClick = () => {
    this.setState({
      addingResource: false
    });
  };

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  componentDidMount() {
    resourcesRef.on("value", snapshot => {
      let resources = snapshot.val();
      let newState = [];
      for (let resource in resources) {
        newState.push({
          description: resources[resource].description,
          url: resources[resource].url
        });
      }
      this.setState({
        resources: newState
      });
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    if (this.state.addingResource) {
      return (
        <div>
          <center>
            <br />
            <Card title="Add Resource" style={{ width: 600 }}>
              <Form layout="vertical" className="login-form">
                <Form.Item>
                  <Input
                    placeholder="Description"
                    prefix={
                      <Icon
                        type="info-circle-o"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    onChange={e =>
                      this.setState({ description: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("url", {
                    rules: [
                      {
                        type: "url",
                        message: "The input is not valid URL"
                      },
                      {
                        required: true,
                        message: "Please input a URL"
                      }
                    ]
                  })(
                    <div>
                      <Input
                        placeholder="URL"
                        prefix={
                          <Icon
                            type="compass"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        onChange={e => this.setState({ url: e.target.value })}
                      />
                    </div>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={this.handleSubmitClick}
                    type="primary"
                    className="resource-submit-button"
                    disabled={
                      this.hasErrors(getFieldsError()) || this.state.url === ""
                    }
                  >
                    Submit
                  </Button>
                  <Button onClick={this.handleCancelClick}>Cancel</Button>
                </Form.Item>
              </Form>
            </Card>
          </center>
        </div>
      );
    }
    return (
      <div>
        <center>
          <br />
          {this.state.resources.map(resource => {
            return (
              <div>
                <Card title={resource.description} style={{ width: 700 }}>
                  <a href={resource.url} target="_blank">
                    {resource.url}
                  </a>
                </Card>
                <br />
              </div>
            );
          })}
          <Button onClick={this.handleAddResourceClick}>Add Resource</Button>
        </center>
      </div>
    );
  }
}

export default Form.create()(Resources);

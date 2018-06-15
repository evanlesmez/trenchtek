import React, { Component } from "react";
import firebase from "./Firebase.js";
import { Button } from "antd";

const resourcesRef = firebase.database().ref("resources");

export default class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      url: "",
      description: "",
      addResource: false
    };
  }

  handleAddResourceClick = () => {
    this.setState({
      addResource: true
    });
  };

  handleSubmitClick = () => {
    this.setState({
      addResource: false
    });
  };

  componentDidMount() {
    resourcesRef.on("value", snapshot => {
      let resources = snapshot.val();
      let newState = [];
      for (let resource in resources) {
        newState.push({
          url: resources[resource].url,
          description: resources[resource].description
        });
      }
      this.setState({
        resources: newState
      });
    });
  }

  render() {
    if (this.state.addResource) {
      return (
        <div>
          Add Resource Here:
          <br />
          <Button onClick={this.handleSubmitClick}>Submit</Button>
        </div>
      );
    }
    return (
      <div>
        <Button onClick={this.handleAddResourceClick}>Add Resource</Button>
        <br />
        RESOURCES!:
        {this.state.resources.map(resource => {
          return (
            <div>
              <br />
              Description: {resource.description}
              <br />
              URL: {resource.url}
            </div>
          );
        })}
      </div>
    );
  }
}

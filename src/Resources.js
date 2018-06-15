import React, { Component } from "react";
import firebase from "./Firebase.js";
import LinkPreview from "react-native-link-preview";

const resourcesRef = firebase.database().ref("resources");

export default class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {LinkPreview.getPreview(
          "https://www.youtube.com/watch?v=MejbOFk7H6c"
        ).then(data => console.log(data))}
      </div>
    );
  }
}

import React, { Component } from "react";
import "./App.css";

import ThreadDisplay from "./ThreadDisplay.js";
import firebase from "./Firebase";

export default class Connect extends Component {
  render() {
    return (
      <div>
        Connect Page
        <ThreadDisplay />
      </div>
    );
  }
}

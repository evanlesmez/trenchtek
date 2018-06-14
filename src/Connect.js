import React, { Component } from "react";
import TopbarUser from "./TopbarUser.js";
import "./App.css";

import ThreadDisplay from "./ThreadDisplay.js";
import firebase from "./Firebase";

export default class Connect extends Component {
  render() {
    return (
      <div>
        <TopbarUser />Connect Page
        <ThreadDisplay />
      </div>
    );
  }
}

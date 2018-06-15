import React, { Component } from "react";
import "./App.css";
import Directory from "./Directory.js";
import ThreadDisplay from "./ThreadDisplay.js";
import firebase from "./Firebase";

export default class Connect2 extends Component {
  render() {
    return (
      <div>
        <Directory />
      </div>
    );
  }
}

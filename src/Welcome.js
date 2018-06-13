import React, { Component } from "react";
import TopbarCompany from "./TopbarCompany.js";

export default class Welcome extends Component {
  render() {
    console.log("this is the welcome page!!");
    return (
      <div>
        <TopbarCompany />
        Welcome Page
      </div>
    );
  }
}

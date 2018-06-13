import React, { Component } from "react";
import TopbarUser from "./TopbarUser.js";



export default class Profile extends Component {
  render() {
    return (
      <div>
        <TopbarUser />Profile Page
        <button type= "edit"> Edit </button>
      </div>
    );
  }
}

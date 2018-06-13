import React, { Component } from "react";
import TopbarUser from "./TopbarUser.js";
import "./Profile.css";


export default class Profile extends Component {
  render() {
    return (
      <div >
        <TopbarUser />Profile Page
        <div className="center">
        <div>
        <img className="profpic" src= "http://static.tvtropes.org/pmwiki/pub/images/reg_anime.jpg" alt = "Prof pic"/>
        </div>
        <button type= "edit"> Edit </button>
        </div>
      </div>
    );
  }
}

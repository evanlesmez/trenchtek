import React, { Component } from "react";
import "./App.css";


export default class Welcome extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <img
            src="https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260alt="
            className="welcome-pic"
          />
          <div className="logo-text">RevTek</div>
          <div className="welcome-text">
            Providing companies with exceptional talent.
          </div>
          <div className="welcome-text2">
            Empowering students to change the world.
          </div>
        </div>
      </div >
    );
  }
}

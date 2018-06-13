import React, { Component } from "react";
import TopbarCompany from "./TopbarCompany.js";
import "./App.css";

//const imageUrl = require("./deskimage.jpg");

export default class Welcome extends Component {
  render() {
    return (
      // <img src="./deskimage.jpg" alt="bg" class="bg" />
      <div class="welcbg">
        <div>
          <TopbarCompany />
          <center>
            <div className="logo-fun">REVTEK</div>
          </center>
        </div>
      </div>
    );
  }
}

{
  /* <div id="bg">
          <img src="./deskimage.jpg" alt="" />
        </div> */
}

// style={{ backgroundImage: "url($" + { imageUrl } + " )" }}

import React, { Component } from "react";
import TopbarCompany from "./TopbarCompany.js";
import "./Welcome.css";

//const imageUrl = require("./deskimage.jpg");

export default class Welcome extends Component {
  render() {
    return (
      // <img src="./deskimage.jpg" alt="bg" class="bg" />
      <div class="welcbg">
        <div>
          <TopbarCompany />
          Welcome Page
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

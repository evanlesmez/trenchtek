import React, { Component } from "react";
import Profile from "./Profile.js";
import firebase from "./Firebase.js";
// Create a reference to the file we want to download
let storageRef = firebase.storage().ref("images/");
let userRef = firebase.database();

// Banner from https://www.google.com/search?q=codding+banner&rlz=1C1CHBF_enUS765US765&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjm7KW7sNPbAhVJ3VMKHWUZBioQ_AUICigB&biw=1536&bih=734&dpr=1.25#imgrc=vAFXqrj7GeFLsM:}

const userData = {
  name: "Reg",
  position: "Big Ballin Shotcaller",
  aboutMe: "dinosaur",
  skills: ["git", "react", "JSON's"],
  links: { github: "github", email: "email", LinkedIn: "linkedin" },
  title: "intern",
  profURL:
    "http://www.aminariana.com/assets/placeholders/avatar-39c4f0720c0b9f829e3dc8b644228be492ea900026f4057974840d54b149bb5d.png"
};

export default class Profilehandler extends Component {
  state = {
    userData: {
      name: "Reg",
      position: "Big Ballin Shotcaller",
      aboutMe: "dinosaur",
      skills: ["git", "react", "JSON's"],
      links: { github: "github", email: "email", LinkedIn: "linkedin" },
      title: "intern",
      profURL:
        "http://www.aminariana.com/assets/placeholders/avatar-39c4f0720c0b9f829e3dc8b644228be492ea900026f4057974840d54b149bb5d.png"
    }
  };
  componentDidMount() {
    // Get the download URL
    storageRef
      .child("DanielSmiley.jpg")
      .getDownloadURL()
      .then(url => {
        let changeURL = this.state.userData;
        changeURL.profURL = url;
        // this.setState({userData:changeURL});
        // Insert url into an <img> tag to "download"
      })
      .catch(function(error) {});
  }
  render() {
    return (
      <div>
        <Profile userData={this.state.userData} />
      </div>
    );
  }
}

// Do firebase reading in here

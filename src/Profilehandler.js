import React, { Component } from "react";
import TopbarUser from "./TopbarUser.js";
import Profile from "./Profile.js";


// Banner from https://www.google.com/search?q=codding+banner&rlz=1C1CHBF_enUS765US765&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjm7KW7sNPbAhVJ3VMKHWUZBioQ_AUICigB&biw=1536&bih=734&dpr=1.25#imgrc=vAFXqrj7GeFLsM:}
export default class Profilehandler extends Component {

  render() {
    return (
    <div >
        <TopbarUser />
        <Profile name="Yoshimi" jobTitle="Big Ballin Shotcaller" aboutMe = "dinosaur" skills = {["git", "react", "JSON's"]}/>
    </div>
    );
  }
}

import React, { Component } from "react";
import Profile from "./Profile.js";
import firebase from "./Firebase.js";
// Create a reference to the file we want to download
let storageRef = firebase.storage().ref("images/");
let dBase = firebase.database();

// Banner from https://www.google.com/search?q=codding+banner&rlz=1C1CHBF_enUS765US765&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjm7KW7sNPbAhVJ3VMKHWUZBioQ_AUICigB&biw=1536&bih=734&dpr=1.25#imgrc=vAFXqrj7GeFLsM:}

export default class Profilehandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      position: "",
      aboutMe: "",
      skills: [],
      github: "", 
      email: "", 
      LinkedIn: "",
      profURL:
        "http://www.aminariana.com/assets/placeholders/avatar-39c4f0720c0b9f829e3dc8b644228be492ea900026f4057974840d54b149bb5d.png",
      uidString: this.props.uidString
    };
  }

  componentWillReceiveProps(nextProps){   // Super useful lifeCycle but leagcy
    if(nextProps.uidString !== ""){
      dBase.ref(nextProps.uidString)
      .on("value", snapshot => {
        let userData = snapshot.val()
        storageRef.child(nextProps.uidString)
          .getDownloadURL().then( url => {
            this.setState({profURL: url});
            
        })
        .catch(function(error) {
        });
        
        this.setState({
          email: userData.email,
          github: userData.github,
          skills: userData.tags,
          name: userData.name,
          position: userData.position,
          aboutMe: userData.about,
          title: userData.title,
          uidString: nextProps.uidString,
          LinkedIn: userData.linkedIn
        });
    
      });
    }
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Profile {...this.state} />
      </div>
    );
  }
}

// Do firebase reading in here

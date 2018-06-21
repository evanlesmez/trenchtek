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
      uidString: this.props.uidString,
      upvotes: "",
    };
  }
  
  fireReadProfile = userID => {
   dBase.ref(userID)
    .on("value", snapshot => {
      let userData;
      storageRef.child(userID)
      .getDownloadURL().then( url => {
        this.setState({profURL: url});
    })
    .catch(function(error) {
    }).then(
  userData = snapshot.val(),
  this.setState({
    email: userData.email,
    github: userData.github,
    skills: userData.tags,
    name: userData.name,
    position: userData.position,
    aboutMe: userData.about,
    title: userData.title,
    LinkedIn: userData.linkedIn,
    uidString: userID,
    upvotes: userData.upvotes,
    }));
  });
    }

  componentWillMount(){ // MY HERO
    if(this.props.uidString != ""){
    this.fireReadProfile(this.props.uidString);
  }else{
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        let userKey = user.uid;
        let userIDString = "users/" + userKey;
          this.fireReadProfile(userIDString);
      }else{
        console.log("You don't belong here")
      };
  });
};
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

import React, { Component } from "react";
import Profile from "./Profile.js";
import firebase from "./Firebase.js";
// Create a reference to the file we want to download
let storageRef = firebase.storage().ref('images/');
let dBase = firebase.database();

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
  constructor(props){
    super(props);
    this.state = {name:"Reg", position:"Big Ballin Shotcaller", aboutMe:"dinosaur", 
    skills:["git", "react", "JSON's"],
    links:{github: "github", email: "email", LinkedIn: "linkedin"}, title: "intern", 
    profURL:  "http://www.aminariana.com/assets/placeholders/avatar-39c4f0720c0b9f829e3dc8b644228be492ea900026f4057974840d54b149bb5d.png"
  }
  }

  componentWillReceiveProps(nextProps){   // Super useful lifeCycle but leagcy
    if(nextProps.uidString !== ""){
      console.log(nextProps);
      dBase.ref(nextProps.uidString)
      .on("value", snapshot => {
      let userData = snapshot.val();
            this.setState({
              links: userData.links,
              skills: userData.skills,
              name: userData.name,
              position: userData.position,
              aboutMe: userData.about,
              tite: userData.title,
            });
    });
    }
  }
//   componentDidMount(){
//     if(this.props.uidString == ""){
//       firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//           let userKey = user.uid;
//           let userIDString = "/users/" + userKey;
//           let database = firebase.database().ref(userIDString);
//           database.on("value", snapshot => {
              
//           });
//           // User is signed in.
//         } else {
//           console.log("no user found");
//           // No user is signed in.
//         }
//       });
//     } else {  // Avoids an extra login if possible to
//     console.log(this.props)
//   }
// }
  render() {
    console.log(this.state);
      return (
        <div >
            <Profile {...this.state}/>
        </div>
        )
  }
}

// Do firebase reading in here

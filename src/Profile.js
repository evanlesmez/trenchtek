import React, { Component } from "react";
import "./Profile.css";
import { Row, Col, Icon } from "antd";
import firebase from "./Firebase.js";
// import Modal from 'react-modal';
//Reg: "http://static.tvtropes.org/pmwiki/pub/images/reg_anime.jpg"
// Banner from https://www.google.com/search?q=codding+banner&rlz=1C1CHBF_enUS765US765&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjm7KW7sNPbAhVJ3VMKHWUZBioQ_AUICigB&biw=1536&bih=734&dpr=1.25#imgrc=vAFXqrj7GeFLsM:}

let storageRef = firebase.storage().ref('images');
let dBase = firebase.database()

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: props.name,
      title: props.title,
      aboutMe: props.aboutMe,
      position: props.position,
      skills: props.skills,
      readmode: true,
      newSkill: "",
      inputclass: "inputfield",
      email: props.email,
      github: props.github,
      LinkedIn: props.LinkedIn,
      banner: "",
      profURL: props.profURL,
      uidString: props.uidString
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      github: nextProps.github,
      LinkedIn: nextProps.LinkedIn,
      skills: nextProps.skills,
      name: nextProps.name,
      position: nextProps.position,
      aboutMe: nextProps.aboutMe,
      title: nextProps.title,
      uidString: nextProps.uidString,
      email: nextProps.email,
      profURL: nextProps.profURL
    });
    console.log(this.state.pro)
  }

  handleChange = (e) => { // handles changes in text entries
    this.setState({
      [e.target.name]: e.target.value //Need those brackets
    });
  };
  editPress = e => {
    // Passed as prop to switch editing mode on click
    this.setState({
      editing: !this.state.editing,
      readmode: !this.state.readmode,
      inputclass: "inputbox"
    });
  };
  saveClick = e => {
    //Firebasewrite
    this.setState({
      editing: !this.state.editing,
      readmode: !this.state.readmode,
      inputclass:"inputfield"});
      if(this.state.uidString !== ""){
        dBase.ref(this.state.uidString)  // UPDATING FIREBASE HERE
          .update({
            name:this.state.name,
            tags:this.state.skills,
            email:this.state.email,
            github:this.state.github,
            LinkedIn:this.state.LinkedIn,
            about: this.state.aboutMe,
            position: this.state.position
          });
      } else{
        console.log("Don't push b/c not in user!")
      }
  }

  addClick = (e) =>{ //First array ever
     if ((this.state.skills === undefined) || (this.state.skills === "")) {
      let firstSkills = [];
      firstSkills.push(this.state.newSkill);
      this.setState({skills: firstSkills,newSkil:""});
      }
      else {  // Existing array
      this.setState({
      skills: [...this.state.skills, this.state.newSkill],
      newSkill: ""
    });
  }

  };
  deleteClick = e => {
    // Deleting tags
    let skillDelete = e.target.name;
    let index = this.state.skills.indexOf(skillDelete);
    let copySkills = this.state.skills;
    copySkills.splice(index, 1);
    this.setState({
      links: copySkills
    });
  };
  firePost = e => {
    let reader = new FileReader(); // API for proccessing files
    let file = e.target.files[0];
    reader.onloadend = () => {
      let profPicRef = storageRef.child(this.state.uidString)
      let task = profPicRef.put(file);
      this.setState({profURL: reader.result });
    //   task.on("state_changed", snapshot => {
    //     let percentage = (snapshot.bytesTransferred/ snapshot.totalBytes) *100;
    //     if(percentage==100){
    //         profPicRef.getDownloadURL().then(url => {
    //           console.log("yo?")
    //            // You will get the Url here.
    //           if(this.state.uidString !== ""){
    //           dBase.ref(this.state.uidString)
    //             .update({profURL:url}) };
    //   });
    // }});
    };
    reader.onerror = e => {
      console.log("Failed file read: " + e.toString());
    };
    reader.readAsDataURL(file);
  };
  componentDidMount() {
    // Updates the picture
    // Get the download URL
    }
  render() {
    let button; // Conditional rendering
    let skillSpan;
    let newSkill;
    let linksPart;
    let profypic;
    if (this.state.editing == false) {    // FOR NOMRAL PAGE
      button = <button type= "edit" onClick={e=>this.editPress(e)}>Edit</button> //Editbutton
      
      this.state.skills !=="" ?(skillSpan = this.state.skills.map((skill) => {  //For displaying skills (also removable)
        return(
         <span> #{skill} </span>
        )
      })
    ): null;  // Dank conditional rendering from Noah
      
      linksPart = <div>
              <p>
                Contact: <a href= {this.state.email}> {this.state.email}</a>
              </p> 
              <span>
             <a href={this.state.github}> github,</a>
             <a href={this.state.LinkedIn}> LinkedIn</a>
             </span>
             </div>
      
      profypic = <img className="profpic" src= {this.state.profURL} alt = "Prof pic"/> 
      
    } else {  // All of the input fields
      button = <button type= "save" onClick={e => this.saveClick(e)}>Save</button> 
      
      this.state.skills !== "" ? (skillSpan = this.state.skills.map((skill) => { // Same dank conditional rendering
        return(
         <span> 
           #{skill} 
           <Icon id="smallicon" type="close-circle" name = {skill} onClick ={e=>this.deleteClick(e)}/>
         </span>
        )})):null;      

      newSkill = (
        <div>
          <input
            name="newSkill"
            type="text"
            pattern="[A-Za-z]{0-9}{15}"
            placeholder="#New skill"
            size="10"
            onChange={e => this.handleChange(e)}
            value={this.state.newSkill}
          />
          <Icon
            id="smallicon"
            type="plus-circle"
            onClick={e => this.addClick(e)}
          />
        </div>
      );

      linksPart = (
        <div>
          <p>
            Contact:{" "}
            <input
              type="url"
              placeholder="your@email.com"
              name="email"
              value={this.state.email}
              onChange={e => this.handleChange(e)}
            />
          </p>
          <span>
            <input
              name="github"
              type="url"
              placeholder="github"
              value={this.state.github}
              onChange={e => this.handleChange(e)}
            />{" "}
            {/*Need to handleChange*/}
            <input
              type="url"
              placeholder="LinkedIn"
              name="LinkedIn"
              value={this.state.LinkedIn}
              onChange={e => this.handleChange(e)}
            />
          </span>
        </div>
      );

      profypic = (
        <div>
          <img className="profpic" src={this.state.profURL} alt="profpic" />
          <input
            type="file"
            name="profpic"
            accept="image/"
            onChange={e => this.firePost(e)}
            style={{ marginLeft: "30px", paddingTop: "5px" }}
          />
        </div>
      );
    }

    return (
      <div>
        <div className="center">
          <div id="imgcontainer">
            <img
              className="banner"
              src="http://www.twitrcovers.com/wp-content/uploads/2013/02/Programming-Code-l.jpg"
              alt="banner"
            />
            <Row type="flex" gutter={4}>
              <Col span={6}>
                {profypic}
                <div className="underpic">
                  <input
                    id="inputfield"
                    type="text"
                    name="title"
                    value={this.state.title}
                    size="10"
                    readOnly /*Size is useful*/
                  />
                </div>
              </Col>

              <Col span={12}>
                <div id="userfo">
                  <input
                    id={this.state.inputclass}
                    type="text"
                    className="header"
                    name="name" // USERNAME!!!
                    value={this.state.name}
                    onChange={e => this.handleChange(e)}
                    readOnly={this.state.readmode}
                    maxLength="35"
                  />

                  <input
                    id={this.state.inputclass}
                    type="text"
                    name="position"
                    style={{ textAlign: "center" }} //Inline styling
                    value={this.state.position}
                    placeholder= "RevTekker"
                    onChange={e => this.handleChange(e)}
                    readOnly={this.state.readmode}
                    maxLength="35"
                  />

                  <h3> About me! </h3>

                  <div id="aboutme">
                    <textarea
                      id={this.state.inputclass}
                      placeholder= "Write something!"
                      type="text"
                      name="aboutMe"
                      value={this.state.aboutMe}
                      style={{ width: "100%", height: "100%" }}
                      onChange={e => this.handleChange(e)}
                      readOnly={this.state.readmode}
                      maxLength="400"
                    />
                  </div>
                </div>
              </Col>
              <Col span={6}>
                {button}
                <div id="sidefo">
                  <div>
                    Skills: {skillSpan}
                    {newSkill}
                  </div>
                  {linksPart}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "./Profile.css";
import { Row, Col, Icon, Input, Button} from "antd";
import firebase from "./Firebase.js";
const {TextArea} = Input;
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
      profURL: props.profURL,
      uidString: props.uidString,
      upvotes: props.upvotes,
    }
  }
  componentWillReceiveProps(nextProps){ // Picture takes time to load oldschool lifecycle
    this.setState({
      profURL: nextProps.profURL,
      email: nextProps.email,
      github: nextProps.github,
      LinkedIn: nextProps.LinkedIn,
      profURL: nextProps.profURL,
      uidString: nextProps.uidString,
      name: nextProps.name,
      title: nextProps.title,
      aboutMe: nextProps.aboutMe,
      position: nextProps.position,
      skills: nextProps.skills,
      upvotes: nextProps.upvotes,
    });
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
      if(this.state.uidString !== "" && this.state.uidString !== undefined){
        let pos = this.state.position;
        let linked = this.state.LinkedIn;
        let git = this.state.github;
        if(pos === undefined){  //Porblem with .update NEXT TIME DO FUNCTIONALITY FIRST!!!!
          pos = "";
        }
        if(linked === undefined){
          linked = "";
        }
        if(git === undefined){
          git = "";
        }
        dBase.ref(this.state.uidString)  // UPDATING FIREBASE HERE
          .update({
            name:this.state.name,
            tags:this.state.skills,
            email:this.state.email,
            github: git,
            linkedIn: linked,
            about: this.state.aboutMe,
            position: pos
          });
      } else{
        console.log("UserID did not pass down!");
      }
  }

  addClick = (e) =>{ //First array ever
     if ((this.state.skills === undefined) && (this.state.skills === "")) {
      let firstSkills = [];
      firstSkills.push(this.state.newSkill);
      this.setState({skills: firstSkills,newSkil:""});
      }
      else {  // Existing array
        if(this.state.newSkill != ""){
      this.setState({
      skills: [...this.state.skills, this.state.newSkill],
      newSkill: ""
    });
  }
    else{
      console.log("Put some text in the shiz")
    }
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
    };
    reader.onerror = e => {
      console.log("Failed file read: " + e.toString());
    };
    reader.readAsDataURL(file);
  };
  
  render() {
    let button; // Conditional rendering
    let skillSpan;
    let newSkill;
    let linksPart;
    let profypic;
    if (this.state.editing == false) {    // FOR NOMRAL PAGE
      button = <Button type= "edit" onClick={e=>this.editPress(e)}>Edit</Button> //Editbutton
      
      this.state.skills !=="" ?(skillSpan = this.state.skills.map((skill) => {  //For displaying skills (also removable)
        return(
         <span> #{skill} </span>
        )
      })
    ): null;  // Dank conditional rendering from Noah
      
      linksPart = <div>
              <p>
                <strong> Contact: </strong><a href= {this.state.email}> {this.state.email}</a>
              </p> 
              <span>
             <a href={this.state.github}> <Icon type= "github"/></a>
             <a href={this.state.LinkedIn}>   <Icon type = "linkedin"/></a>
             </span>
             </div>
      
      profypic = 
      <div className="imageCropper">
        <img className="profpic" src= {this.state.profURL} alt = "Prof pic"/> 
      </div>
    } else {  // All of the input fields
      button = <Button type= "save" onClick={e => this.saveClick(e)}>Save</Button> 
      
      this.state.skills !== "" ? (skillSpan = this.state.skills.map((skill) => { // Same dank conditional rendering
        return(
         <span> 
           #{skill} 
           <Icon id="smallicon" type="close-circle" name = {skill} onClick ={e=>this.deleteClick(e)}/>
         </span>
        )})):null;      

      newSkill = (
        <div>
          <Input
            name= "newSkill"
            type="text"
            pattern="[A-Za-z]{0-9}"
            maxLength="10"
            placeholder="#New skill"
            onChange={e => this.handleChange(e)}
            value={this.state.newSkill}
            width= "10"
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
            <TextArea
              type="url"
              placeholder="your@email.com"
              name="email"
              value={this.state.email}
              onChange={e => this.handleChange(e)}
              autosize
            />
          </p>
          <span><Icon type="github" />
            <TextArea
              name="github"
              type="url"
              placeholder="github"
              value={this.state.github}
              onChange={e => this.handleChange(e)}
              pattern="https?://.+"
              title="Include http://"
              autosize
            />{" "}
            <Icon type="linkedin" />
            <TextArea
              type="url"
              placeholder="LinkedIn"
              name="LinkedIn"
              value={this.state.LinkedIn}
              onChange={e => this.handleChange(e)}
              pattern="https?://.+"
              title="Include http://"
              required
              autosize
            />
          </span>
        </div>
      );

      profypic = (
        <div>
        <div className = "imageCropper">
          <img className="profpic" src={this.state.profURL} alt="Profy!!! :)" />
          </div>
          <input
            type="file"
            name="profpic"
            accept="image/"
            onChange={e => this.firePost(e)}
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
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEWNpdVrXtv+AAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC"
              alt="banner"
            />
            <Row type="flex" gutter={4}>
              <Col span={8} syle={{'margin-left':'3%'}}>
                {profypic}
                <div className="underpic">
                  <h3>
                  {this.state.title}
                  </h3>
                </div>
              </Col>

              <Col span={10}>
                <div id="userfo">
                  <input
                    id={this.state.inputclass}
                    type="text"
                    className="header"
                    name="name" // USERNAME!!!
                    value={this.state.name}
                    onChange={e => this.handleChange(e)}
                    readOnly={this.state.readmode}
                    maxLength="17"
                  />

                  <TextArea
                    id={this.state.inputclass}
                    type="text"
                    name="position"
                    style={{ textAlign: "center" }} //Inline styling
                    value={this.state.position}
                    placeholder= "Current Job Title"
                    onChange={e => this.handleChange(e)}
                    readOnly={this.state.readmode}
                    maxLength="20"
                    autosize={{maxRows:1}}
                  />

                  <h3> About me! </h3>

                  <div id="aboutme">
                    <TextArea
                      id={this.state.inputclass}
                      placeholder= "Write something!"
                      type="text"
                      name="aboutMe"
                      value={this.state.aboutMe}
                      onChange={e => this.handleChange(e)}
                      readOnly={this.state.readmode}
                      autosize={{minRows:10, maxRows:12}}
                    />
                  </div>
                </div>
              </Col>
              <Col span={6}>
                {button}
                <div id="sidefo">
                  <div>
                    <strong> Skills:</strong> {skillSpan}
                    {newSkill}
                  </div>
                  {linksPart}
                  <div style={{"margin-top": "30px"}}>
                  <strong> You have </strong> {this.state.upvotes} <Icon type="like" />
                  </div>
                </div>
                
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

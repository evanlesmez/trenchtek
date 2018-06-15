import React, { Component } from "react";
import TopbarUser from "./TopbarUser.js";
import "./Profile.css";
import { Row, Col, Icon } from 'antd';
import firebase from "./Firebase";
// import Modal from 'react-modal'; 

// Banner from https://www.google.com/search?q=codding+banner&rlz=1C1CHBF_enUS765US765&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjm7KW7sNPbAhVJ3VMKHWUZBioQ_AUICigB&biw=1536&bih=734&dpr=1.25#imgrc=vAFXqrj7GeFLsM:}
export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      editing: false,
      name: props.userData.name,
      title: props.userData.title,
      aboutMe: props.userData.aboutMe,
      position: props.userData.position,
      skills: props.userData.skills,
      links: props.userData.links,
      readmode: true,
      newSkill: "",
      inputclass: "inputfield"
    }
  }
  
  handleChange = (e) => { // handles changes in text entries
    this.setState({
          [e.target.name]: e.target.value //Need those brackets 
    })
  }
  editPress = (e) =>{ // Passed as prop to switch editing mode on click
    this.setState({
      editing: !this.state.editing,
      readmode: !this.state.readmode,
      inputclass: "inputbox"
    })
  }
  saveClick = (e) =>{ //Firebasewrite
    this.setState({
      editing: !this.state.editing,
      readmode: !this.state.readmode,
      inputclass:"inputfield"});
  }
  
  deleteClick = (e) =>{ // Deleting tags
    let skillDelete = e.target.name;
    console.log(this.state.skills);
    let index = this.state.skills.indexOf(skillDelete);
    let copySkills = this.state.skills;
    copySkills.splice(index,1);
    this.setState({
      links: copySkills
    })
  }

  render() {
    let button; // Conditional rendering
    let skillSpan;
    let newSkill;
    let linksPart;
    if (this.state.editing == false) {
      button = <button type= "edit" onClick={e=>this.editPress(e)}>Edit</button>
      skillSpan = this.state.skills.map((skill) => {
        return(
         <span> #{skill} </span>
        )
      });
      linksPart = <div>
              <p>
                Contact: <a href= {this.state.links.email}> {this.state.links.email}</a>
              </p> 
              <span>
             <a href={this.state.links.github}> github,</a>
             <a href={this.state.links.LinkedIn}> LinkedIn</a>
             </span>
             </div>
    } else {
      button = <button type= "save" onClick={e => this.saveClick(e)}>Save</button> 
      skillSpan = this.state.skills.map((skill) => {
        return(
         <span> 
           #{skill} 
           <Icon id="smallicon" type="close-circle" name = {skill} onClick ={e=>this.deleteClick(e)}/>
         </span>
        )});
      newSkill = 
      <div>
      <input name= "newSkill" type = "text" pattern ="[A-Za-z]{0-9}{15}" 
        placeholder="#New skill" size= "10"
         onChange= {e => this.handleChange(e)} value ={this.state.newSkill} ></input>
         <Icon id="smallicon" type="plus-circle"/>
      </div>
      linksPart = <div>
      <p>
        Contact: <a href= {this.state.links.email}> {this.state.links.email}</a>
      </p> 
      <span>
     <input type = "url" placeholder="github" value={this.state.links.github} ></input>  {/*Need to handleChange*/}
     <input type= "url" placeholder="LinkedIn" value={this.state.links.LinkedIn}></input>
     </span>
     </div>
    }
    
    return (
      <div >
        <div className="center">
          <div id="imgcontainer">
          <img className = "banner" src = "http://www.twitrcovers.com/wp-content/uploads/2013/02/Programming-Code-l.jpg" alt = "banner"/>
          <Row type= "flex" gutter= {15}>
            <Col span= {4}>
            <img className="profpic" src= "http://static.tvtropes.org/pmwiki/pub/images/reg_anime.jpg" alt = "Prof pic"/> 
            <div className ="underpic">
            <input id = "inputfield" type="text" name = "title" value={this.state.title} size= "10" /*Size is useful*/ />
            </div>
            </Col>

            <Col span ={14}>
            <div id= "userfo" >
            <input id = {this.state.inputclass} type="text" className="header" name = "name" 
            value={this.state.name} onChange= {e => this.handleChange(e)} readOnly={this.state.readmode} maxLength='35'/> 

            <input id = {this.state.inputclass} type="text" name = "position" style={{'text-align':"center"}} //Inline styling
            value={this.state.position} onChange= {e => this.handleChange(e)} readOnly={this.state.readmode} maxLength='35'/>

            <h3> About me! </h3>

            <div id="aboutme">
            <textarea id = {this.state.inputclass} type="text" name = "aboutMe" value={this.state.aboutMe} 
            style={{"width": "100%", "height":"100%"}}
            onChange= {e => this.handleChange(e)} readOnly={this.state.readmode} maxLength="200"/>
            </div>
            
            </div>
            </Col>
            <Col span = {6}>
            {button}
            <div id= "sidefo">
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

import React, { Component } from "react";
import TopbarUser from "./TopbarUser.js";
import "./Profile.css";
import { Row, Col } from 'antd';

// Banner from https://www.google.com/search?q=codding+banner&rlz=1C1CHBF_enUS765US765&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjm7KW7sNPbAhVJ3VMKHWUZBioQ_AUICigB&biw=1536&bih=734&dpr=1.25#imgrc=vAFXqrj7GeFLsM:}
export default class ProfileEditor extends Component {
  constructor(props){
    super(props)
    this.state = {
      editing: false,
      name: props.userData.name,
      aboutMe: props.userData.AboutMe,
      position: props.userData.position,
      skills: props.userData.skills
    }
  }
  render() {
    const skillSpan = this.props.userData.skills.map((skill) => {
      return(
      <span> #{skill} </span>
      )
    });
    return (
      <div >
        <div className="center">
          <div id="imgcontainer">
          <img className = "banner" src = "http://www.twitrcovers.com/wp-content/uploads/2013/02/Programming-Code-l.jpg" alt = "banner"/>
          <Row type= "flex" gutter= {15}>
            <Col span= {4}>
          <img className="profpic" src= "http://static.tvtropes.org/pmwiki/pub/images/reg_anime.jpg" alt = "Prof pic"/> 
            <div id = "underpic">
            {this.props.userData.title} 
            </div>
            </Col>
            <Col span ={18}>
            <div id= "userfo" >
            <h1 className="header"> {this.props.userData.name} </h1> 
            <h2> {this.props.userData.position} </h2>
            <h3> About me: </h3>
            <p> {this.props.userData.aboutMe}</p>
            <div id= "bottomfo">
              <div>
               Skills: {skillSpan}
              </div>
             <p>
                Contact: <a href= {this.props.userData.links.email}> {this.props.userData.links.email}</a>
              </p> 
              <span>
             <a href={this.props.userData.links.github}> {this.props.userData.links.github},</a>
             <a href={this.props.userData.links.linkedIn}> {this.props.userData.links.linkedIn}</a>
             </span>
            </div>
            </div>
            </Col>
            <Col span = {2}>
            <button type= "edit" onClick={e=>this.props.editPress(e)}> Save </button>
            </Col>
          </Row>
          </div>  
        </div>
      </div>
    );
  }
}

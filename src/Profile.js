import React, { Component } from "react";
import TopbarUser from "./TopbarUser.js";
import "./Profile.css";
import { Row, Col } from 'antd';

// Banner from https://www.google.com/search?q=codding+banner&rlz=1C1CHBF_enUS765US765&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjm7KW7sNPbAhVJ3VMKHWUZBioQ_AUICigB&biw=1536&bih=734&dpr=1.25#imgrc=vAFXqrj7GeFLsM:}
export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      editing: false,
      name: props.name,
      aboutMe: props.AboutMe,
      jobTitle: props.jobTitle,
      skills: props.skills
    }
  }
  render() {
    const skillSpan = this.props.skills.map((skill) => {
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
            </Col>
            <Col span ={20}>
            <div id= "userfo" >
            <h1 > {this.props.name} </h1>
            <h2> Job Title </h2>
            <h3> About me: </h3>
            <p> {this.props.aboutMe}</p>
            <div id= "bottomfo">
              <div>
               Skills: {skillSpan}
              </div>
             <p>
                Contact: <a href= {this.props.links.email}> {this.props.links.email}</a>
              </p> 
              <span>
             <a href={this.props.links.github}> {this.props.links.github},</a>
             <a href={this.props.links.linkedIn}> {this.props.links.linkedIn}</a>
             </span>
            </div>
            </div>
            </Col>
          </Row>
          </div>  
          <div className ="profside">
          <button type= "edit"> Edit Pic </button>
          </div>
        </div>
      </div>
    );
  }
}

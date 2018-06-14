import React, { Component } from "react";
import TopbarCompany from "./TopbarCompany.js";
import "./Meet.css"
import { Input, Card } from "antd";
import "antd/dist/antd.css";
export default class Meet extends Component {

  state = {
    instructors: [{
      name: "Bruno", tags: "#Javascipt #Python",
      info: "Bruno is a wonderful instructor. He taugh for 5 years in Cambridge, but got kicked out for sleeping with one of his students. Despite his misconducts, Bruno is still considered one of the top 10 instuctors of the world and attends talks at various universities and schools. His interests include software engineering, playing the banjo, trombone, and the pipes. He has a flamboyant personality and is very friendly to both humans and animals. "
    },
    { name: "Eliza", tags: "#legitknowseverything", info: " Eliza is hands down the best software engineer that has ever lived. Apart from that, she is quite the business woman. In contrast to common knowledge, she was the creator of Google, Facebook, Twitter, Amazon, Apple and Microsoft. Even though she has had her ideas stolen too many times, Eliza remains content with her contributions to the world and now teaches in our company in order to pass down her knowledge and experiences to our own lucky interns" }],
    seniorDevs: [{
      name: "Bruno", tags: "#Javascipt #Python",
      info: "Bruno is a wonderful instructor. He taugh for 5 years in Cambridge, but got kicked out for sleeping with one of his students. Despite his misconducts, Bruno is still considered one of the top 10 instuctors of the world and attends talks at various universities and schools. His interests include software engineering, playing the banjo, trombone, and the pipes. He has a flamboyant personality and is very friendly to both humans and animals. "
    },
    { name: "Eliza", tags: "#legitknowseverything", info: " Eliza is hands down the best software engineer that has ever lived.Apart from that, she is quite the business woman. In contrast to common knowledge, she was the creator of Google, Facebook, Twitter, Amazon, Apple and Microsoft. Even though she has had her ideas stolen too many time, Eliza remains content with her contributions to the world and now teaches in our company in order to pass down her knowledge and experiences to our own lucky interns" }]
  }
  render() {
    return (
      <div>
        <TopbarCompany />

        <div>
          <p className="searchInfo"> Search keywords for detailed information about out large network of interns and alumni</p>
          <form className="searchComponent">
            <Input className="search" placeholder="input search text" type="text" size="default" />

            <span class="ant-input-suffix"><button type="button" class="ant-btn ant-input-search-button ant-btn-primary"><i class="anticon anticon-search"></i></button></span>
          </form>

        </div>

        <div>
          <div className="instuctors">
            <h1 > Our Instructors</h1>

          </div>


          <div className="infocard">

            {this.state.instructors.map(instructor => {
              return (
                <div className="individualCards" >
                  <Card className="InstructorCard" style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                    <div className="custom-image">
                      <img alt="example" width="100%" src="https://www.shrs.pitt.edu/sites/default/files/default_images/default-person.jpg" />
                    </div>
                    <div className="custom-card">
                      <div className="textOfCard">
                        <h3>{instructor.name}</h3>
                        {/* <p>linkedIn</p> */}
                      </div>
                    </div>
                  </Card>
                  <div className="texty"> <div><p>{instructor.info}</p> <h5>Tags: {instructor.tags}</h5></div> </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="seniorDevs">
            <h1 > Our Senior Developers</h1>

          </div>


          <div className="infocard">

            {this.state.instructors.map(instructor => {
              return (
                <div className="individualCards" >
                  <Card className="InstructorCard" style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                    <div className="custom-image">
                      <img alt="example" width="100%" src="https://www.shrs.pitt.edu/sites/default/files/default_images/default-person.jpg" />
                    </div>
                    <div className="custom-card">
                      <div className="textOfCard">
                        <h3>{instructor.name}</h3>
                        {/* <p>linkedIn</p> */}
                      </div>
                    </div>
                  </Card>
                  <div className="texty"> <div><p>{instructor.info}</p> <h5>Tags: {instructor.tags}</h5></div> </div>
                </div>
              );
            })}
          </div>


        </div>
      </div>
    );
  }
}

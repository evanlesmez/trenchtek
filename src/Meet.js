import React, { Component } from "react";
import TopbarCompany from "./TopbarCompany.js";
import "./Meet.css"
import { Input, Card } from "antd";
import "antd/dist/antd.css";
export default class Meet extends Component {

  state = {
    instructors: [{
      name: "Bruno", tags: "#Javascipt #Python",
      info: <p>The name Braid signifies the interweaving of individuals, teams, skill sets and experiences, where the resulting whole is stronger than the sum of its&nbsp;parts.</p> <p>We are better together. This not only true of Braid’s internal team, but also of our collaborations with partners and&nbsp;vendors.</p> <p>Our belief is that a rising tide lifts all boats. As a result, we value cooperation over competition, and service above being served.</p>
    },
    { name: "eliza", tags: "nothing", info: "The name Braid signifies the interweaving of individuals, teams, skill sets and experiences, where the resulting whole is stronger than the sum of its parts.</p><p>We are better together. This not only true of Braid’s internal team, but also of our collaborations with partners and vendors.</p><p>Our belief is that a rising tide lifts all boats. As a result, we value cooperation over competition, and service above being served." }],
    seniorDevs: []
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
                <div>
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
            <h1 > Our Senior Developers </h1>
          </div>

        </div>
      </div>
    );
  }
}

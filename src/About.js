import React, { Component } from "react";
import TopbarCompany from "./TopbarCompany.js";
import "./About.css"


export default class About extends Component {
  render() {
    return (
      <div>
        <div>
          <TopbarCompany />

        </div>
        <div className="contents">
          <div id="history">
            <h1 className="historyTitle">Our <span>History</span></h1>
            <div className="eliza"><p>The name Braid signifies the interweaving of individuals, teams, skill sets and experiences, where the resulting whole is stronger than the sum of its&nbsp;parts.</p><p>We are better together. This not only true of Braid’s internal team, but also of our collaborations with partners and&nbsp;vendors.</p><p>Our belief is that a rising tide lifts all boats. As a result, we value cooperation over competition, and service above being served.</p>
            </div>
          </div>


          <div id="interns">
            <h1 className="historyTitle">Our <span>Interns</span></h1>
            <div className="eliza"><p>The name Braid signifies the interweaving of individuals, teams, skill sets and experiences, where the resulting whole is stronger than the sum of its&nbsp;parts.</p><p>We are better together. This not only true of Braid’s internal team, but also of our collaborations with partners and&nbsp;vendors.</p><p>Our belief is that a rising tide lifts all boats. As a result, we value cooperation over competition, and service above being served.</p>
            </div>

          </div>

          <div id="companies">
            <h1 className="historyTitle">Our <span>Companies</span></h1>
            <div className="eliza"><p>The name Braid signifies the interweaving of individuals, teams, skill sets and experiences, where the resulting whole is stronger than the sum of its&nbsp;parts.</p><p>We are better together. This not only true of Braid’s internal team, but also of our collaborations with partners and&nbsp;vendors.</p><p>Our belief is that a rising tide lifts all boats. As a result, we value cooperation over competition, and service above being served.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

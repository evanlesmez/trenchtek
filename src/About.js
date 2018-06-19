import React, { Component } from "react";
import TopbarCompany from "./TopbarCompany.js";
import "./About.css"
import EditingForm from "./EditingForm"
import { Button } from 'antd';

export default class About extends Component {


  state = {
    history: "RevTek was founded by Mik Jagger in 1998. The mission of our company initially was to teach students living in empoverished areas the importance of computer science. Now, 20 years later, our mission of education remains, but is extended to anyone around the world. Our first company burn down in 2002, but thanks to the support of the community, we were able to gain our space once more and continue educating people of all ages.",
    interns: "Our interns join our community in order to learn a skill of their interest. Of course, they are not merely given the information that they need to learn, but instead are given the necessary resources to search for the answers themselves. Then, in order for them to grasp the material, they are assigned individual and group projects. Our teaching process has been proved to be the most successful process, especially for software engineers",
    companies: "Companies can visit this website and explore our Senior Developers and Instructors in full detail. Apart from that, companies can search fro skills they require for their contract and see how many people in our community posess such skill. Then, they may submit a contract through our website, which we were either approve or deny, depending on the skills it requires",
    historyEdit: false,
    internsEdit: false,
    companiesEdit: false
  }
  handleEditH = () => {

    this.setState({
      historyEdit: true
    }

    )
    console.log(this.state.edit)
    console.log(this.state)

  }
  handleEditI = () => {
    this.setState({
      internsEdit: true
    }

    )
  }

  handleEditC = () => {
    this.setState({
      companiesEdit: true
    }

    )
    console.log(this.state.companiesEdit)
  }

  handlerH = (e) => {
    this.setState(
      {
        history: e.target.value,
        historyEdit: false
      }
    )

  }

  handlerI = (e) => {
    this.setState(
      {
        interns: e.target.value,
        internsEdit: false
      }
    )
  }

  handlerC = (e) => {
    this.setState(
      {
        companies: e.target.value,
        companiesEdit: false
      }
    )
  }
  render() {


    let historyText = this.state.history;
    let internsText = this.state.interns;
    let companiesText = this.state.companies

    if (this.state.historyEdit === true) {
      historyText = <EditingForm defaultValue={this.state.history} onPressEnter={(e) => this.handlerH(e)} />
    }

    if (this.state.internsEdit) {
      internsText = <EditingForm defaultValue={this.state.interns} onPressEnter={(e) => this.handlerI(e)} />
    }

    if (this.state.companiesEdit) {
      companiesText = <EditingForm defaultValue={this.state.companies} onPressEnter={(e) => this.handlerC(e)} />
    }
    return (
      <div>

        <div className="contents">
          <div id="history">
            <h1 className="historyTitle">Our <span className="word">History</span></h1>
            <div className="eliza"> {historyText}
            </div>
            <p className="edit"
              onClick={this.handleEditH}

            >  Edit</p>
          </div>


          <div id="interns">
            <h1 className="historyTitle">Our <span className="word">Interns</span></h1>
            <div className="eliza"> {internsText}
            </div>
            <p className="edit"
              onClick={this.handleEditI}

            >  Edit</p>

          </div>

          <div id="companies">
            <h1 className="historyTitle">Our <span>Companies</span></h1>
            <div className="eliza">{companiesText}
            </div>
            <p className="edit"
              onClick={this.handleEditC}

            > Edit </p>

          </div>

        </div>
      </div>


    );
  }
}

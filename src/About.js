import React, { Component } from "react";
import TopbarCompany from "./TopbarCompany.js";
import "./About.css"
import EditingForm from "./EditingForm"
import { Button } from 'antd';
import firebase from "./Firebase";

export default class About extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    history: "",
    interns: "",
    companies: "",
    historyEdit: false,
    internsEdit: false,
    companiesEdit: false
  }

  componentDidMount() {

    const ref = firebase.database().ref('about/');
    ref.on('value', (snapshot) => {
      let about = snapshot.val();
      let history = about.history;
      let interns = about.interns;
      let companies = about.companies;
      let newState = [];

      this.setState({
        history: history,
        interns: interns,
        companies: companies

      });
    });
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
    const ref = firebase.database().ref('about/');
    ref.update({
      history: e.target.value
    })

    this.setState(
      {
        history: e.target.value,
        historyEdit: false
      }
    )

  }

  handlerI = (e) => {
    const ref = firebase.database().ref('about/');
    ref.update({
      interns: e.target.value
    })
    this.setState(
      {
        interns: e.target.value,
        internsEdit: false
      }
    )
  }

  handlerC = (e) => {
    const ref = firebase.database().ref('about/');
    ref.update({
      companies: e.target.value
    })
    this.setState(
      {
        companies: e.target.value,
        companiesEdit: false
      }
    )
  }
  render() {

    let ref = firebase.database().ref("about/");

    ref.on("value", function (snapshot) {
      console.log(snapshot.val().companies);
    }, function (error) {
      console.log("Error: " + error.code);
    });
    let historyText = this.state.history;
    let internsText = this.state.interns;
    let companiesText = this.state.companies
    // let edit = null;

    // // if (this.props.userTitle === "admin") {
    // edit = <p className="edit"
    //   onClick={this.handleEditH}

    // >  Edit</p>
    // }


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
            <h1 className="historyTitle2">Our <span className="word">Companies</span></h1>
            <div className="eliza">{companiesText}
            </div>
            <p className="edit"
              onClick={this.handleEditC}

            >  Edit</p>

          </div>

        </div>
      </div>


    );
  }
}

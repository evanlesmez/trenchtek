import React, { Component } from "react";
import firebase from "./Firebase.js";
import { Collapse, Card, Button } from "antd";
const Panel = Collapse.Panel;

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromDatabase: []
    };
  }

  componentDidMount() {
    let database = firebase.database().ref("pendingCompanyContracts");
    database.on("value", snapshot => {
      let newStateFromDB = [];
      snapshot.forEach(function(snap) {
        let obj = { id: snap.key, arrayData: snap.val() };
        newStateFromDB.push(obj);
      });
      this.setState({
        dataFromDatabase: newStateFromDB
      });
    });
  }

  //called from admin Page
  // Add the contract to the list of rejected contracts in the database
  // Then, remove the contracct from the list of pending contracts in the database
  rejectContract(e) {
    firebase
      .database()
      .ref("pendingCompanyContracts")
      .child(e.target.className)
      .on("value", snapshot => {
        firebase
          .database()
          .ref("rejectedCompanyContracts")
          .push(snapshot.val());
      });
    firebase
      .database()
      .ref("pendingCompanyContracts")
      .child(e.target.className)
      .remove();
  }

  //takes the contract from "unapprovedCompanyContracts" from firebase and moves it to
  // approved contracts
  approveContract(e) {
    console.log(e.target.className);
    let database = firebase.database();
    let eventContract = database
      .ref("pendingCompanyContracts")
      .child(e.target.className);
    console.log(eventContract);
    eventContract.on("value", snapshot => {
      database.ref("approvedCompanyContracts").push(snapshot.val());
    });
  }

  render() {
    let stateArray = this.state.dataFromDatabase;
    let display = stateArray.map(item => {
      return (
        <div>
          <Collapse>
            <Panel header={item.arrayData.companyName}>
              <div id="contracts-bold">Company : </div>
              {item.arrayData.companyName} <br /> <br />
              <div id="contracts-bold">Timeframe : </div>
              {item.arrayData.jobTimeframe} <br /> <br />
              <div id="contracts-bold">Skills Requested :</div>
              {item.arrayData.specialSkills} <br /> <br />
              <div id="contracts-bold">Additional Details :</div>
              {item.arrayData.additionalDetails} <br /> <br />
              <div id="contracts-bold">Contact Email:</div>
              {item.arrayData.companyEmail}
              <br />
              <br />
              <center>
                <button
                  className={item.id}
                  onClick={e => this.approveContract(e)}
                  type="primary"
                >
                  Approve Contract
                </button>
                <button
                  className={item.id}
                  onClick={e => this.rejectContract(e)}
                  type="danger"
                >
                  Reject Contract
                </button>
              </center>
            </Panel>
          </Collapse>
        </div>
      );
    });

    return (
      <div>
        <br />
        <Card
          title={<div className="center-text">Manage Contracts</div>}
          style={{ width: 720, margin: "auto" }}
        >
          {display}
        </Card>
        <br />
      </div>
    );
  }
}

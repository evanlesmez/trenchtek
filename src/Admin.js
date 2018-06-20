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
    let database = firebase.database().ref("unapprovedCompanyContracts");
    database.on("value", snapshot => {
      let newStateFromDB = [];
      snapshot.forEach(function(snap) {
        let obj = { id: snap.key, arrayData: snap.val() };
        newStateFromDB.push(obj);
      });
      console.log(newStateFromDB);
      this.setState({
        dataFromDatabase: newStateFromDB
      });
    });
  }

  //called from admin Page
  // removes a contract permanately from the DB
  removeContract(e) {
    let database = firebase.database();
    database
      .ref("unapprovedCompanyContracts")
      .child(e.target.className)
      .remove();
  }

  //takes the contract from "unapprovedCompanyContracts" from firebase and moves it to
  // approved contracts
  approveContract(e) {
    let database = firebase.database();
    let key = e.target.className;
    //console.log(e.target.className);
    let eventContract = database
      .ref("unapprovedCompanyContracts")
      .child(e.target.className); //(e.target.className) //.arrayData;
    console.log(eventContract);
    eventContract.on("value", snapshot => {
      database.ref("approvedCompanyContracts").push(snapshot.val());
    });
    //database.ref("approvedCompanyContracts").child("1").set(eventContract) //push(eventContract);

    //database.ref("unapprovedCompanyContracts").child(e.target.className).remove();
  }

  render() {
    let stateArray = this.state.dataFromDatabase;
    console.log(stateArray);
    let display = stateArray.map(item => {
      return (
        <div>
          <Collapse>
            <Panel header={item.arrayData.companyName}>
              <div id="contracts-bold">Company : </div>
              {item.arrayData.companyName} <br /> <br />
              <div id="contracts-bold">Timeframe : </div>
              {item.arrayData.jobTimeframe} <br /> <br />
              <div id="contracts-bold">Job Type : </div>
              {item.arrayData.jobType} <br /> <br />
              <div id="contracts-bold">Skills Requested :</div>
              {item.arrayData.specialSkills} <br /> <br />
              <div id="contracts-bold">Additional Details :</div>
              {item.arrayData.additionalDetails} <br /> <br />
              <center>
                <Button
                  className="resource-submit-button"
                  onClick={e => this.approveContract(e)}
                  type="primary"
                >
                  Approve Contract
                </Button>
                <Button
                  className={item.id}
                  onClick={e => this.removeContract(e)}
                  type="danger"
                >
                  Reject Contract
                </Button>
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

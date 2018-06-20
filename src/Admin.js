import React, { Component } from "react";
import firebase from "./Firebase.js";
import { Collapse, Card, Select } from "antd";
const Panel = Collapse.Panel;

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromPending: [],
      dataFromApproved: [],
      dataFromRejected: [],
      contractsToView: "pending"
    };
  }

  handleViewChange = value => {
    this.setState({
      contractsToView: value
    });
  };

  componentDidMount() {
    let pendingDatabase = firebase.database().ref("pendingCompanyContracts");
    pendingDatabase.on("value", snapshot => {
      let newStateFromDB = [];
      snapshot.forEach(function(snap) {
        let obj = { id: snap.key, arrayData: snap.val() };
        newStateFromDB.push(obj);
      });
      this.setState({
        dataFromPending: newStateFromDB
      });
    });
    let approvedDatabase = firebase.database().ref("approvedCompanyContracts");
    approvedDatabase.on("value", snapshot => {
      let newStateFromDB = [];
      snapshot.forEach(function(snap) {
        let obj = { id: snap.key, arrayData: snap.val() };
        newStateFromDB.push(obj);
      });
      this.setState({
        dataFromApproved: newStateFromDB
      });
    });
    let rejectedDatabase = firebase.database().ref("rejectedCompanyContracts");
    rejectedDatabase.on("value", snapshot => {
      let newStateFromDB = [];
      snapshot.forEach(function(snap) {
        let obj = { id: snap.key, arrayData: snap.val() };
        newStateFromDB.push(obj);
      });
      this.setState({
        dataFromRejected: newStateFromDB
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
    firebase
      .database()
      .ref("approvedCompanyContracts")
      .child(e.target.className)
      .remove();
  }

  //takes the contract from "unapprovedCompanyContracts" from firebase and moves it to
  // approved contracts
  approveContract(e) {
    if (this.state.contractsToView === "pending") {
      let database = firebase.database();
      let eventContract = database
        .ref("pendingCompanyContracts")
        .child(e.target.className);
      eventContract.on("value", snapshot => {
        database.ref("approvedCompanyContracts").push(snapshot.val());
      });
      database
        .ref("pendingCompanyContracts")
        .child(e.target.className)
        .remove();
    } else if (this.state.contractsToView === "rejected") {
      let database = firebase.database();
      let eventContract = database
        .ref("rejectedCompanyContracts")
        .child(e.target.className);
      eventContract.on("value", snapshot => {
        database.ref("approvedCompanyContracts").push(snapshot.val());
      });
      database
        .ref("rejectedCompanyContracts")
        .child(e.target.className)
        .remove();
    }
  }

  render() {
    let stateArray;
    let titleWords;
    if (this.state.contractsToView === "pending") {
      stateArray = this.state.dataFromPending;
      titleWords = "Manage Pending Contracts";
    } else if (this.state.contractsToView === "approved") {
      stateArray = this.state.dataFromApproved;
      titleWords = "Manage Approved Contracts";
    } else if (this.state.contractsToView === "rejected") {
      stateArray = this.state.dataFromRejected;
      titleWords = "Manage Rejected Contracts";
    }
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
              {this.state.contractsToView !== "approved" && (
                <center>
                  <button
                    className={item.id}
                    onClick={e => this.approveContract(e)}
                    type="primary"
                  >
                    Approve Contract
                  </button>
                </center>
              )}
              {this.state.contractsToView !== "rejected" && (
                <center>
                  <button
                    className={item.id}
                    onClick={e => this.rejectContract(e)}
                    type="danger"
                  >
                    Reject Contract
                  </button>
                </center>
              )}
            </Panel>
          </Collapse>
          <br />
        </div>
      );
    });

    return (
      <div>
        <br />
        <center>
          <div style={{ display: "inline" }}>Display: </div>
          <Select
            defaultValue="pending"
            onChange={value => {
              this.handleViewChange(value);
            }}
          >
            <Select.Option value="pending">Pending Contracts</Select.Option>
            <Select.Option value="approved">Approved Contracts</Select.Option>
            <Select.Option value="rejected">Rejected Contracts</Select.Option>
          </Select>
        </center>
        <br />
        <Card
          title={<div className="center-text">{titleWords}</div>}
          style={{ width: 720, margin: "auto" }}
        >
          {display}
        </Card>
        <br />
      </div>
    );
  }
}

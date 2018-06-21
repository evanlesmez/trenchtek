import React, { Component } from "react";
import firebase from "./Firebase.js";
import { Card, Button, Collapse } from "antd";
import "./App.css";
const Panel = Collapse.Panel;

export default class BrowseContracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromDatabase: []
    };
  }

  componentDidMount() {
    let database = firebase.database().ref("approvedCompanyContracts");
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

  bidOnContract(e) {
    console.log("Successfully badened on a contract");
  }

  render() {
    let stateArray = this.state.dataFromDatabase;
    console.log(stateArray);
    let display = stateArray.map(item => {
      return (
        <div>
          <br />
          <Collapse>
            <Panel header={item.arrayData.companyName}>
              <div id="contracts-bold">Company : </div>
              {item.arrayData.companyName} <br /> <br />
              <div id="contracts-bold">Timeframe : </div>
              {item.arrayData.jobTimeframe} <br /> <br />
              <div id="contracts-bold">Skills Requested :</div>
              {item.arrayData.specialSkills} <br /> <br />
              <div id="contracts-bold">Details :</div>
              {item.arrayData.additionalDetails} <br /> <br />
              <center>
                <Button
                  className={item.id}
                  onClick={e => this.bidOnContract(e)}
                >
                  Bid on Contract
                </Button>
              </center>
            </Panel>
          </Collapse>
          <br />
        </div>
      );
    });

    return (
      <div>
        <center>
          <div class="directory-title">Approved Contracts</div>
        </center>
        <Card style={{ width: 720, margin: "auto" }}>{display}</Card>
        <br />
      </div>
    );
  }
}

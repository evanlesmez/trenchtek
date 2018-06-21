import React, { Component } from "react";
import firebase from "./Firebase.js";
import { Card, Button, Collapse } from "antd";
import "./App.css";
const Panel = Collapse.Panel;

export default class BrowseContracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromDatabase: [],
      biddingUserName: ""
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
    let contractID = e.target.id;
    let database = firebase.database();
    let eventContract = database
      .ref("approvedCompanyContracts")
      .child(e.target.name);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        let userKey = user.uid;
        let userIDString = "/users/" + userKey;
        let database = firebase.database().ref(userIDString);
        console.log(userIDString);
        //console.log(userIDString);
        database.on("value", snapshot => {
          //console.log(snapshot.val());
          let newNameState = snapshot.val().name;
          //console.log(newTitleState);
          this.setState({
            biddingUserName: newNameState
          });
          eventContract.child("BiddingUsers").push(newNameState);
        });
      } else {
        console.log("else statment from bowser");
      }
    });
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
                  name={item.id}
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

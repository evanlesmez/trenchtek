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
      biddedUsers: [],
      biddingUserName: "",
      bidAmount: "",
      bidsHidden: true
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
        let userDatabase = firebase.database().ref(userIDString);
        console.log(userIDString);
        //console.log(userIDString);
        userDatabase.on("value", snapshot => {
          //console.log(snapshot.val());
          let newNameState = snapshot.val().name;
          //console.log(newTitleState);
          this.setState({
            biddingUserName: newNameState
          });

      eventContract.child("BiddingUsers").child(newNameState).set(this.state.bidAmount);
        });
      } else {
        console.log("else statment from bowser");
      }
    });
  }

  displayBids = (e) => {
    let contractID = e.target.id
    let database = firebase.database();
    let eventContract = database
      .ref("approvedCompanyContracts")
      .child(e.target.name)
      .child("BiddingUsers");

      eventContract.on("value" , (snapshot) => {
       let newStateFromDB = [];
       snapshot.forEach(function(snap) {
         let key = snap.key;
         let obj = {key : key}
         newStateFromDB.push(obj);
         console.log(snap.key);
       });
       this.setState({
         biddedUsers : newStateFromDB,
         bidsHidden: false
       });
     });


  }

  stopDisplayBids(e){
    this.setState({
      bidsHidden: true
    });
  }

  render() {
    let stateArray = this.state.dataFromDatabase;
    let bidArray = this.state.biddedUsers;
    console.log(bidArray);
    let display = [];
    if(this.state.bidsHidden){
      display = stateArray.map(item => {
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
                <Button
                  name = {item.id}
                  className={item.id}
                  onClick={e => this.displayBids(e)}
                >
                  See current bids
                </Button>
              </center>
            </Panel>
          </Collapse>
          <br />
        </div>
      );
    });
    } else {
      display = bidArray.map(item => {
      return (
        <div>
              <div id="contracts-bold">Bids: </div>
              {item.key} <br />
          <br />
        </div>
      );

    });
    }

    return (
      <div>
        <br />
        {!this.state.bidsHidden ? (
          <div>
          <Card
          title="Bids on selected contract:"
          style={{ width: 720, margin: "auto" }}
          >
            {display}
            <Button
              onClick={e => this.stopDisplayBids(e)}
            >
              Browse All Contracts
            </Button>
          </Card>
          </div>
        ) : (
          <Card
          title={<div className="center-text">Approved Contracts</div>}
          style={{ width: 720, margin: "auto" }}
        >
          {display}
        </Card>
      )}

        <br />
      </div>
    );
  }
}

import React, { Component } from "react";
import firebase from "./Firebase.js";

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
        <div className="AdminDiv">
          Company : {item.arrayData.companyName} <br />
          Contract Details : {item.arrayData.jobTimeframe} for{" "}
          {item.arrayData.jobType} <br />
          Skills Requested : {item.arrayData.specialSkills} <br />
          Additional Details : {item.arrayData.additionalDetails} <br /> <br />
          <button className={item.id} onClick={e => this.approveContract(e)}>
            Approve Contract
          </button>
          <button className={item.id} onClick={e => this.removeContract(e)}>
            Reject Contract
          </button>
        </div>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create and manage your contracts here!</h1>
        </header>
        <br /> Existing Contracts: <br /> <br />
        {display}
      </div>
    );
  }
}

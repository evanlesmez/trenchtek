import React, { Component } from "react";
import TopbarUser from "./TopbarUser.js";
import firebase from "./Firebase.js";

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
        <div className="AdminDiv">
          Company : {item.arrayData.companyName} <br />
          Contract Details : {item.arrayData.jobTimeframe} for{" "}
          {item.arrayData.jobType} <br />
          Skills Requested : {item.arrayData.specialSkills} <br />
          Additional Details : {item.arrayData.additionalDetails} <br /> <br />
          <button className={item.id} onClick={e => this.bidOnContract(e)}>
            Bid on Contract
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

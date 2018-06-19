import React, { Component } from "react";

export default class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTitle: props.userTitle
    }
  }


  render() {
    return (<div>
      {this.state.userTitle}
    </div>
    );
  }
}

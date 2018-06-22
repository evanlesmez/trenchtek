import React, { Component } from "react";
import logo from "./logo.svg";
import "./Post.css";
import TypeIt from "typeit";

export default class Type extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    new TypeIt(this.el, this.props);
  }

  render() {
    return (
      <div
        className="webTitle"
        ref={el => {
          this.el = el;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

import React, { Component } from "react";
import TopbarCompany from "./TopbarCompany.js";
import "./Meet.css";
import "./Post.css";
import { Input, Card, Popover, Button } from "antd";
import "antd/dist/antd.css";
import EditingForm from "./EditingForm";

let content = (
  <div>
    "Bruno is a wonderful instructor. He taught for 5 years in Cambridge, but
    got kicked out for sleeping with one of his students. Despite his
    misconducts, Bruno is still considered one of the top 10 instuctors of the
    world and attends talks at various universities and schools. His interests
    include software engineering, playing the banjo, trombone, and the pipes. He
    has a flamboyant personality and is very friendly to both humans and
    animals. "
  </div>
);
export default class Meet extends Component {
  state = {
    array: [
      {
        name: "Eliza Evans",
        tags: "#Javascipt #Python",
        title: "Instructor",
        editI: false,
        pic:
          "https://hackcville.com/launch-profiles/headshots/SWEElizaEvans.jpg",
        info:
          "Bruno is a wonderful instructor. He taught for 5 years in Cambridge, but got kicked out for sleeping with one of his students. Despite his misconducts, Bruno is still considered one of the top 10 instuctors of the world and attends talks at various universities and schools. His interests include software engineering, playing the banjo, trombone, and the pipes. He has a flamboyant personality and is very friendly to both humans and animals. "
      },
      {
        name: "Marina Kun",
        tags: "#legitknowseverything",
        editI: false,
        title: "Instructor",
        pic:
          "https://hackcville.com/launch-profiles/headshots/SWEMarinaKun.jpg",
        info:
          " Eliza is hands down the best software engineer that has ever lived.Apart from that, she is quite the business woman. In contrast to common knowledge, she was the creator of Google, Facebook, Twitter, Amazon, Apple and Microsoft. Even though she has had her ideas stolen too many time, Eliza remains content with her contributions to the world and now teaches in our company in order to pass down her knowledge and experiences to our own lucky interns"
      },
      {
        name: "Sung Joon Park",
        tags: "#Javascipt #Python",
        editD: false,
        title: "Senior Developer",
        pic:
          "https://hackcville.com/launch-profiles/headshots/SWESungJoonPark.jpg",
        info:
          "Bruno is a wonderful instructor. He taught for 5 years in Cambridge, but got kicked out for sleeping with one of his students. Desite his misconducts, Bruno is still considered one of the top 10 instuctors of the world and attends talks at various universities and schools. His interests include software engineering, playing the banjo, trombone, and the pipes. He has a flamboyant personality and is very friendly to both humans and animals. "
      }
    ]
  };

  handlerI = (e, i) => {
    let instArray = this.state.array;
    instArray[i].editI = false;
    instArray[i].info = e.target.value;
    this.setState({ array: instArray });
  };

  handlerD = (e, i) => {
    let devArray = this.state.array;
    devArray[i].editD = false;
    devArray[i].info = e.target.value;
    this.setState({ array: devArray });
  };

  handleInEdit = ind => {
    let instArray = this.state.array;
    instArray[ind].editI = true;
    this.setState({ array: instArray });
  };

  handleDevEdit = ind => {
    let devArray = this.state.array;
    devArray[ind].editD = true;
    this.setState({ array: devArray });

    console.log(this.state);
  };
  render() {
    let edit = (
      <p className="editInfo" onClick={this.handleEditH}>
        {" "}
      </p>
    );

    if (this.props.userTitle === "admin") {
      edit = (
        <p className="edit" onClick={this.handleEditH}>
          {" "}
          Edit
        </p>
      );
    }

    let array = [];
    for (let i = 0; i < this.state.array.length; i++) {
      if (!array.includes(this.state.array[i].info))
        array.push(this.state.array[i].info);
    }
    for (let i = 0; i < array.length; i++) {
      if (this.state.array[i].editI) {
        array[i] = (
          <EditingForm
            defaultValue={this.state.array[i].info}
            onPressEnter={e => this.handlerI(e, i)}
          />
        );
      }
    }

    /*let arrayDev = [];
    for (let i = 0; i < this.state.seniorDevs.length; i++) {
      if (!arrayDev.includes(this.state.seniorDevs[i].info))
        arrayDev.push(this.state.seniorDevs[i].info);
    }
    for (let i = 0; i < arrayDev.length; i++) {
      if (this.state.seniorDevs[i].editD) {
        arrayDev[i] = (
          <EditingForm
            defaultValue={this.state.seniorDevs[i].info}
            onPressEnter={e => this.handlerD(e, i)}
          />
        );
      }
    }*/
    return (
      <div>
        <center className="center">
          <nobr>Meet The Team</nobr>
        </center>

        <div className="flexhorizontal">
          {this.state.array.map((instructor, index) => {
            return (
              <div>
                <center>
                  <img
                    className="image-cropper2"
                    alt="example"
                    src={instructor.pic}
                  />
                  <div className="name">{instructor.name}</div>
                  <div className="title">{instructor.title}</div>
                  <div>
                    <Popover
                      content={<div>{instructor.info}</div>}
                      title="Title"
                      trigger="hover"
                    >
                      <Button>About</Button>
                    </Popover>
                  </div>
                  <p>{array[index]}</p> <h5>Tags: {instructor.tags}</h5>
                </center>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

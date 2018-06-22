import React, { Component } from "react";
import TopbarCompany from "./TopbarCompany.js";
import "./Meet.css";
import "./Post.css";
import { Input, Card, Tag, Popover, Button } from "antd";
import "antd/dist/antd.css";
import EditingForm from "./EditingForm";
import Type from "./Type.js";

export default class Meet extends Component {
  state = {
    array: [
      {
        name: "Eliza Evans",
        tags: ["Leading", "Time Management", "UI-Friendly Design"],
        title: "Administrator",
        editI: false,
        linkedin: "https://www.linkedin.com/in/eliza-evans-7b3654157/",
        github: "https://github.com/eve9du",
        pic:
          "https://hackcville.com/launch-profiles/headshots/SWEElizaEvans.jpg",
        info:
          "Eliza is a wonderful instructor. He taught for 5 years in Cambridge, but got kicked out for sleeping with one of his students. Despite his misconducts, Bruno is still considered one of the top 10 instuctors of the world and attends talks at various universities and schools. His interests include software engineering, playing the banjo, trombone, and the pipes. He has a flamboyant personality and is very friendly to both humans and animals. "
      },
      {
        name: "Marina Kun",
        tags: ["PyTorch", "R", "Entrepreneurship"],
        editI: false,
        title: "Intern",
        linkedin: "https://www.linkedin.com/in/marina-kun/",
        github: "https://github.com/marinak6",
        pic:
          "https://hackcville.com/launch-profiles/headshots/SWEMarinaKun.jpg",
        info:
          "Marina is hands down the best software engineer that has ever lived.Apart from that, she is quite the business woman. In contrast to common knowledge, she was the creator of Google, Facebook, Twitter, Amazon, Apple and Microsoft. Even though she has had her ideas stolen too many time, Eliza remains content with her contributions to the world and now teaches in our company in order to pass down her knowledge and experiences to our own lucky interns"
      },
      {
        name: "Sonali Luthar",
        tags: ["Javascript", "Java", "Python", "UI/UX Design"],
        title: "Alumni",
        editI: false,
        linkedin: "https://www.linkedin.com/in/sonali-luthar/",
        github: "https://github.com/sonaliluthar",
        pic:
          "https://hackcville.com/launch-profiles/headshots/SWESonaliLuthar.jpg",
        info:
          "Eliza is a wonderful instructor. He taught for 5 years in Cambridge, but got kicked out for sleeping with one of his students. Despite his misconducts, Bruno is still considered one of the top 10 instuctors of the world and attends talks at various universities and schools. His interests include software engineering, playing the banjo, trombone, and the pipes. He has a flamboyant personality and is very friendly to both humans and animals. "
      },
      {
        name: "Sung Joon Park",
        tags: ["ReactJS", "AngularJS", "Python"],
        editD: false,
        title: "Senior Developer",
        linkedin: "https://www.linkedin.com/in/sung-joon-park/",
        github: "https://github.com/sp3bk",
        pic:
          "https://hackcville.com/launch-profiles/headshots/SWESungJoonPark.jpg",
        info:
          "Sung Joon is a wonderful instructor. He taught for 5 years in Cambridge, but got kicked out for sleeping with one of his students. Desite his misconducts, Bruno is still considered one of the top 10 instuctors of the world and attends talks at various universities and schools. His interests include software engineering, playing the banjo, trombone, and the pipes. He has a flamboyant personality and is very friendly to both humans and animals. "
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

    return (
      <div>
        <center>
          <Type
            strings={["Meet The Team", "Meet Team Trench"]}
            loopDelay={7000}
            speed={170}
            breakLines={false}
            autoStart={false}
          />
        </center>

        <div className="flexhorizontal">
          {this.state.array.map((instructor, index) => {
            return (
              <div className="column">
                <center>
                  <img
                    className="image-cropper2"
                    alt="example"
                    src={instructor.pic}
                  />
                  <div className="name">{instructor.name}</div>
                  <div className="title">{instructor.title.toUpperCase()}</div>
                  <Popover
                    content={
                      <div className="info">
                        <div>{instructor.info}</div>
                        <p>
                          {instructor.tags.map(tag => (
                            <Tag color="cyan">{tag}</Tag>
                          ))}
                        </p>
                      </div>
                    }
                    title="About"
                    trigger="hover"
                  >
                    <Tag color="#108ee9">About</Tag>
                  </Popover>
                  <Popover
                    content={
                      <div className="links">
                        <a href={instructor.github}>
                          <img
                            className="icon"
                            src="https://image.flaticon.com/icons/svg/25/25231.svg"
                          />
                        </a>
                        <a href={instructor.linkedin}>
                          <img
                            className="icon"
                            src="http://icons.iconarchive.com/icons/sicons/basic-round-social/256/linkedin-icon.png"
                          />
                        </a>
                      </div>
                    }
                    title="Links"
                    trigger="hover"
                  >
                    <Tag color="#2db7f5">Connect</Tag>
                  </Popover>
                </center>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

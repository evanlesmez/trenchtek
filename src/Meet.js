import React, { Component } from "react";
import TopbarCompany from "./TopbarCompany.js";
import "./Meet.css"
import { Input, Card } from "antd";
import "antd/dist/antd.css";
import EditingForm from './EditingForm'



export default class Meet extends Component {

  state = {
    instructors: [{
      name: "Bruno", tags: "#Javascipt #Python", editI: false,
      info: "Bruno is a wonderful instructor. He taught for 5 years in Cambridge, but got kicked out for sleeping with one of his students. Despite his misconducts, Bruno is still considered one of the top 10 instuctors of the world and attends talks at various universities and schools. His interests include software engineering, playing the banjo, trombone, and the pipes. He has a flamboyant personality and is very friendly to both humans and animals. "
    },
    { name: "Eliza", tags: "#legitknowseverything", editI: false, info: " Eliza is hands down the best software engineer that has ever lived.Apart from that, she is quite the business woman. In contrast to common knowledge, she was the creator of Google, Facebook, Twitter, Amazon, Apple and Microsoft. Even though she has had her ideas stolen too many time, Eliza remains content with her contributions to the world and now teaches in our company in order to pass down her knowledge and experiences to our own lucky interns" }],


    seniorDevs: [{
      name: "Bruno", tags: "#Javascipt #Python", editD: false,
      info: "Bruno is a wonderful instructor. He taught for 5 years in Cambridge, but got kicked out for sleeping with one of his students. Desite his misconducts, Bruno is still considered one of the top 10 instuctors of the world and attends talks at various universities and schools. His interests include software engineering, playing the banjo, trombone, and the pipes. He has a flamboyant personality and is very friendly to both humans and animals. "
    },
    { editD: false, name: "Eliza", tags: "#legitknowseverything", info: " Eliza is hands down the best software engineer that has ever lived.Apart from that, she is quite the business woman. In contrast to common knowledge, she was the creator of Google, Facebook, Twitter, Amazon, Apple and Microsoft. Even though she has had her ideas stolen too many time, Eliza remains content with her contributions to the world and now teaches in our company in order to pass down her knowledge and experiences to our own lucky interns" }]
  }

  handlerI = (e, i) => {
    let instArray = this.state.instructors
    instArray[i].editI = false;
    instArray[i].info = e.target.value;
    this.setState({
      instructors: instArray
    })
  }


  handlerD = (e, i) => {
    let devArray = this.state.seniorDevs
    devArray[i].editD = false;
    devArray[i].info = e.target.value;
    this.setState({
      seniorDevs: devArray
    })


  }



  handleInEdit = ind => {
    let instArray = this.state.instructors
    instArray[ind].editI = true;
    this.setState(
      {
        instructors: instArray
      }
    )


  }

  handleDevEdit = ind => {
    let devArray = this.state.seniorDevs
    devArray[ind].editD = true;
    this.setState(
      {
        seniorDevs: devArray
      }
    )

    console.log(this.state)
  }
  render() {

    let array = [];
    for (let i = 0; i < this.state.instructors.length; i++) {
      if (!(array.includes(this.state.instructors[i].info)))
        array.push(this.state.instructors[i].info)
    }
    for (let i = 0; i < array.length; i++) {

      if (this.state.instructors[i].editI) {
        array[i] = <EditingForm defaultValue={this.state.instructors[i].info} onPressEnter={(e) => this.handlerI(e, i)} />;
      }

    }


    let arrayDev = [];
    for (let i = 0; i < this.state.seniorDevs.length; i++) {
      if (!(arrayDev.includes(this.state.seniorDevs[i].info)))
        arrayDev.push(this.state.seniorDevs[i].info)
    }
    for (let i = 0; i < arrayDev.length; i++) {

      if (this.state.seniorDevs[i].editD) {
        arrayDev[i] = <EditingForm defaultValue={this.state.seniorDevs[i].info} onPressEnter={(e) => this.handlerD(e, i)} />;
      }

    }
    return (
      <div>
        <TopbarCompany />

        <article>
          <div>
            <h4 className="searchInfo"> Search keywords for detailed information about out large network of interns and alumni</h4>
            <form className="searchComponent">
              <Input className="search" placeholder="input search text" type="text" size="default" />

              <span class="ant-input-suffix"><button type="button" class="ant-btn ant-input-search-button ant-btn-primary"><i class="anticon anticon-search"></i></button></span>
            </form>

          </div>
        </article>


        <article>
          <div>
            <div className="instuctors">
              <h1 > <nobr> Our Instructors</nobr></h1>

            </div>


            <div className="infocard">

              {this.state.instructors.map((instructor, index) => {
                return (
                  <div className="individualCards" >
                    <div
                      className="editInfo"
                      onClick={() => this.handleInEdit(index)}
                    >Edit</div>
                    <Card className="InstructorCard" style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                      <div className="custom-image">
                        <img alt="example" width="100%" src="https://www.shrs.pitt.edu/sites/default/files/default_images/default-person.jpg" />
                      </div>
                      <div className="custom-card">
                        <div className="textOfCard">
                          <h3>{instructor.name}</h3>
                          {/* <p>linkedIn</p> */}
                        </div>
                      </div>
                    </Card>
                    <div className="texty"><p>{array[index]}</p> <h5>Tags: {instructor.tags}</h5></div>

                  </div>
                );
              })}
            </div>

          </div>
        </article>


        <article>
          <div>
            <div className="seniorDevs">
              <h1><nobr > Our Senior Developers</nobr></h1>

            </div>


            <div className="infocard">

              {this.state.seniorDevs.map((senior, index) => {
                return (

                  <div className="individualCards" >
                    <div
                      onClick={() => this.handleDevEdit(index)}
                      className="editInfo">Edit</div>
                    <Card className="InstructorCard" style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                      <div className="custom-image">
                        <img alt="example" width="100%" src="https://www.shrs.pitt.edu/sites/default/files/default_images/default-person.jpg" />
                      </div>
                      <div className="custom-card">
                        <div className="textOfCard">
                          <h3>{senior.name}</h3>
                          {/* <p>linkedIn</p> */}
                        </div>
                      </div>
                    </Card>
                    <div className="texty"> <div><p>{arrayDev[index]}</p> <h5>Tags: {senior.tags}</h5></div> </div>
                  </div>
                );
              })}
            </div>


          </div>
        </article>
      </div>
    );
  }
}

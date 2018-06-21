import React, { Component } from "react";
import "./Manage.css";
import EditingForm from "./EditingForm";
import firebase from "./Firebase";

import { Form, Row, Col, Input, Card, Button, Icon } from 'antd';
const FormItem = Form.Item;


export default class ManageSite extends Component {


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
        { editD: false, name: "Eliza", tags: "#legitknowseverything", info: " Eliza is hands down the best software engineer that has ever lived.Apart from that, she is quite the business woman. In contrast to common knowledge, she was the creator of Google, Facebook, Twitter, Amazon, Apple and Microsoft. Even though she has had her ideas stolen too many time, Eliza remains content with her contributions to the world and now teaches in our company in order to pass down her knowledge and experiences to our own lucky interns" }],
        history: "",
        interns: "",
        companies: "",
        historyEdit: false,
        internsEdit: false,
        companiesEdit: false
    }



    componentDidMount() {

        const ref = firebase.database().ref('about/');
        ref.on('value', (snapshot) => {
            let about = snapshot.val();
            let history = about.history;
            let interns = about.interns;
            let companies = about.companies;
            let newState = [];

            this.setState({
                history: history,
                interns: interns,
                companies: companies

            });
        });
    }

    handlerInstructors = (e, i, word) => {

        let instArray = this.state.instructors
        let variable = eval("instArray[" + i + "]." + word)
        instArray[i].editI = false;
        variable = e.target.value;
        console.log(variable);
        console.log(instArray[i].info);

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

    handleEditH = () => {

        this.setState({
            historyEdit: true
        }

        )
        console.log(this.state.edit)
        console.log(this.state)

    }
    handleEditI = () => {
        this.setState({
            internsEdit: true
        }

        )
    }

    handleEditC = () => {
        this.setState({
            companiesEdit: true
        }

        )
        console.log(this.state.companiesEdit)
    }

    handlerH = (e) => {
        const ref = firebase.database().ref('about/');
        ref.update({
            history: e.target.value
        })

        this.setState(
            {
                history: e.target.value,
                historyEdit: false
            }
        )

    }

    handlerI = (e) => {
        const ref = firebase.database().ref('about/');
        ref.update({
            interns: e.target.value
        })
        this.setState(
            {
                interns: e.target.value,
                internsEdit: false
            }
        )
    }

    handlerC = (e) => {
        const ref = firebase.database().ref('about/');
        ref.update({
            companies: e.target.value
        })
        this.setState(
            {
                companies: e.target.value,
                companiesEdit: false
            }
        )
    }
    handleDelete = index => {
        let array = this.state.instructors;
        array.splice(index, 1);
        this.setState({
            instructors: array
        })
    }

    handleAdd = () => {
        this.setState(
            {
                instructors: [...this.state.instructors, { name: "", tags: "", editI: true, info: "" }]
            }
        )
    }
    render() {
        let edit = <p className="infoEdit"
            onClick={this.handleEditH}

        > </p>;

        if (this.props.userTitle === "admin") {
            edit = <p className="editt"
                onClick={this.handleEditH}

            >  Edit</p>
        }

        let arrayInfo = [];
        let arrayName = [];
        let arrayTags = [];
        for (let i = 0; i < this.state.instructors.length; i++) {
            if (!(arrayInfo.includes(this.state.instructors[i].info)))
                arrayInfo.push(this.state.instructors[i].info);
            arrayName.push(this.state.instructors[i].name);
            arrayTags.push(this.state.instructors[i].tags);

        }
        for (let i = 0; i < arrayInfo.length; i++) {

            if (this.state.instructors[i].editI) {
                arrayInfo[i] = <EditingForm defaultValue={this.state.instructors[i].info} onPressEnter={(e) => this.handlerInstructors(e, i, "info")} />;
                arrayName[i] = <EditingForm defaultValue={this.state.instructors[i].name} onPressEnter={(e) => this.handlerInstructors(e, i, "name")} />;
                arrayTags[i] = <Input className="tagForm" defaultValue={this.state.instructors[i].tags} onPressEnter={(e) => this.handlerInstructors(e, i, "tags")} />;

            }

        }


        let arrayDev = [];
        for (let i = 0; i < this.state.seniorDevs.length; i++) {
            if (!(arrayDev.includes(this.state.seniorDevs[i].info)))
                arrayDev.unshift(this.state.seniorDevs[i].info)
        }
        for (let i = 0; i < arrayDev.length; i++) {

            if (this.state.seniorDevs[i].editD) {
                arrayDev[i] = <EditingForm defaultValue={this.state.seniorDevs[i].info} onPressEnter={(e) => this.handlerD(e, i)} />;
            }

        }


        let historyText = this.state.history;
        let internsText = this.state.interns;
        let companiesText = this.state.companies
        // let edit = null;

        // // if (this.props.userTitle === "admin") {
        // edit = <p className="edit"
        //   onClick={this.handleEditH}

        // >  Edit</p>
        // }


        if (this.state.historyEdit === true) {
            historyText = <EditingForm defaultValue={this.state.history} onPressEnter={(e) => this.handlerH(e)} />
        }

        if (this.state.internsEdit) {
            internsText = <EditingForm defaultValue={this.state.interns} onPressEnter={(e) => this.handlerI(e)} />
        }

        if (this.state.companiesEdit) {
            companiesText = <EditingForm defaultValue={this.state.companies} onPressEnter={(e) => this.handlerC(e)} />
        }
        return (
            <div className="wrapper">
                <div className="AboutPage">
                    <h1>About Page</h1>
                    <div className="aboutText">
                        <div className="textAndEdit">
                            <p className="editt"
                                onClick={this.handleEditH}

                            >  Edit History</p>
                            <div className="information"> {historyText}
                            </div>
                        </div>
                        <div className="textAndEdit">
                            <p className="editt"
                                onClick={this.handleEditI}

                            >  Edit Interns</p>
                            <div className="information"> {internsText}
                            </div>
                        </div>
                        <div className="textAndEdit">
                            <p className="editt"
                                onClick={this.handleEditC}

                            >  Edit Companies</p>
                            <div className="information">{companiesText}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="MeetTeam"> <h1>Meet the Team Page</h1>
                    <div className="instructorEdit"> <h2 className="titles"> Edit Instructors <span onClick={this.handleAdd} className="add">Add</span></h2>
                        <div className="informationCard">

                            {this.state.instructors.map((instructor, index) => {
                                return (
                                    <div className="card" >
                                        <div>
                                            <div className="toEditInst" onClick={() => this.handleInEdit(index)}> Edit</div>  <span onClick={() => this.handleDelete(index)} className="x">X</span></div>
                                        <Card className="cardi">
                                            <div className="customImage">

                                                <img className="img" alt="example" width="100%" src="https://www.shrs.pitt.edu/sites/default/files/default_images/default-person.jpg" />
                                            </div>
                                            <div className="customCard">
                                                <div className="textCard">
                                                    <h3>{arrayName[index]}</h3>
                                                    {/* <p>linkedIn</p> */}
                                                </div>
                                            </div>
                                        </Card>

                                        <div className="nextImg">
                                            <p className="infoEdit"
                                                onClick={() => this.handleInEdit(index)}

                                            > </p>
                                            <div className="wholeText"><p className="actualText">{arrayInfo[index]}</p> <h5 className="tagz"><div>Tags:{arrayTags[index]} </div></h5></div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    <div className="devEdit"> <h2 className="titles"> Edit Senior Developers</h2></div>
                </div>




            </div >
        )
    }
}




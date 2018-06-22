import React, { Component } from "react";
import "./Manage.css";
import EditingForm from "./EditingForm";
import firebase from "./Firebase";

import { Form, Row, Col, Input, Card, Button, Icon, Avatar } from "antd";
const FormItem = Form.Item;
const meetRef = firebase.database().ref("meet");

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





    handleDelete = (index, word) => {
        if (word == "inst") {
            let arrayIn = this.state.instructors;
            arrayIn.splice(index, 1)
            this.setState(
                {
                    instructors: arrayIn
                }
            )

        }

        else if (word == "dev") {
            let arrayDev = this.state.seniorDevs;
            arrayDev.splice(index, 1)
            this.setState(
                {
                    seniorDevs: arrayDev
                }
            )

        }
    }

    handleAdd = word => {
        if (word == "inst") {
            this.setState(
                {
                    instructors: [...this.state.instructors, { name: "", tags: "", editI: true, info: "" }]
                }
            )

        }

        else if (word == "dev") {
            this.setState(
                {
                    seniorDevs: [...this.state.seniorDevs, { name: "", tags: "", editD: true, info: "" }]
                }
            )

        }
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

        meetRef.on("value", snapshot => {

        })
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

    handlerInstructors = (e, i, word) => {

        let instArray = this.state.instructors
        if (word === "info") {
            instArray[i].info = e.target.value;
        }
        else if (word === "name") {
            instArray[i].name = e.target.value;
        }
        else if (word === "tags") {
            instArray[i].tags = e.target.value;
        }
        instArray[i].editI = false;


        meetRef.update({ instructors: instArray })
        this.setState({
            instructors: instArray
        })
    }




    handlerD = (e, i, word) => {
        let devArray = this.state.seniorDevs
        if (word === "info") {
            devArray[i].info = e.target.value;
        }
        else if (word === "name") {
            devArray[i].name = e.target.value;
        }
        else if (word === "tags") {
            devArray[i].tags = e.target.value;
        }
        devArray[i].editD = false;

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
    render() {



        let array = [];
        // let arrayName = [];
        // let arrayTags = [];
        for (let i = 0; i < this.state.instructors.length; i++) {
            if (!(array.includes(this.state.instructors[i])))
                array.push(this.state.instructors[i]);
            // arrayName.unshift(this.state.instructors[i].name);
            // arrayTags.unshift(this.state.instructors[i].tags);

        }
        for (let i = 0; i < array.length; i++) {

            if (this.state.instructors[i].editI) {
                array[i].info = <EditingForm defaultValue={this.state.instructors[i].info} onPressEnter={(e) => this.handlerInstructors(e, i, "info")} />;
                array[i].name = <EditingForm defaultValue={this.state.instructors[i].name} onPressEnter={(e) => this.handlerInstructors(e, i, "name")} />;
                array[i].tags = <Input className="tagForm" defaultValue={this.state.instructors[i].tags} onPressEnter={(e) => this.handlerInstructors(e, i, "tags")} />;

            }

        }


        let arrayDev = [];
        // let arrayDevName = [];
        // let arrayDevTags = [];
        for (let i = 0; i < this.state.seniorDevs.length; i++) {
            if (!(arrayDev.includes(this.state.seniorDevs[i])))
                arrayDev.push(this.state.seniorDevs[i])
            // arrayDevName.unshift(this.state.seniorDevs[i].name)
            // arrayDevTags.unshift(this.state.seniorDevs[i].tags)
        }
        for (let i = 0; i < arrayDev.length; i++) {

            if (this.state.seniorDevs[i].editD) {
                arrayDev[i].info = <EditingForm defaultValue={this.state.seniorDevs[i].info} onPressEnter={(e) => this.handlerD(e, i, "info")} />;
                arrayDev[i].name = <EditingForm defaultValue={this.state.seniorDevs[i].name} onPressEnter={(e) => this.handlerD(e, i, "name")} />;
                arrayDev[i].tags = <Input className="tagForm" defaultValue={this.state.seniorDevs[i].tags} onPressEnter={(e) => this.handlerD(e, i, "tags")} />;
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
            <Row gutter={24}>
                <Col span={12}>
                    <div className="left">
                        <h1>About Page</h1>
                        <p className="editt" onClick={this.handleEditH}>
                            {" "}
                            Edit History
            </p>
                        <div> {historyText}</div>
                        <br />
                        <p className="editt" onClick={this.handleEditI}>
                            {" "}
                            Edit Interns
            </p>
                        <div> {internsText}</div>
                        <br />
                        <p className="editt" onClick={this.handleEditC}>
                            {" "}
                            Edit Companies
            </p>

                        <div>{companiesText}</div>
                        <br />
                    </div>
                </Col>
                <Col span={12}>
                    {" "}
                    <h1>Meet the Team Page</h1>{" "}
                    <div>
                        {" "}
                        <h1 className="titles">
                            Edit Instructors{" "}
                        </h1>
                        <span onClick={() => this.handleAdd("inst")} className="add">
                            Add
            </span>
                    </div>
                    {this.state.instructors.map((instructor, index) => {
                        return (
                            <Card
                                style={{
                                    marginTop: 25,
                                    marginRight: 25
                                }}
                                title={array[index].name}
                                extra={
                                    <Button
                                        size="small"
                                        onClick={() => this.handleDelete(index, "inst")}
                                        className="float-right"
                                    >
                                        <Icon type="delete" />
                                    </Button>
                                }
                            >
                                <div>
                                    <div
                                        className="toEditInst"
                                        onClick={() => this.handleInEdit(index)}
                                    >
                                        {" "}
                                        Edit
                  </div>{" "}
                                </div>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <div className="customImage">
                                            <img
                                                className="img"
                                                alt="example"
                                                width="100%"
                                                src="https://www.shrs.pitt.edu/sites/default/files/default_images/default-person.jpg"
                                            />
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <p>{array[index].info}</p>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <div>Tags: </div>
                                    {array[index].tags}
                                </Row>
                            </Card>
                        );
                    })}
                    <div>
                        {" "}
                        <h1 className="titles">
                            Edit Developers{" "}
                        </h1>
                        <span onClick={() => this.handleAdd("dev")} className="add">
                            Add
            </span>
                    </div>
                    {this.state.seniorDevs.map((instructor, index) => {
                        return (
                            <Card
                                style={{
                                    marginTop: 25,
                                    marginRight: 25
                                }}
                                title={arrayDev[index].name}
                                extra={
                                    <Button
                                        size="small"
                                        onClick={() => this.handleDelete(index, "dev")}
                                        className="float-right"
                                    >
                                        <Icon type="delete" />
                                    </Button>
                                }
                            >
                                <div>
                                    <div
                                        className="toEditInst"
                                        onClick={() => this.handleInEdit(index)}
                                    >
                                        {" "}
                                        Edit
                  </div>{" "}
                                </div>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <div className="customImage">
                                            <img
                                                className="img"
                                                alt="example"
                                                width="100%"
                                                src="https://www.shrs.pitt.edu/sites/default/files/default_images/default-person.jpg"
                                            />
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <p>{arrayDev[index].info}</p>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <div>Tags: </div>
                                    {arrayDev[index].tags}
                                </Row>
                            </Card>
                        );
                    })}




                </Col>
            </Row>

        );
    }

}

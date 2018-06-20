import React, { Component } from "react";
import "./Manage.css";
import EditingForm from "./EditingForm"
import firebase from "./Firebase";


export default class ManageSite extends Component {


    state = {
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
    render() {


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
                    <p className="edit"
                        onClick={this.handleEditH}

                    >  Edit</p>
                    <div className="eliza"> {historyText}
                    </div>
                    <p className="edit"
                        onClick={this.handleEditI}

                    >  Edit</p>
                    <div className="eliza"> {internsText}
                    </div>
                    <p className="edit"
                        onClick={this.handleEditC}

                    >  Edit</p>
                    <div className="eliza">{companiesText}
                    </div>

                </div>


                <div className="MeetTeam"> <h1>Meet the Team Page</h1>

                </div>




            </div >
        )
    }
}




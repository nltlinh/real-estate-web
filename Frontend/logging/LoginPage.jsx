import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import '../myStyle.css'

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "username": "",
            "password": "",
        }
        this.onLogIn = this.onLogIn.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status.authorization == "false") {
            alert("There was a problem. Please check your username/password and try again.")
            this.setState({ username: "", password: "" })
            sessionStorage.clear()
        }
    }
    onLogIn(e) {
        e.preventDefault()
        this.props.logIn({ username: this.state.username, password: this.state.password })
    }
    handleChange(e) {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    render() {
        if (!sessionStorage.getItem('state')) {
            return (
                <div>
                    <div id="login-page">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-8"></div>
                                <div class="col-sm-4">
                                    <div class="card">
                                        <div class="card-body">
                                            <h2>LOG IN</h2>
                                            <h6 style={{ color: "grey" }}>Please enter your username and password. </h6>
                                            <br />
                                            <form class="form-login">
                                                <div class="form-group">
                                                    <label for="username"><b>Username</b></label>
                                                    <input class="form-control" name="username" value={this.state.username} onChange={this.handleChange.bind(this)} type="text" autoFocus />
                                                    <label for="password"><b>Password</b></label>
                                                    <input class="form-control" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} type="password" />
                                                </div>
                                                <br/>
                                                <div>
                                                    <button onClick={this.onLogIn} role="button" class="btn btn-outline-primary form-control">Sign In</button>
                                                </div>
                                            </form>
                                        </div>

                                        <div class="card-footer">
                                            <h6>Don't have an account ? <Link to="/register">Register</Link></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div id="homebtn" >
                            <Link to="/" >
                                <button type="button" className="btn" style={myStyle.btnhome}>
                                    <i className="fa fa-home"></i>
                                </button>
                            </Link>

                        </div>

                    </div>
                </div>




            )
        }

        else {
            return (<Redirect to="/estateuser" />)
        }
    }
}

const myStyle = {
    btnhome: {
        backgroundColor: '#C4B578',
        fontSize: '20px',
    },
}

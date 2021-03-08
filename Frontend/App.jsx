import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import About from './About.jsx';
import DetailPage from './DetailPage.jsx';
import PageNotFound from './PageNotFound.jsx';

import Estate from './generalEstate/Estate.jsx';
import ProjectGeneral from './project/ProjectGeneral.jsx'

import EstateUser from './userEstate/EstateUser.jsx';
import ProjectUser from './project/ProjectsUser.jsx';

import LoginPage from './logging/LoginPage.jsx';
import Register from './logging/Register.jsx';
import { logIn, register } from './logging/Logging.jsx';

import './myStyle.css'


class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/estate' component={Estate} />
                        <Route path='/projectgeneral' component={ProjectGeneral} />
                        <Route path='/estateuser' component={EstateUser} />
                        <Route path='/projectuser' component={ProjectUser} />
                        <Route path='/about' component={About} />
                        
                        <Route path={`/DetailPage/:_id`}
                            render={(props) =>
                                <div>
                                    <DetailPage {...props} />
                                </div>} />
                        <Route path="/login" exact render={
                            () =>
                                <LoginPage
                                    status={this.props.status}
                                    logIn={(auth) => this.props.logIn(auth)} />
                        } />

                        <Route path="/register" exact render={
                            () =>
                                <Register
                                    status={this.props.status}
                                    register={(auth) => this.props.register(auth)}
                                />
                        } />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
const mapStateToProps = (centralState) => {
    return {
        status: centralState.status,
    }
}
const mapDispatchToProps = dispatch => ({
    //Logging
    logIn: (auth) => dispatch(logIn(auth)),
    register: (auth) => dispatch(register(auth)),
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
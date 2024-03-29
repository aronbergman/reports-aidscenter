import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AllForms from "./components/all-forms/all-forms";
import DrugsForm from "./components/Forms/drugs/DrugsForm";
import GroupsForm from "./components/Forms/groups/GroupsForm";
import GroupsTG from "./components/Forms/groups/GroupsTG";
import TestingForm from "./components/Forms/testing/TestingForm";
import HotLineForm from "./components/Forms/hot_line/HotLineForm";

import logoWhite from './images/logo-white.svg'
import logoBlack from './images/logo-black.svg'

import AuthService from "./services/auth.service";

import Login from "./components/Forms/Login";
import Profile from "./components/Profile";
import BoardUser from "./components/Board-user";
import BoardModerator from "./components/Board-moderator";
import AdminPanel from "./components/Board-admin";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        console.log('process.versions.node', process.versions.node)
        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            readyToRedirect: null
        };
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('user'))
        console.log('userData', userData)
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: AuthService.getCurrentUser(),
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.readyToRedirect !== null) {
            this.setState({
                readyToRedirect: null
            })
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <Link to={"/"} className="navbar-brand">
                                <div className="logo" style={{ backgroundImage: `url(${logoWhite})` }}/>
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                {/*<li className="nav-item">*/}
                                {/*  <Link to={"/home"} className="nav-link">*/}
                                {/*    Домашняя*/}
                                {/*  </Link>*/}
                                {/*</li>*/}
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                    {/*{currentUser && (*/}
                                    {/*  <li className="nav-item">*/}
                                    {/*    <Link to={"/user"} className="nav-link">*/}
                                    {/*      Профиль*/}
                                    {/*    </Link>*/}
                                    {/*  </li>*/}
                                    {/*)}*/}

                                    {currentUser && (
                                        <li className="nav-item">
                                            <Link to={"/forms"} className="nav-link">
                                                Опросы
                                            </Link>
                                        </li>
                                    )}

                                    {(showModeratorBoard || showAdminBoard) && (
                                        <li className="nav-item">
                                            <Link to={"/mod"} className="nav-link">
                                                Отчёты
                                            </Link>
                                        </li>
                                    )}

                                    {showAdminBoard && (
                                        <li className="nav-item">
                                            <Link to={"/admin"} className="nav-link">
                                                Админка
                                            </Link>
                                        </li>
                                    )}

                                    {currentUser ? (
                                        <div className="navbar-nav ml-auto">
                                            <li className="nav-item">
                                                <Link to={"/profile"} className="nav-link">{currentUser.appointment} ({currentUser.username})</Link>
                                            </li>
                                            <li className="nav-item">
                                                <a href="/login" className="nav-link"
                                                   onClick={this.logOut}>выйти</a>
                                            </li>
                                        </div>
                                    ) : (
                                        <div className="navbar-nav ml-auto">
                                            <li className="nav-item">
                                                <Link to={"/login"} className="nav-link">
                                                    войти
                                                </Link>
                                            </li>
                                        </div>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>

                    {
                        this.state.readyToRedirect
                            ? <Redirect to={this.state.readyToRedirect}/>
                            : null
                    }

                    <Switch>
                        <Route exact path={["/", "/home"]} component={AllForms}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/forms" component={AllForms}/>
                        <Route exact path="/testing" component={TestingForm}/>
                        <Route exact path="/hotline" component={HotLineForm}/>
                        <Route exact path="/groups-hiv" component={GroupsForm}/>
                        <Route exact path="/groups-tg" component={GroupsTG}/>
                        <Route exact path="/drugs" component={DrugsForm}/>

                        <Route path="/user" component={BoardUser}/>
                        <Route path="/mod" component={BoardModerator}/>
                        <Route path="/admin" component={AdminPanel}/>
                    </Switch>
                </div>

                <div className="footer">
                    <div className="logo" style={{ backgroundImage: `url(${logoBlack})` }}/>
                </div>
            </Router>
        );
    }
}

const mapState = state => ({
    // allCounterNotRead: state.chat.allCounterNotRead
})

const mapDispatch = dispatch => ({
    // getUserChatsApi: id => dispatch(getUserChatsApi({ id })),
})

export default withRouter(connect(mapState, mapDispatch)(App));

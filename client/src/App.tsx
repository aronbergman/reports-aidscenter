import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

import AuthService from "./services/auth.service";

import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import Welcome from "./components/Welcome";
import Footer from './components/Footer/Footer'
import Profile from "./components/Profile";
import BoardUser from "./components/Board-user";
import BoardModerator from "./components/Board-moderator";
import AdminPanel from "./components/Board-admin";
import Home from "./components/Home";

class App extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            readyToRedirect: null
        };
    }

    componentDidMount() {
        const userData = JSON.parse(String(localStorage.getItem('user')))
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

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
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
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">FF Service</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {(showAdminBoard || showModeratorBoard || currentUser) &&
                                <>
                                    {currentUser && (
                                        <NavLink to={"/user"} activeClassName="active" className="nav-link">
                                            user page
                                        </NavLink>
                                    )}
                                    {showAdminBoard && (
                                        <NavLink to={"/admin"} activeClassName="active" className="nav-link">
                                            Admin Board
                                        </NavLink>
                                    )}
                                    {showModeratorBoard && (
                                        <NavLink to={"/mod"} activeClassName="active" className="nav-link">
                                            Moderator Board
                                        </NavLink>
                                    )}
                                    {currentUser && (
                                        <NavLink to={"/profile"} activeClassName="active" className="nav-link">
                                            Profile Board
                                        </NavLink>)}
                                </>
                                }
                            </Nav>

                            {currentUser ? (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link">{currentUser.username}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link"
                                           onClick={this.logOut}>logout</a>
                                    </li>
                                </div>
                            ) : (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                            login
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/register"} className="nav-link">
                                            register
                                        </Link>
                                    </li>
                                </div>
                            )}
                        </Navbar.Collapse>
                    </Navbar>

                    {
                        this.state.readyToRedirect
                            ? <Redirect to={this.state.readyToRedirect}/>
                            : null
                    }

                    <Switch>
                        <Route exact path={"/"} component={Home}/>

                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/user" component={BoardUser}/>
                        <Route exact path="/moderator" component={BoardModerator}/>
                        <Route exact path="/welcome" component={Welcome}/>

                        <Route exact path="/admin" component={AdminPanel}/>
                    </Switch>
                </div>
                <Footer/>
            </Router>
        );
    }
}

// @ts-ignore
const mapState = state => ({
    // allCounterNotRead: state.chat.allCounterNotRead
})

// @ts-ignore
const mapDispatch = dispatch => ({
    // getUserChatsApi: id => dispatch(getUserChatsApi({ id })),
})

export default withRouter(connect(mapState, mapDispatch)(App));

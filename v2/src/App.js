import React, { Component } from "react";
import Signup from "./containers/Signup/Signup";
import Login from "./containers/Login/Login";
import Home from "./containers/Home/Home";
import Bookings from "./containers/Bookings/Bookings";
import { Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Layout from "./components/Layout/Layout";
import { MuiThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import theme from "./components/UI/Theme/theme";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
    };
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  updateUser(userObject) {
    this.setState(userObject);
  }
  getUser() {
    axios.get("/user/").then(response => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }
  componentDidMount() {
    this.getUser();
  }
  componentDidUpdate() {
    console.log("App.js this.state", this.state);
  }
  render() {
    console.log("App.js this.state", this.state);
    return (
      <div>
        <Layout userData={this.state.username} updateFunc={this.updateUser}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Route exact path="/signup" render={props => <Signup />} />
            <Route
              exact
              path="/login"
              render={props => <Login updateUser={this.updateUser} />}
            />
            <Route
              exact
              path="/home"
              render={props => (
                <Home
                  userData={this.state.username}
                  updateUser={this.updateUser}
                />
              )}
            />
            <Route
              exact
              path="/bookings"
              render={props => (
                <Bookings
                  userData={this.state.username}
                  updateUser={this.updateUser}
                />
              )}
            />
          </MuiThemeProvider>
        </Layout>
      </div>
    );
  }
}

export default App;

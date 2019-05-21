import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Aux from "../../../hoc/Auxiliary";
import { Toolbar, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../../UI/Theme/theme";
import axios from "axios";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "#425563"
  },
  links: {
    display: "flex",
    justifyContent: "right"
  },
  button: {
    color: "green"
  }
});

class MyToolbar extends Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }

  logOut(event) {
    event.preventDefault();
    console.log("logging out");
    axios
      .post("/user/logout")
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updatedUser({
            loggedIn: false,
            username: null
          });
          this.setState({
            redirectTo: "/"
          });
        }
      })
      .catch(error => {
        console.log("Logout error");
      });
  }

  render() {
    const { classes } = this.props;
    console.log("toolbar.js ", this.props.userData);
    return (
      <Aux>
        <MuiThemeProvider theme={theme}>
          <AppBar position="sticky" className={classes.appBar}>
            <Toolbar>
              <div className={classes.root}>
                <Link to="/home" className={classes.links}>
                  <Button variant="outlined" color="secondary">
                    ResTool
                  </Button>
                </Link>
              </div>

              <Link to="/login">
                {this.props.userData != null ? (
                  <Typography>Welcome {this.props.userData}</Typography>
                ) : (
                  <Button color="secondary" style={{ marginLeft: "10px" }}>
                    LogIn
                  </Button>
                )}
              </Link>

              <Link to="/login">
                <Button color="secondary" style={{ marginLeft: "10px" }}>
                  LogOut
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </Aux>
    );
  }
}

export default withStyles(styles)(MyToolbar);

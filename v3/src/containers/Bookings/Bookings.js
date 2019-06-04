import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import theme from "../../components/UI/Theme/theme";
import { MuiThemeProvider, Typography, Button } from "@material-ui/core";
import Tables from "../../components/Tables/Tables";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";
import TablesBooking from "../../components/TablesBooking/TablesBooking";
const styles = theme => ({
  paper: {
    margin: "0px auto",
    maxWidth: "1200px"
  },
  button: {
    color: "green"
  },
  tableHeader: {
    margin: "0px auto",
    maxWidth: "320px",
    paddingTop: "10px",
    marginBottom: "20px"
  },
  buttonBack: {
    margin: "0px auto",
    maxWidth: "80px",
    marginBottom: "20px"
  }
});
class Home extends Component {
  state = {
    redirectTo: null
  };
  render() {
    const { classes } = this.props;
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <MuiThemeProvider theme={theme}>
          <Paper className={classes.tableHeader}>
            <Typography
              variant="h5"
              align="center"
              style={{ paddingBottom: "20px" }}
            >
              List of Bookings
            </Typography>
          </Paper>
          <Typography
            variant="h5"
            align="center"
            style={{ paddingBottom: "20px" }}
          >
            {this.props.location.state.model}
          </Typography>
          <Paper className={classes.buttonBack}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => {
                this.setState({
                  redirectTo: "/home"
                });
              }}
            >
              Back
            </Button>
          </Paper>

          <Paper className={classes.paper}>
            <TablesBooking
              model={this.props.location.state.model}
              userData={this.props.userData}
            />
          </Paper>
        </MuiThemeProvider>
      );
    }
  }
}
export default withRouter(withStyles(styles)(Home));

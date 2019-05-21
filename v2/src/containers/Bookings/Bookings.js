import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import theme from "../../components/UI/Theme/theme";
import { MuiThemeProvider, Typography, Button } from "@material-ui/core";
import Tables from "../../components/Tables/Tables";
import axios from "axios";
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
    maxWidth: "300px",
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
  render() {
    const { classes } = this.props;
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
        <Paper className={classes.buttonBack}>
          <Button
            type="submit"
            href="/home"
            fullWidth
            variant="outlined"
            color="secondary"
          >
            Back
          </Button>
        </Paper>

        <Paper className={classes.paper}>
          <TablesBooking userData={this.props.userData} />
        </Paper>
      </MuiThemeProvider>
    );
  }
}
export default withStyles(styles)(Home);

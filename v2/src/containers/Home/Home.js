import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import theme from "../../components/UI/Theme/theme";
import { MuiThemeProvider, Typography } from "@material-ui/core";
import Tables from "../../components/Tables/Tables";
import axios from "axios";
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
  }
});
class Home extends Component {
  // getBookings() {
  //   axios
  //     .post("/book/booking")
  //     .then(response => {
  //       let result = response.data;
  //       console.log("result", result);

  //       this.setState({ bookingData: result });
  //       console.log("this.state.bookingData [home.js]", this.state.bookingData);
  //     })
  //     .catch(error => {
  //       console.log(" error: ");
  //       console.log(error);
  //     });
  // }
  // componentDidMount() {
  //   this.getBookings();
  // }
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
            List of Storage Arrays
          </Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Tables userData={this.props.userData} />
        </Paper>
      </MuiThemeProvider>
    );
  }
}
export default withStyles(styles)(Home);
